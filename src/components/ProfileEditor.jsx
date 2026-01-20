import React, { useState, useEffect } from 'react';
import {
    User, Camera, X, Check, Loader2, Instagram, Twitter,
    Music, Globe, Shield, AlertCircle, Sparkles
} from 'lucide-react';
import { doc, getDoc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export default function ProfileEditor({
    user,
    currentProfile,
    onSave,
    onClose,
    carnivals // User's carnival data to extract history
}) {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [checkingUsername, setCheckingUsername] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        bio: '',
        isPublic: false,
        socialLinks: {
            instagram: '',
            twitter: '',
            tiktok: ''
        }
    });

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
    const [coverPhotoPreview, setCoverPhotoPreview] = useState('');

    // Load existing profile on mount
    useEffect(() => {
        if (currentProfile) {
            setFormData({
                displayName: currentProfile.displayName || user?.displayName || '',
                username: currentProfile.username || '',
                bio: currentProfile.bio || '',
                isPublic: currentProfile.isPublic || false,
                socialLinks: {
                    instagram: currentProfile.socialLinks?.instagram || '',
                    twitter: currentProfile.socialLinks?.twitter || '',
                    tiktok: currentProfile.socialLinks?.tiktok || ''
                }
            });
            setProfilePhotoPreview(currentProfile.profilePhoto || '');
            setCoverPhotoPreview(currentProfile.coverPhoto || '');
        } else {
            setFormData(prev => ({
                ...prev,
                displayName: user?.displayName || ''
            }));
        }
    }, [currentProfile, user]);

    // Username validation and availability check
    const validateUsername = async (username) => {
        if (!username) {
            setUsernameError('');
            return true;
        }

        // Format check
        const usernameRegex = /^[a-z0-9_]{3,20}$/;
        if (!usernameRegex.test(username)) {
            setUsernameError('3-20 chars, lowercase letters, numbers, underscores only');
            return false;
        }

        // Skip availability check if it's the user's current username
        if (currentProfile?.username === username) {
            setUsernameError('');
            return true;
        }

        // Check availability
        setCheckingUsername(true);
        try {
            const usernameDoc = await getDoc(doc(db, 'usernames', username));
            if (usernameDoc.exists()) {
                setUsernameError('This username is taken');
                setCheckingUsername(false);
                return false;
            }
            setUsernameError('');
            setCheckingUsername(false);
            return true;
        } catch (err) {
            console.error('Error checking username:', err);
            setCheckingUsername(false);
            return true; // Allow save attempt, server will reject if taken
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        setFormData(prev => ({ ...prev, username: value }));
        // Debounce the validation
        const timeoutId = setTimeout(() => validateUsername(value), 500);
        return () => clearTimeout(timeoutId);
    };

    const handlePhotoSelect = (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be under 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (type === 'profile') {
                setProfilePhoto(file);
                setProfilePhotoPreview(reader.result);
            } else {
                setCoverPhoto(file);
                setCoverPhotoPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    // Extract carnival history from user's carnival data
    const extractCarnivalHistory = () => {
        if (!carnivals) return [];

        const history = [];
        Object.entries(carnivals).forEach(([carnivalId, data]) => {
            if (data.costume?.band) {
                history.push({
                    carnivalId,
                    year: new Date().getFullYear(), // Could be enhanced to track actual year
                    band: data.costume.band,
                    section: data.costume.section || null
                });
            }
        });
        return history;
    };

    const handleSave = async () => {
        if (!user) return;

        // Validate username if provided
        if (formData.username && !(await validateUsername(formData.username))) {
            return;
        }

        setSaving(true);
        setError('');

        try {
            let profilePhotoUrl = currentProfile?.profilePhoto || '';
            let coverPhotoUrl = currentProfile?.coverPhoto || '';

            // Upload profile photo if changed
            if (profilePhoto) {
                const photoRef = ref(storage, `profiles/${user.uid}/avatar_${Date.now()}`);
                await uploadBytes(photoRef, profilePhoto);
                profilePhotoUrl = await getDownloadURL(photoRef);
            }

            // Upload cover photo if changed
            if (coverPhoto) {
                const coverRef = ref(storage, `profiles/${user.uid}/cover_${Date.now()}`);
                await uploadBytes(coverRef, coverPhoto);
                coverPhotoUrl = await getDownloadURL(coverRef);
            }

            // Handle username registry (for uniqueness)
            const oldUsername = currentProfile?.username;
            const newUsername = formData.username;

            if (oldUsername && oldUsername !== newUsername) {
                // Delete old username claim
                await deleteDoc(doc(db, 'usernames', oldUsername));
            }

            if (newUsername && newUsername !== oldUsername) {
                // Claim new username
                await setDoc(doc(db, 'usernames', newUsername), {
                    userId: user.uid,
                    claimedAt: Timestamp.now()
                });
            }

            // Build profile data
            const carnivalHistory = extractCarnivalHistory();
            const profileData = {
                userId: user.uid,
                displayName: formData.displayName || user.displayName || 'Carnival Lover',
                username: formData.username || null,
                bio: formData.bio || '',
                profilePhoto: profilePhotoUrl,
                coverPhoto: coverPhotoUrl,
                isPublic: formData.isPublic,
                socialLinks: formData.socialLinks,
                carnivalHistory,
                stats: {
                    carnivalsAttended: carnivalHistory.length,
                    countriesVisited: [...new Set(carnivalHistory.map(c => c.carnivalId))].length,
                    bandsPlayedWith: [...new Set(carnivalHistory.map(c => c.band).filter(Boolean))]
                },
                updatedAt: Timestamp.now(),
                ...(currentProfile ? {} : { createdAt: Timestamp.now() })
            };

            // Save to Firestore
            await setDoc(doc(db, 'userProfiles', user.uid), profileData, { merge: true });

            onSave?.(profileData);
            onClose?.();
        } catch (err) {
            console.error('Error saving profile:', err);
            setError(err.message || 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Cover Photo */}
                    <div className="relative">
                        <div className="h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                            {coverPhotoPreview && (
                                <img src={coverPhotoPreview} alt="Cover" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <label className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                            <Camera className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoSelect(e, 'cover')}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Profile Photo */}
                    <div className="flex justify-center -mt-16 relative z-10">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                                {profilePhotoPreview ? (
                                    <img src={profilePhotoPreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full cursor-pointer hover:bg-purple-600 transition-colors shadow-lg">
                                <Camera className="w-4 h-4 text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePhotoSelect(e, 'profile')}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Your carnival name"
                            maxLength={50}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={handleUsernameChange}
                                className={`w-full pl-8 pr-10 py-3 rounded-xl border ${usernameError
                                        ? 'border-red-300 dark:border-red-500'
                                        : 'border-gray-200 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                                placeholder="your_username"
                                maxLength={20}
                            />
                            {checkingUsername && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                            )}
                        </div>
                        {usernameError && (
                            <p className="mt-1 text-xs text-red-500">{usernameError}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">Your public profile URL: carnivalplanner.app/profile/{formData.username || 'username'}</p>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                            placeholder="Tell the fete world about your carnival journey... 🎭"
                            rows={3}
                            maxLength={200}
                        />
                        <p className="text-xs text-gray-400 text-right">{formData.bio.length}/200</p>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Social Links
                        </label>
                        <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                            <input
                                type="text"
                                value={formData.socialLinks.instagram}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, instagram: e.target.value.replace('@', '') }
                                }))}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                placeholder="Instagram username"
                            />
                        </div>
                        <div className="relative">
                            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                            <input
                                type="text"
                                value={formData.socialLinks.twitter}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, twitter: e.target.value.replace('@', '') }
                                }))}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                placeholder="Twitter/X username"
                            />
                        </div>
                        <div className="relative">
                            <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                            <input
                                type="text"
                                value={formData.socialLinks.tiktok}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialLinks: { ...prev.socialLinks, tiktok: e.target.value.replace('@', '') }
                                }))}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                placeholder="TikTok username"
                            />
                        </div>
                    </div>

                    {/* Public Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            {formData.isPublic ? (
                                <Globe className="w-5 h-5 text-green-500" />
                            ) : (
                                <Shield className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">Public Profile</p>
                                <p className="text-xs text-gray-500">Anyone can view your carnival history</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                            className={`relative w-12 h-7 rounded-full transition-colors ${formData.isPublic ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.isPublic ? 'translate-x-5' : ''
                                }`} />
                        </button>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={saving || !!usernameError}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check className="w-5 h-5" />
                                Save Profile
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
