import React, { useState, useEffect, useRef } from 'react';
import { Trash2, AlertTriangle, Loader2, X, User, Camera, Save, Edit2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app, { auth, db, storage } from '../firebase';

export default function AccountSettings({ user, onClose }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatarUrl: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    
    const loadProfile = async () => {
      try {
        const profileRef = doc(db, 'users', user.uid, 'profile', 'info');
        const snap = await getDoc(profileRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfile({
            displayName: data.displayName || user.displayName || '',
            bio: data.bio || '',
            avatarUrl: data.avatarUrl || user.photoURL || ''
          });
        } else {
          setProfile({
            displayName: user.displayName || '',
            bio: '',
            avatarUrl: user.photoURL || ''
          });
        }
      } catch (err) {
        console.log('Could not load profile:', err);
      }
    };
    
    loadProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    setError('');
    
    try {
      const profileRef = doc(db, 'users', user.uid, 'profile', 'info');
      await setDoc(profileRef, {
        displayName: profile.displayName,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        updatedAt: Timestamp.now()
      }, { merge: true });
      
      setIsEditingProfile(false);
      setProfileSuccess('Profile saved!');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Could not save profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image too large. Max 2MB.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, GIF, or WebP image.');
      return;
    }

    setIsUploadingAvatar(true);
    setError('');

    try {
      const timestamp = Date.now();
      const ext = file.name.split('.').pop();
      const storagePath = `avatars/${user.uid}/${timestamp}.${ext}`;
      const storageRef = ref(storage, storagePath);
      
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      
      setProfile(prev => ({ ...prev, avatarUrl: downloadUrl }));
      
      const profileRef = doc(db, 'users', user.uid, 'profile', 'info');
      await setDoc(profileRef, {
        avatarUrl: downloadUrl,
        updatedAt: Timestamp.now()
      }, { merge: true });
      
      setProfileSuccess('Avatar updated!');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch (err) {
      console.error('Avatar upload error:', err);
      setError('Could not upload avatar. Please try again.');
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const functions = getFunctions(app);
      const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
      await deleteUserAccount();
      
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err.message || 'Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Account Settings</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {profileSuccess && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
          {profileSuccess}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition"
              >
                {isUploadingAvatar ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </label>
            </div>

            <div className="flex-1">
              {isEditingProfile ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                      rows={3}
                      maxLength={200}
                    />
                    <p className="text-xs text-gray-400 mt-1">{profile.bio.length}/200</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSavingProfile ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                    {profile.displayName || 'No name set'}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user?.email}</p>
                  {profile.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{profile.bio}</p>
                  )}
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-red-600 dark:text-red-400 font-bold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete My Account
            </button>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                This will permanently delete:
              </p>
              <ul className="text-sm text-red-500 dark:text-red-400 list-disc list-inside mb-4 space-y-1">
                <li>All your carnival plans and data</li>
                <li>Uploaded photos and documents</li>
                <li>Squad memberships</li>
                <li>Your account and login</li>
              </ul>
              
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">DELETE</span> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                    setError('');
                  }}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Forever
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
