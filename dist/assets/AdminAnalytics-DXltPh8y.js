const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-firebase-data-O6IN0zfq.js","assets/vendor-firebase-core-DHwGrt-V.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, _ as __vitePreload } from "./vendor-3d-C6aqP7jv.js";
import { r as reactExports } from "./vendor-swr-BEHUV5vo.js";
import { d as doc, j as getDocs, c as collection, T as Timestamp, h as getDoc, s as setDoc } from "./vendor-firebase-data-O6IN0zfq.js";
import { c as createLucideIcon, L as Loader2, U as Users, D as Download, b as MapPin, d as db, h as httpsCallable, g as getFunctions, e as app } from "./index-CXUot43X.js";
import AdminCleanup from "./AdminCleanup-D3SnuILQ.js";
import { S as ShieldAlert } from "./shield-alert-IiPvvEM9.js";
import { C as Crown } from "./crown-i0HipylQ.js";
import { S as Search } from "./search-DRRdb94Y.js";
import { C as ChevronDown } from "./chevron-down-BKwfjrDe.js";
import { T as ToggleRight, a as ToggleLeft } from "./toggle-right-70YlzWSB.js";
import "./vendor-maps-DCMhh9kT.js";
import "./vendor-firebase-core-DHwGrt-V.js";
import "./check-LoUvj2UR.js";
import "./alert-triangle-eo7cw2j4.js";
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronUp = createLucideIcon("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
const APP_ID = "carnival-planner-v1";
const PREMIUM_OVERRIDE_EMAILS = ["djkrss1@gmail.com"];
const functions = getFunctions(app);
function AdminAnalytics() {
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [expandedUser, setExpandedUser] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({ total: 0, premium: 0, free: 0 });
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [migrating, setMigrating] = reactExports.useState(false);
  const [migrationStatus, setMigrationStatus] = reactExports.useState(null);
  const [migratingAuth, setMigratingAuth] = reactExports.useState(false);
  const [showCleanup, setShowCleanup] = reactExports.useState(false);
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      await __vitePreload(async () => {
        const { deleteDoc } = await import("./vendor-firebase-data-O6IN0zfq.js").then((n) => n.A);
        return { deleteDoc };
      }, true ? __vite__mapDeps([0,1]) : void 0).then(({ deleteDoc }) => {
        deleteDoc(doc(db, "users", userId));
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setStats((prev) => ({ ...prev, total: prev.total - 1, free: prev.free - 1 }));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user: " + err.message);
    }
  };
  const handleBatchDelete = async (userIds) => {
    try {
      const { deleteDoc } = await __vitePreload(async () => {
        const { deleteDoc: deleteDoc2 } = await import("./vendor-firebase-data-O6IN0zfq.js").then((n) => n.A);
        return { deleteDoc: deleteDoc2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      let count = 0;
      for (const id of userIds) {
        await deleteDoc(doc(db, "users", id));
        count++;
      }
      setUsers((prev) => prev.filter((u) => !userIds.includes(u.id)));
      setStats((prev) => ({
        ...prev,
        total: prev.total - count,
        free: prev.free - count
      }));
      alert(`Successfully deleted ${count} users.`);
    } catch (err) {
      console.error("Batch delete error:", err);
      alert("Batch delete failed partially: " + err.message);
    }
  };
  const migrateAuthUsers = async () => {
    setMigratingAuth(true);
    setMigrationStatus("Migrating users from Firebase Auth...");
    try {
      const migrateAuthUsersFn = httpsCallable(functions, "migrateAuthUsers");
      const result = await migrateAuthUsersFn({});
      setMigrationStatus(result.data.message);
      await fetchUsers();
    } catch (err) {
      console.error("Auth migration error:", err);
      setMigrationStatus(`Auth migration failed: ${err.message}`);
    }
    setMigratingAuth(false);
  };
  const migrateUserData = async () => {
    setMigrating(true);
    setMigrationStatus("Starting migration...");
    try {
      const usersToMigrate = /* @__PURE__ */ new Map();
      let sources = [];
      try {
        const activitySnapshot = await getDocs(collection(db, "user-activity"));
        console.log("[Migration] Found", activitySnapshot.size, "user-activity records");
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
              displayName: data.displayName || null
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
        console.log("[Migration] Could not fetch user-activity:", e.message);
      }
      try {
        const artifactsSnapshot = await getDocs(collection(db, "artifacts", APP_ID, "users"));
        console.log("[Migration] Found", artifactsSnapshot.size, "artifact users");
        sources.push(`${artifactsSnapshot.size} artifact users`);
        for (const userDoc of artifactsSnapshot.docs) {
          const userId = userDoc.id;
          const artifactData = userDoc.data();
          if (!usersToMigrate.has(userId)) {
            usersToMigrate.set(userId, {
              createdAt: artifactData.createdAt || Timestamp.now(),
              lastLoginAt: artifactData.lastLoginAt || Timestamp.now(),
              email: null,
              displayName: null
            });
          }
        }
      } catch (e) {
        console.log("[Migration] Could not fetch artifacts:", e.message);
      }
      setMigrationStatus(`Found ${usersToMigrate.size} unique users (${sources.join(", ")})...`);
      let migrated = 0;
      for (const [userId, userData] of usersToMigrate) {
        try {
          const userDocRef = doc(db, "users", userId);
          const existingDoc = await getDoc(userDocRef);
          if (!existingDoc.exists()) {
            await setDoc(userDocRef, userData);
            migrated++;
          } else {
            const existingData = existingDoc.data();
            const updates = {};
            if (userData.createdAt && (!existingData.createdAt || userData.createdAt.toMillis?.() < existingData.createdAt?.toMillis?.())) {
              updates.createdAt = userData.createdAt;
            }
            if (userData.lastLoginAt && (!existingData.lastLoginAt || userData.lastLoginAt.toMillis?.() > existingData.lastLoginAt?.toMillis?.())) {
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
      await fetchUsers();
    } catch (err) {
      console.error("Migration error:", err);
      setMigrationStatus(`Migration failed: ${err.message}`);
    }
    setMigrating(false);
  };
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("[AdminAnalytics] Fetching users via Cloud Function...");
      try {
        const getAdminUsersFn = httpsCallable(functions, "getAdminUsers");
        const result = await getAdminUsersFn({});
        const { users: serverUsers, total, premium } = result.data;
        console.log(`[AdminAnalytics] Cloud Function returned ${total} users`);
        const usersList2 = serverUsers.map((u) => ({
          id: u.id,
          createdAt: u.createdAt ? { toDate: () => new Date(u.createdAt) } : null,
          lastLoginAt: u.lastLoginAt ? { toDate: () => new Date(u.lastLoginAt) } : null,
          profile: {
            email: u.email,
            displayName: u.displayName
          },
          isPremium: u.isPremium,
          premiumOverride: u.email && ["djkrss1@gmail.com"].includes(u.email.toLowerCase()),
          carnivalCount: u.carnivalCount || 0,
          provider: u.provider,
          source: "auth"
        }));
        usersList2.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || /* @__PURE__ */ new Date(0);
          const dateB = b.createdAt?.toDate?.() || /* @__PURE__ */ new Date(0);
          return dateB - dateA;
        });
        setUsers(usersList2);
        setStats({
          total: usersList2.length,
          premium: usersList2.filter((u) => u.isPremium).length,
          free: usersList2.filter((u) => !u.isPremium).length
        });
        setLoading(false);
        return;
      } catch (cfErr) {
        console.warn("[AdminAnalytics] Cloud Function failed, falling back to Firestore:", cfErr.message);
      }
      console.log("[AdminAnalytics] Falling back to Firestore queries...");
      const usersMap = /* @__PURE__ */ new Map();
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        console.log("[AdminAnalytics] Found", usersSnapshot.size, "user documents in users collection");
        for (const userDoc of usersSnapshot.docs) {
          const userId = userDoc.id;
          const rootData = userDoc.data();
          usersMap.set(userId, {
            id: userId,
            createdAt: rootData.createdAt,
            lastLoginAt: rootData.lastLoginAt,
            profile: {
              email: rootData.email || null,
              displayName: rootData.displayName || null
            },
            source: "users"
          });
        }
      } catch (e) {
        console.log("[AdminAnalytics] Could not fetch users collection:", e.message);
      }
      try {
        const activitySnapshot = await getDocs(collection(db, "user-activity"));
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
                displayName: data.displayName || null
              },
              source: "user-activity"
            });
          } else if (userId && usersMap.has(userId)) {
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
        console.log("[AdminAnalytics] Could not fetch user-activity collection:", e.message);
      }
      try {
        const artifactsSnapshot = await getDocs(collection(db, "artifacts", APP_ID, "users"));
        for (const userDoc of artifactsSnapshot.docs) {
          const userId = userDoc.id;
          if (!usersMap.has(userId)) {
            const artifactData = userDoc.data();
            usersMap.set(userId, {
              id: userId,
              createdAt: artifactData.createdAt || null,
              lastLoginAt: artifactData.lastLoginAt || null,
              profile: { email: null, displayName: null },
              source: "artifacts"
            });
          }
        }
      } catch (e) {
        console.log("[AdminAnalytics] Could not fetch artifacts collection:", e.message);
      }
      const usersList = [];
      for (const [userId, userData] of usersMap) {
        try {
          const profileRef = doc(db, "users", userId, "profile", "info");
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            userData.profile = {
              ...userData.profile,
              ...profileData,
              email: profileData.email || userData.profile.email,
              displayName: profileData.displayName || userData.profile.displayName
            };
          }
        } catch (e) {
        }
        userData.isPremium = false;
        userData.carnivalCount = 0;
        try {
          const appRef = doc(db, "users", userId, "apps", APP_ID);
          const appSnap = await getDoc(appRef);
          if (appSnap.exists()) {
            const appData = appSnap.data();
            userData.isPremium = !!appData.premiumActive;
            if (appData.selectedCarnivals) {
              userData.carnivalCount = Object.keys(appData.selectedCarnivals).length;
            }
          }
        } catch (e) {
          try {
            const artifactAppRef = doc(db, "artifacts", APP_ID, "users", userId);
            const artifactSnap = await getDoc(artifactAppRef);
            if (artifactSnap.exists()) {
              const appData = artifactSnap.data();
              userData.isPremium = !!appData.premiumActive;
              if (appData.selectedCarnivals) {
                userData.carnivalCount = Object.keys(appData.selectedCarnivals).length;
              }
            }
          } catch (e2) {
          }
        }
        const userEmail = userData.profile?.email || "";
        if (userEmail && PREMIUM_OVERRIDE_EMAILS.includes(userEmail.toLowerCase())) {
          userData.isPremium = true;
          userData.premiumOverride = true;
        }
        usersList.push(userData);
      }
      console.log("[AdminAnalytics] Total unique users found:", usersList.length);
      usersList.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || /* @__PURE__ */ new Date(0);
        const dateB = b.createdAt?.toDate?.() || /* @__PURE__ */ new Date(0);
        return dateB - dateA;
      });
      setUsers(usersList);
      const premiumCount = usersList.filter((u) => u.isPremium).length;
      setStats({
        total: usersList.length,
        premium: premiumCount,
        free: usersList.length - premiumCount
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
    }
    setLoading(false);
  };
  reactExports.useEffect(() => {
    fetchUsers();
  }, []);
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };
  const togglePremium = async (userId, currentStatus, isOverride) => {
    if (isOverride) {
      alert("This user has premium via email override. Cannot toggle manually.");
      return;
    }
    try {
      const appRef = doc(db, "users", userId, "apps", APP_ID);
      await setDoc(appRef, {
        premiumActive: !currentStatus,
        premiumUpdatedAt: Timestamp.now(),
        premiumUpdatedBy: "admin-manual"
      }, { merge: true });
      setUsers((prev) => prev.map(
        (u) => u.id === userId ? { ...u, isPremium: !currentStatus } : u
      ));
      setStats((prev) => ({
        ...prev,
        premium: currentStatus ? prev.premium - 1 : prev.premium + 1,
        free: currentStatus ? prev.free + 1 : prev.free - 1
      }));
      alert(`Premium ${!currentStatus ? "enabled" : "disabled"} for user.`);
    } catch (err) {
      console.error("Error toggling premium:", err);
      alert("Failed to update premium status: " + err.message);
    }
  };
  const filteredUsers = users.filter((user) => {
    const email = user.profile?.email || user.id;
    const name = user.profile?.displayName || "";
    const search = searchTerm.toLowerCase();
    return email.toLowerCase().includes(search) || name.toLowerCase().includes(search);
  });
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-8 h-8 animate-spin text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-500 dark:text-gray-400", children: "Loading user data..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleRefresh,
          className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
          children: "Try Again"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-blue-500" }),
          "User Analytics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "View and manage registered users" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: migrateAuthUsers,
            disabled: migratingAuth,
            className: "flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-50",
            children: [
              migratingAuth ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Migrate Auth Users"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: migrateUserData,
            disabled: migrating,
            className: "flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50",
            children: [
              migrating ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              "Migrate Data"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowCleanup(!showCleanup),
            className: `flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition ${showCleanup ? "bg-red-600 text-white hover:bg-red-700" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" }),
              showCleanup ? "Close Cleanup" : "Cleanup Tool"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRefresh,
            disabled: refreshing,
            className: "flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${refreshing ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    showCleanup && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminCleanup,
      {
        users,
        onDeleteUser: handleDeleteUser,
        onDeleteAll: handleBatchDelete,
        onClose: () => setShowCleanup(false)
      }
    ),
    migrationStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-lg text-sm ${migrationStatus.includes("failed") ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`, children: migrationStatus }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium opacity-80", children: "Total Users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats.total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium opacity-80", children: "Premium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats.premium })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl p-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium opacity-80", children: "Free" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: stats.free })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by email or name...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400", children: searchTerm ? "No users match your search" : "No users found" }) : filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600",
              onClick: () => setExpandedUser(expandedUser === user.id ? null : user.id),
              children: [
                user.profile?.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: user.profile.avatarUrl,
                    alt: "",
                    className: "w-10 h-10 rounded-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-gray-400 dark:text-gray-300" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800 dark:text-white truncate", children: user.profile?.displayName || "No name" }),
                    user.isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-1.5 py-0.5 text-xs rounded-full flex items-center gap-1 ${user.premiumOverride ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"}`, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
                      user.premiumOverride ? "Admin" : "Premium"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 truncate", children: user.profile?.email || user.id })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  user.carnivalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                    user.carnivalCount,
                    " carnival",
                    user.carnivalCount !== 1 ? "s" : ""
                  ] }),
                  expandedUser === user.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5 text-gray-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-gray-400" })
                ] })
              ]
            }
          ),
          expandedUser === user.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mb-1", children: "User ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-gray-700 dark:text-gray-300 truncate", children: user.id })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mb-1", children: "Bio" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: user.profile?.bio || "No bio" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Premium Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    togglePremium(user.id, user.isPremium, user.premiumOverride);
                  },
                  className: `flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${user.isPremium ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,
                  children: user.isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Premium Active" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free User" })
                  ] })
                }
              )
            ] })
          ] })
        ]
      },
      user.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 dark:text-gray-500 text-center", children: [
      "Showing ",
      filteredUsers.length,
      " of ",
      users.length,
      " users"
    ] })
  ] });
}
export {
  AdminAnalytics as default
};
