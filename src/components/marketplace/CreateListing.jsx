import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Plus, Edit3, Trash2, X, Save, Ticket, Shirt, DollarSign, ImageIcon, Upload, Loader2, Box } from 'lucide-react';

const CARNIVAL_OPTIONS = [
    'Trinidad', 'Jamaica', 'Miami', 'Toronto', 'Barbados', 'St. Lucia',
    'Antigua', 'Grenada', 'New York', 'Bermuda', 'Bahamas', 'Atlanta',
    'St. Vincent', 'Tobago', 'Other',
];

export default function CreateListing({ user, sellerStatus }) {
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const modelInputRef = useRef(null);
    const [modelFile, setModelFile] = useState(null);
    const [modelUploading, setModelUploading] = useState(false);
    const [modelProgress, setModelProgress] = useState(0);
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'ticket',
        price: '',
        carnival: '',
        imageUrl: '',
    });

    // Fetch seller's own listings
    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'marketplaceListings'),
            where('sellerId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setMyListings(items);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching seller listings:', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const resetForm = () => {
        setForm({ title: '', description: '', category: 'ticket', price: '', carnival: '', imageUrl: '' });
        setEditingId(null);
        setShowForm(false);
        setImageFile(null);
        setImagePreview(null);
        setUploadProgress(0);
        setModelFile(null);
        setModelProgress(0);
    };

    // --- Image compression utility ---
    const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                let w = img.width, h = img.height;
                if (w > maxWidth) { h = (maxWidth / w) * h; w = maxWidth; }
                canvas.width = w;
                canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', quality);
            };
            img.src = URL.createObjectURL(file);
        });
    };

    // --- Handle image file selection ---
    const handleImageSelect = async (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPEG, PNG, etc.).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be under 5MB.');
            return;
        }
        const compressed = await compressImage(file);
        setImageFile(compressed);
        setImagePreview(URL.createObjectURL(compressed));
    };

    // --- Upload image to Firebase Storage ---
    const uploadImage = () => {
        return new Promise((resolve, reject) => {
            if (!imageFile || !user) { resolve(null); return; }
            const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
            const storageRef = ref(storage, `marketplace/${user.uid}/${filename}`);
            const task = uploadBytesResumable(storageRef, imageFile, { contentType: 'image/jpeg' });

            setUploading(true);
            task.on('state_changed',
                (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
                (err) => { setUploading(false); reject(err); },
                async () => {
                    const url = await getDownloadURL(task.snapshot.ref);
                    setUploading(false);
                    resolve(url);
                }
            );
        });
    };

    // --- Remove image ---
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setForm(f => ({ ...f, imageUrl: '' }));
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleEdit = (listing) => {
        setForm({
            title: listing.title || '',
            description: listing.description || '',
            category: listing.category || 'ticket',
            price: String(listing.price || ''),
            carnival: listing.carnival || '',
            imageUrl: listing.imageUrl || '',
        });
        setEditingId(listing.id);
        setShowForm(true);
    };

    const handleDelete = async (listingId) => {
        if (!confirm('Are you sure you want to delete this listing?')) return;
        try {
            await deleteDoc(doc(db, 'marketplaceListings', listingId));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete listing.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.price) {
            alert('Title and price are required.');
            return;
        }

        const price = parseFloat(form.price);
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price.');
            return;
        }

        if (!sellerStatus?.onboardingComplete) {
            alert('Please complete Stripe seller onboarding before creating listings.');
            return;
        }

        setSaving(true);

        try {
            const listingData = {
                title: form.title.trim(),
                description: form.description.trim(),
                category: form.category,
                price: price,
                currency: 'usd',
                carnival: form.carnival,
                sellerId: user.uid,
                sellerName: user.displayName || user.email || 'Seller',
                status: 'active',
            };

            // Upload image if a new file was selected
            let finalImageUrl = form.imageUrl;
            if (imageFile) {
                finalImageUrl = await uploadImage();
            }
            listingData.imageUrl = finalImageUrl || '';

            // Upload 3D model if selected (costume only)
            if (modelFile && form.category === 'costume') {
                setModelUploading(true);
                const modelFilename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.glb`;
                const modelRef = ref(storage, `models/${user.uid}/${modelFilename}`);
                const modelTask = uploadBytesResumable(modelRef, modelFile, { contentType: 'model/gltf-binary' });

                await new Promise((resolve, reject) => {
                    modelTask.on('state_changed',
                        (snap) => setModelProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
                        (err) => { setModelUploading(false); reject(err); },
                        async () => {
                            const url = await getDownloadURL(modelTask.snapshot.ref);
                            listingData.model3dUrl = url;
                            setModelUploading(false);
                            resolve();
                        }
                    );
                });
            }

            if (editingId) {
                // Update existing
                await updateDoc(doc(db, 'marketplaceListings', editingId), {
                    ...listingData,
                    updatedAt: new Date(),
                });
            } else {
                // Create new
                const newRef = doc(collection(db, 'marketplaceListings'));
                await setDoc(newRef, {
                    ...listingData,
                    createdAt: new Date(),
                });
            }

            resetForm();
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save listing. ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400';
            case 'sold': return 'bg-blue-500/20 text-blue-400';
            case 'removed': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    if (!sellerStatus?.onboardingComplete) {
        return (
            <div className="text-center py-12">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-lg font-bold text-white mb-2">Complete Seller Setup First</h3>
                <p className="text-gray-400 text-sm">
                    You need to connect your Stripe account before you can create listings.
                    Go to the <strong className="text-purple-400">Sell</strong> tab to get started.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">My Listings</h3>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" />
                    New Listing
                </button>
            </div>

            {/* Create/Edit Form */}
            {showForm && (
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-white">
                            {editingId ? 'Edit Listing' : 'Create New Listing'}
                        </h4>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Category */}
                        <div className="flex gap-2">
                            {[
                                { id: 'ticket', label: 'Ticket', icon: Ticket },
                                { id: 'costume', label: 'Costume', icon: Shirt },
                            ].map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        type="button"
                                        key={cat.id}
                                        onClick={() => setForm(f => ({ ...f, category: cat.id }))}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${form.category === cat.id
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Title */}
                        <input
                            type="text"
                            placeholder="Listing title (e.g., 'Tribe Frontline Costume - Large')"
                            value={form.title}
                            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            required
                        />

                        {/* Description */}
                        <textarea
                            placeholder="Describe the item..."
                            value={form.description}
                            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                        />

                        {/* Price + Carnival */}
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    placeholder="Price"
                                    value={form.price}
                                    onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    required
                                />
                            </div>
                            <select
                                value={form.carnival}
                                onChange={(e) => setForm(f => ({ ...f, carnival: e.target.value }))}
                                className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
                            >
                                <option value="">Select Carnival</option>
                                {CARNIVAL_OPTIONS.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => handleImageSelect(e.target.files[0])}
                                className="hidden"
                            />

                            {(imagePreview || form.imageUrl) ? (
                                <div className="relative rounded-xl overflow-hidden border border-gray-600">
                                    <img
                                        src={imagePreview || form.imageUrl}
                                        alt="Preview"
                                        className="w-full h-40 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 rounded-full text-white transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                    {uploading && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-300 text-center mt-1">{uploadProgress}% uploaded</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-purple-500', 'bg-purple-500/10'); }}
                                    onDragLeave={(e) => { e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10'); }}
                                    onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10'); handleImageSelect(e.dataTransfer.files[0]); }}
                                    className="w-full h-32 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-purple-400 transition-all cursor-pointer"
                                >
                                    <Upload className="w-6 h-6" />
                                    <span className="text-xs font-medium">Drop image here or click to upload</span>
                                    <span className="text-[10px] text-gray-500">JPEG, PNG • Max 5MB</span>
                                </button>
                            )}
                        </div>

                        {/* 3D Model Upload (costume only) */}
                        {form.category === 'costume' && (
                            <div>
                                <input
                                    type="file"
                                    accept=".glb,.gltf"
                                    ref={modelInputRef}
                                    onChange={(e) => {
                                        const f = e.target.files[0];
                                        if (f && f.size > 20 * 1024 * 1024) {
                                            alert('3D model must be under 20MB.');
                                            return;
                                        }
                                        setModelFile(f);
                                    }}
                                    className="hidden"
                                />
                                {modelFile ? (
                                    <div className="flex items-center gap-3 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                                        <Box className="w-5 h-5 text-indigo-400" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white truncate">{modelFile.name}</p>
                                            <p className="text-[10px] text-gray-400">{(modelFile.size / 1024 / 1024).toFixed(1)} MB</p>
                                            {modelUploading && (
                                                <div className="h-1 bg-gray-700 rounded-full mt-1">
                                                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${modelProgress}%` }} />
                                                </div>
                                            )}
                                        </div>
                                        <button type="button" onClick={() => { setModelFile(null); if (modelInputRef.current) modelInputRef.current.value = ''; }} className="text-gray-400 hover:text-white">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => modelInputRef.current?.click()}
                                        className="w-full py-3 border border-dashed border-indigo-500/40 hover:border-indigo-400 rounded-xl flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-all"
                                    >
                                        <Box className="w-4 h-4" />
                                        Upload 3D Model (.glb) — Optional
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Uploading image...</>
                            ) : saving ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                            ) : (
                                <><Save className="w-4 h-4" /> {editingId ? 'Update Listing' : 'Publish Listing'}</>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* My Listings */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-gray-800/50 rounded-xl p-4 animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                            <div className="h-3 bg-gray-700 rounded w-1/4" />
                        </div>
                    ))}
                </div>
            ) : myListings.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-3">📦</div>
                    <p className="text-gray-400 text-sm">You haven't listed anything yet. Click "New Listing" to get started!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {myListings.map((listing) => (
                        <div key={listing.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-bold text-white truncate">{listing.title}</h4>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColor(listing.status)}`}>
                                        {listing.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span>{listing.category === 'ticket' ? '🎫' : '👗'} {listing.category}</span>
                                    <span className="font-bold text-green-400">${listing.price}</span>
                                    {listing.carnival && <span>• {listing.carnival}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {listing.status === 'active' && (
                                    <button
                                        onClick={() => handleEdit(listing)}
                                        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-gray-700 rounded-lg transition-all"
                                        title="Edit"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(listing.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-all"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
