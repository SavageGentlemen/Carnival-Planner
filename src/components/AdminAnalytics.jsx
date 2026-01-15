import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from '../firebase';
import app from '../firebase';
import { Users, Crown, Search, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, Calendar, MapPin, Loader2, RefreshCw, Download, ShieldAlert, Trash2 } from 'lucide-react';
import AdminCleanup from './AdminCleanup';

const APP_ID = 'carnival-planner-v1';
const PREMIUM_OVERRIDE_EMAILS = ['djkrss1@gmail.com'];
const functions = getFunctions(app);

export default function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, premium: 0, free: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [migratingAuth, setMigratingAuth] = useState(false);
  const [showCleanup, setShowCleanup] = useState(false);

  // --- ACTIONS ---

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    try {
      await import('firebase/firestore').then(({ deleteDoc }) => {
        deleteDoc(doc(db, 'users', userId));
      });

      setUsers(prev => prev.filter(u => u.id !== userId));
      setStats(prev => ({ ...prev, total: prev.total - 1, free: prev.free - 1 })); // Assuming free, since incomplete

    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user: ' + err.message);
    }
  };

  const handleBatchDelete = async (userIds) => {
    try {
      const { deleteDoc } = await import('firebase/firestore');
      let count = 0;

      for (const id of userIds) {
        await deleteDoc(doc(db, 'users', id));
        count++;
      }

      setUsers(prev => prev.filter(u => !userIds.includes(u.id)));
      setStats(prev => ({
        ...prev,
        total: prev.total - count,
        free: prev.free - count
      }));

      alert(`Successfully deleted ${count} users.`);

    } catch (err) {
      console.error('Batch delete error:', err);
      alert('Batch delete failed partially: ' + err.message);
    }
  };

  // Migrate users from Firebase Auth (server-side function)
  const migrateAuthUsers = async () => {
    setMigratingAuth(true);
    setMigrationStatus('Migrating users from Firebase Auth...');

    try {
      const migrateAuthUsersFn = httpsCallable(functions, 'migrateAuthUsers');
      const result = await migrateAuthUsersFn({});

      setMigrationStatus(result.data.message);
      await fetchUsers();
    } catch (err) {
      console.error('Auth migration error:', err);
      setMigrationStatus(`Auth migration failed: ${err.message}`);
    }

    setMigratingAuth(false);
  };

  // Migration function to transfer user-activity AND artifacts records to users collection
  const migrateUserData = async () => {
    setMigrating(true);
    setMigrationStatus('Starting migration...');

    try {
      const usersToMigrate = new Map();
      let sources = [];

      // 1. Fetch all user-activity records
      try {
        const activitySnapshot = await getDocs(collection(db, 'user-activity'));
        console.log('[Migration] Found', activitySnapshot.size, 'user-activity records');
        sources.push(`${activitySnapshot.size} activity records`);

        for (const actDoc of activitySnapshot.docs) {
          const data = actDoc.data();
          const userId = data.uid;
          if (!userId) continue;

          if (!usersToMigrate.has(userId)) {
            usersToMigrate.set(userId, {
              createdAt: data.loginAt,
              lastLoginAt: data.loginAt,
              email: data.email || null,
              displayName: data.displayName || null,
            });
          } else {
            const existing = usersToMigrate.get(userId);
            if (data.loginAt?.toMillis?.() < existing.createdAt?.toMillis?.()) {
              existing.createdAt = data.loginAt;
            }
            if (data.loginAt?.toMillis?.() > existing.lastLoginAt?.toMillis?.()) {
              existing.lastLoginAt = data.loginAt;
            }
            if (!existing.email && data.email) existing.email = data.email;
            if (!existing.displayName && data.displayName) existing.displayName = data.displayName;
          }
        }
      } catch (e) {
        console.log('[Migration] Could not fetch user-activity:', e.message);
      }

      // 2. Also fetch from artifacts collection (legacy user data)
      try {
        const artifactsSnapshot = await getDocs(collection(db, 'artifacts', APP_ID, 'users'));
        console.log('[Migration] Found', artifactsSnapshot.size, 'artifact users');
        sources.push(`${artifactsSnapshot.size} artifact users`);

        for (const userDoc of artifactsSnapshot.docs) {
          const userId = userDoc.id;
          const artifactData = userDoc.data();

          if (!usersToMigrate.has(userId)) {
            usersToMigrate.set(userId, {
              createdAt: artifactData.createdAt || Timestamp.now(),
              lastLoginAt: artifactData.lastLoginAt || Timestamp.now(),
              email: null,
              displayName: null,
            });
          }
        }
      } catch (e) {
        console.log('[Migration] Could not fetch artifacts:', e.message);
      }

      setMigrationStatus(`Found ${usersToMigrate.size} unique users (${sources.join(', ')})...`);

      // 2. Create/update user documents
      let migrated = 0;
      for (const [userId, userData] of usersToMigrate) {
        try {
          const userDocRef = doc(db, 'users', userId);
          const existingDoc = await getDoc(userDocRef);

          if (!existingDoc.exists()) {
            // Create new user document
            await setDoc(userDocRef, userData);
            migrated++;
          } else {
            // Merge with existing - only update if we have earlier createdAt
            const existingData = existingDoc.data();
            const updates = {};

            if (userData.createdAt && (!existingData.createdAt ||
              userData.createdAt.toMillis?.() < existingData.createdAt?.toMillis?.())) {
              updates.createdAt = userData.createdAt;
            }
            if (userData.lastLoginAt && (!existingData.lastLoginAt ||
              userData.lastLoginAt.toMillis?.() > existingData.lastLoginAt?.toMillis?.())) {
              updates.lastLoginAt = userData.lastLoginAt;
            }
            if (!existingData.email && userData.email) updates.email = userData.email;
            if (!existingData.displayName && userData.displayName) updates.displayName = userData.displayName;

            if (Object.keys(updates).length > 0) {
              await setDoc(userDocRef, updates, { merge: true });
              migrated++;
            }
          }
        } catch (err) {
          console.error(`Failed to migrate user ${userId}:`, err);
        }
      }

      setMigrationStatus(`Migration complete! Migrated ${migrated} users.`);

      // Refresh the user list
      await fetchUsers();

    } catch (err) {
      console.error('Migration error:', err);
      setMigrationStatus(`Migration failed: ${err.message}`);
    }

    setMigrating(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[AdminAnalytics] Fetching users...');
      const usersMap = new Map(); // Use Map to deduplicate by userId

      // 1. Fetch from new users collection
      try {
        console.log('[AdminAnalytics] Attempting to fetch users collection...');
        const usersSnapshot = await getDocs(collection(db, 'users'));
        console.log('[AdminAnalytics] SUCCESS: Found', usersSnapshot.size, 'user documents in users collection');
        usersSnapshot.docs.forEach(d => console.log('[AdminAnalytics] User doc:', d.id, d.data()));

        for (const userDoc of usersSnapshot.docs) {
          const userId = userDoc.id;
          const rootData = userDoc.data();
          usersMap.set(userId, {
            id: userId,
            createdAt: rootData.createdAt,
            lastLoginAt: rootData.lastLoginAt,
            profile: {
              email: rootData.email || null,
              displayName: rootData.displayName || null,
            },
            source: 'users'
          });
        }
      } catch (e) {
        console.log('[AdminAnalytics] Could not fetch users collection:', e.message);
      }

      // 2. Fetch from user-activity collection (new login tracking)
      try {
        console.log('[AdminAnalytics] Attempting to fetch user-activity collection...');
        const activitySnapshot = await getDocs(collection(db, 'user-activity'));
        console.log('[AdminAnalytics] SUCCESS: Found', activitySnapshot.size, 'activity records');

        for (const actDoc of activitySnapshot.docs) {
          const data = actDoc.data();
          const userId = data.uid;
          if (userId && !usersMap.has(userId)) {
            usersMap.set(userId, {
              id: userId,
              createdAt: data.loginAt || null,
              lastLoginAt: data.loginAt || null,
              profile: {
                email: data.email || null,
                displayName: data.displayName || null,
              },
              source: 'user-activity'
            });
          } else if (userId && usersMap.has(userId)) {
            // Update with latest login info
            const existing = usersMap.get(userId);
            if (data.loginAt && (!existing.lastLoginAt || data.loginAt.toMillis?.() > existing.lastLoginAt.toMillis?.())) {
              existing.lastLoginAt = data.loginAt;
            }
            if (!existing.profile.email && data.email) {
              existing.profile.email = data.email;
            }
          }
        }
      } catch (e) {
        console.log('[AdminAnalytics] Could not fetch user-activity collection:', e.message);
      }

      // 3. Also fetch from artifacts collection (legacy user data)
      try {
        console.log('[AdminAnalytics] Attempting to fetch artifacts collection...');
        const artifactsSnapshot = await getDocs(collection(db, 'artifacts', APP_ID, 'users'));
        console.log('[AdminAnalytics] SUCCESS: Found', artifactsSnapshot.size, 'users in artifacts collection');

        for (const userDoc of artifactsSnapshot.docs) {
          const userId = userDoc.id;
          if (!usersMap.has(userId)) {
            const artifactData = userDoc.data();
            usersMap.set(userId, {
              id: userId,
              createdAt: artifactData.createdAt || null,
              lastLoginAt: artifactData.lastLoginAt || null,
              profile: {
                email: null,
                displayName: null,
              },
              source: 'artifacts'
            });
          }
        }
      } catch (e) {
        console.log('[AdminAnalytics] Could not fetch artifacts collection:', e.message);
      }

      // 3. Process each user to get additional data
      const usersList = [];
      for (const [userId, userData] of usersMap) {
        // Try to fetch profile data
        try {
          const profileRef = doc(db, 'users', userId, 'profile', 'info');
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            userData.profile = {
              ...userData.profile,
              ...profileData,
              email: profileData.email || userData.profile.email,
              displayName: profileData.displayName || userData.profile.displayName,
            };
          }
        } catch (e) {
          // Silently continue
        }

        userData.isPremium = false;
        userData.carnivalCount = 0;

        // Try to fetch app data from users/{userId}/apps path
        try {
          const appRef = doc(db, 'users', userId, 'apps', APP_ID);
          const appSnap = await getDoc(appRef);
          if (appSnap.exists()) {
            const appData = appSnap.data();
            userData.isPremium = !!appData.premiumActive;
            if (appData.selectedCarnivals) {
              userData.carnivalCount = Object.keys(appData.selectedCarnivals).length;
            }
          }
        } catch (e) {
          // Try artifacts path as fallback
          try {
            const artifactAppRef = doc(db, 'artifacts', APP_ID, 'users', userId);
            const artifactSnap = await getDoc(artifactAppRef);
            if (artifactSnap.exists()) {
              const appData = artifactSnap.data();
              userData.isPremium = !!appData.premiumActive;
              if (appData.selectedCarnivals) {
                userData.carnivalCount = Object.keys(appData.selectedCarnivals).length;
              }
            }
          } catch (e2) {
            // Silently continue
          }
        }

        // Check email override
        const userEmail = userData.profile?.email || '';
        if (userEmail && PREMIUM_OVERRIDE_EMAILS.includes(userEmail.toLowerCase())) {
          userData.isPremium = true;
          userData.premiumOverride = true;
        }

        usersList.push(userData);
      }

      console.log('[AdminAnalytics] Total unique users found:', usersList.length);

      usersList.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });

      setUsers(usersList);

      const premiumCount = usersList.filter(u => u.isPremium).length;
      setStats({
        total: usersList.length,
        premium: premiumCount,
        free: usersList.length - premiumCount,
      });

    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const togglePremium = async (userId, currentStatus, isOverride) => {
    if (isOverride) {
      alert('This user has premium via email override. Cannot toggle manually.');
      return;
    }

    try {
      const appRef = doc(db, 'users', userId, 'apps', APP_ID);
      await setDoc(appRef, {
        premiumActive: !currentStatus,
        premiumUpdatedAt: Timestamp.now(),
        premiumUpdatedBy: 'admin-manual',
      }, { merge: true });

      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, isPremium: !currentStatus } : u
      ));

      setStats(prev => ({
        ...prev,
        premium: currentStatus ? prev.premium - 1 : prev.premium + 1,
        free: currentStatus ? prev.free + 1 : prev.free - 1,
      }));

      alert(`Premium ${!currentStatus ? 'enabled' : 'disabled'} for user.`);

    } catch (err) {
      console.error('Error toggling premium:', err);
      alert('Failed to update premium status: ' + err.message);
    }
  };

  const filteredUsers = users.filter(user => {
    const email = user.profile?.email || user.id;
    const name = user.profile?.displayName || '';
    const search = searchTerm.toLowerCase();
    return email.toLowerCase().includes(search) || name.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-500 dark:text-gray-400">Loading user data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            User Analytics
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and manage registered users
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={migrateAuthUsers}
            disabled={migratingAuth}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {migratingAuth ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Migrate Auth Users
          </button>
          <button
            onClick={migrateUserData}
            disabled={migrating}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {migrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
            Migrate Data
          </button>
          <button
            onClick={() => setShowCleanup(!showCleanup)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition ${showCleanup
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
              }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {showCleanup ? 'Close Cleanup' : 'Cleanup Tool'}
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {showCleanup && (
        <AdminCleanup
          users={users}
          onDeleteUser={handleDeleteUser}
          onDeleteAll={handleBatchDelete}
          onClose={() => setShowCleanup(false)}
        />
      )}

      {migrationStatus && (
        <div className={`p-3 rounded-lg text-sm ${migrationStatus.includes('failed') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
          {migrationStatus}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80">Total Users</span>
          </div>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80">Premium</span>
          </div>
          <p className="text-3xl font-bold">{stats.premium}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80">Free</span>
          </div>
          <p className="text-3xl font-bold">{stats.free}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No users match your search' : 'No users found'}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              <div
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
              >
                {user.profile?.avatarUrl ? (
                  <img
                    src={user.profile.avatarUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800 dark:text-white truncate">
                      {user.profile?.displayName || 'No name'}
                    </p>
                    {user.isPremium && (
                      <span className={`px-1.5 py-0.5 text-xs rounded-full flex items-center gap-1 ${user.premiumOverride
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                        <Crown className="w-3 h-3" />
                        {user.premiumOverride ? 'Admin' : 'Premium'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.profile?.email || user.id}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {user.carnivalCount > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.carnivalCount} carnival{user.carnivalCount !== 1 ? 's' : ''}
                    </span>
                  )}
                  {expandedUser === user.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedUser === user.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">User ID</p>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">{user.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bio</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{user.profile?.bio || 'No bio'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Premium Status</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePremium(user.id, user.isPremium, user.premiumOverride);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${user.isPremium
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      {user.isPremium ? (
                        <>
                          <ToggleRight className="w-5 h-5" />
                          <span>Premium Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5" />
                          <span>Free User</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Showing {filteredUsers.length} of {users.length} users
      </p>
    </div>
  );
}
