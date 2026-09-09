import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Building2, 
  MessageCircle, 
  Download, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Settings, 
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  DollarSign,
  Trash2,
  Check,
  Upload,
  Image as ImageIcon,
  HelpCircle,
  AlertCircle,
  LogIn,
  Lock,
  FileText,
  Globe,
  Plus,
  X,
  AlertTriangle,
  History,
  ArrowLeft
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { MOY_AGENT_PROFILE, MOY_TRAVEL_PACKAGES, DEFAULT_SITE_CONTENT } from './travelData';
import { resolveTravelImageUrl, getTravelImageFallback, sanitizePackageData } from '../../utils/travelMedia';
import { uploadImageResilient } from '../../utils/imageUploadService';

class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('[MoyAgentDashboard Error]', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-3xl bg-slate-900 border border-rose-500/40 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold">
            ⚠️
          </div>
          <h3 className="text-lg font-black text-white uppercase font-heading">
            {this.props.fallbackTitle || 'Display Notice'}
          </h3>
          <p className="text-xs text-slate-300">
            {this.state.error?.message || 'An unexpected rendering issue occurred. Your data in the database remains safe.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
            }}
            className="px-5 py-2 rounded-xl bg-[#00e5cc] text-black font-black text-xs uppercase tracking-wider hover:bg-[#24f6df] transition-all shadow-md"
          >
            Reset & Return
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MoyAgentDashboard({ onClose, user }) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'packages' | 'gateway' | 'siteContent'
  const [bookings, setBookings] = useState([]);
  const [packagesList, setPackagesList] = useState(() => {
    try {
      const cached = localStorage.getItem('mmw_packages_custom');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(sanitizePackageData);
      }
    } catch (e) {}
    return MOY_TRAVEL_PACKAGES.map(sanitizePackageData);
  });
  const [editingPkg, setEditingPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [passcode, setPasscode] = useState('');

  // Live Firebase Auth User Sync
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser || user || null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
      } else if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsub();
  }, [user]);

  const ADMIN_EMAILS = [
    'djkrss1@gmail.com', 
    'info@moymeetsworld.com', 
    'moymeetsworld@gmail.com',
    'defoursemoy@gmail.com',
    'info@moysworld.com'
  ];

  const isSuperAdmin = Boolean(
    currentUser?.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase())
  );
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mmw_agent_auth') === 'true' || isSuperAdmin;
  });

  useEffect(() => {
    if (isSuperAdmin) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('mmw_agent_auth', 'true');
      } catch (e) {}
    }
  }, [isSuperAdmin]);

  // Auth Modal States
  const [authMode, setAuthMode] = useState('passcode'); // 'passcode' | 'google' | 'email'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [isSavingPkg, setIsSavingPkg] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); // 'heroImage' | 'cardImage' | null
  const [uploadSuccessField, setUploadSuccessField] = useState(null); // 'heroImage' | 'cardImage' | null
  const [autosaveStatus, setAutosaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'local_only'
  const [lastSavedText, setLastSavedText] = useState('');
  const [restoredFromDraft, setRestoredFromDraft] = useState(false);
  const autosaveTimerRef = useRef(null);

  // Trinidad Gateway Settings Form State
  const [wipayId, setWipayId] = useState(() => {
    try {
      const draft = JSON.parse(localStorage.getItem('mmw_gateway_draft') || '{}');
      return draft.wipayId || MOY_AGENT_PROFILE.trinidadBankingInfo.wipayMerchantId;
    } catch (e) {
      return MOY_AGENT_PROFILE.trinidadBankingInfo.wipayMerchantId;
    }
  });
  const [whatsappNum, setWhatsappNum] = useState(() => {
    try {
      const draft = JSON.parse(localStorage.getItem('mmw_gateway_draft') || '{}');
      return draft.whatsappNum || MOY_AGENT_PROFILE.whatsappNumber;
    } catch (e) {
      return MOY_AGENT_PROFILE.whatsappNumber;
    }
  });
  const [bankAccount, setBankAccount] = useState(() => {
    try {
      const draft = JSON.parse(localStorage.getItem('mmw_gateway_draft') || '{}');
      return draft.bankAccount || '180-801-445-001';
    } catch (e) {
      return '180-801-445-001';
    }
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [gatewayAutosaveStatus, setGatewayAutosaveStatus] = useState('idle');
  const [gatewaySavedText, setGatewaySavedText] = useState('');
  const gatewayTimerRef = useRef(null);

  // Sync packages from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'travelPackages'), (snap) => {
      if (!snap.empty) {
        const firestorePkgs = snap.docs.map(d => sanitizePackageData({ id: d.id, ...d.data() }));
        setPackagesList(firestorePkgs);
        try {
          localStorage.setItem('mmw_packages_custom', JSON.stringify(firestorePkgs));
        } catch (e) {}
      } else {
        setPackagesList(MOY_TRAVEL_PACKAGES.map(sanitizePackageData));
      }
    }, (err) => {
      console.warn('[MoyTravel] Firestore packages sync notice:', err.message);
    });
    return () => unsub();
  }, []);

  // Sync gateway & contact settings from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'travelSettings', 'gateway'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.wipayId) setWipayId(data.wipayId);
        if (data.whatsappNum) setWhatsappNum(data.whatsappNum);
        if (data.bankAccount) setBankAccount(data.bankAccount);
        try {
          localStorage.setItem('mmw_gateway_draft', JSON.stringify(data));
        } catch (e) {}
      }
    }, (err) => {
      console.warn('[MoySettings] Firestore gateway settings sync notice:', err.message);
    });
    return () => unsub();
  }, []);

  // Site Content & Bio Editor State
  const [siteContentState, setSiteContentState] = useState(() => {
    try {
      const draft = JSON.parse(localStorage.getItem('mmw_site_content_draft') || 'null');
      if (draft && typeof draft === 'object') return { ...DEFAULT_SITE_CONTENT, ...draft };
    } catch (e) {}
    return DEFAULT_SITE_CONTENT;
  });
  const [contentAutosaveStatus, setContentAutosaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'local_only'
  const [contentSavedText, setContentSavedText] = useState('');
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);
  const contentTimerRef = useRef(null);
  const [uploadingContentPhoto, setUploadingContentPhoto] = useState(false);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);

  // Content Revisions History State
  const [revisionsModalOpen, setRevisionsModalOpen] = useState(false);
  const [revisionsList, setRevisionsList] = useState([]);
  const [loadingRevisions, setLoadingRevisions] = useState(false);

  const handleOpenRevisions = async () => {
    setRevisionsModalOpen(true);
    setLoadingRevisions(true);
    try {
      const q = query(
        collection(db, 'travelSiteContent', 'main', 'revisions'),
        orderBy('savedAt', 'desc')
      );
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRevisionsList(list);
    } catch (err) {
      console.warn('Error fetching revisions:', err.message);
      setRevisionsList([]);
    } finally {
      setLoadingRevisions(false);
    }
  };

  const handleRestoreRevision = async (rev) => {
    if (!rev?.content) return;
    if (!window.confirm(`Restore site content from ${new Date(rev.savedAt).toLocaleString()} saved by ${rev.savedBy || 'Admin'}?`)) return;
    try {
      setSiteContentState(rev.content);
      await setDoc(doc(db, 'travelSiteContent', 'main'), rev.content, { merge: true });
      try {
        localStorage.setItem('mmw_site_content_draft', JSON.stringify(rev.content));
      } catch (e) {}
      alert('Site content successfully restored from revision!');
      setRevisionsModalOpen(false);
    } catch (err) {
      alert('Failed to restore revision: ' + err.message);
    }
  };

  // Sync site content from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'travelSiteContent', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setSiteContentState(prev => ({ ...prev, ...data }));
        try {
          localStorage.setItem('mmw_site_content_draft', JSON.stringify(data));
        } catch (e) {}
      }
    }, (err) => {
      console.warn('[MoySettings] Firestore site content sync notice:', err.message);
    });
    return () => unsub();
  }, []);

  const updateSiteContent = (updater) => {
    setSiteContentState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      if (!next || typeof next !== 'object') return prev;

      try {
        localStorage.setItem('mmw_site_content_draft', JSON.stringify(next));
      } catch (e) {}

      setContentAutosaveStatus('saving');
      if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
      contentTimerRef.current = setTimeout(async () => {
        try {
          await setDoc(doc(db, 'travelSiteContent', 'main'), next, { merge: true });
          setContentAutosaveStatus('saved');
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setContentSavedText(`Cloud Autosaved at ${time}`);
        } catch (err) {
          console.warn('[MoyAgentDashboard] Content autosave notice:', err.message);
          setContentAutosaveStatus('local_only');
          setContentSavedText('Saved locally');
        }
      }, 800);

      return next;
    });
  };

  const handleUploadContentPhoto = async (file, field) => {
    if (!file) return;
    if (field === 'avatar') setUploadingContentPhoto(true);
    if (field === 'heroBg') setUploadingHeroBg(true);

    try {
      const isHero = field === 'heroBg';
      const result = await uploadImageResilient(file, {
        folder: 'travel_assets',
        maxWidth: isHero ? 1600 : 1000,
        quality: 0.82
      });
      const url = result?.url;

      if (url) {
        if (field === 'avatar') {
          updateSiteContent(prev => ({
            ...prev,
            aboutMoy: {
              ...prev.aboutMoy,
              photo: url,
              hostPhoto: url
            }
          }));
        } else if (field === 'heroBg') {
          updateSiteContent(prev => ({
            ...prev,
            hero: {
              ...prev.hero,
              backgroundImage: url
            }
          }));
        }
      }
    } catch (err) {
      console.warn('Content photo upload notice; applying local fallback:', err);
      try {
        const reader = new FileReader();
        reader.onload = (re) => {
          const fallbackUrl = re.target?.result;
          if (fallbackUrl) {
            if (field === 'avatar') {
              updateSiteContent(prev => ({
                ...prev,
                aboutMoy: { ...prev.aboutMoy, photo: fallbackUrl, hostPhoto: fallbackUrl }
              }));
            } else if (field === 'heroBg') {
              updateSiteContent(prev => ({
                ...prev,
                hero: { ...prev.hero, backgroundImage: fallbackUrl }
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (e2) {
        console.error('All content photo fallbacks exhausted:', e2);
      }
    } finally {
      if (field === 'avatar') setUploadingContentPhoto(false);
      if (field === 'heroBg') setUploadingHeroBg(false);
    }
  };

  // Authenticate Moy via Passcode
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'moy2027' || passcode === 'carnival2027' || currentUser?.email?.includes('moy') || currentUser?.email?.includes('admin')) {
      setIsAuthenticated(true);
      localStorage.setItem('mmw_agent_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect Travel Agent access passcode.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem('mmw_agent_auth', 'true');
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setAuthError(err.message || 'Google sign-in failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please enter email and password.');
      return;
    }
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const result = await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem('mmw_agent_auth', 'true');
    } catch (err) {
      console.error('Email Sign-In Error:', err);
      setAuthError(err.message || 'Email sign-in failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Accommodation Tiers Management
  const handleAddAccommodationTier = () => {
    if (!editingPkg) return;
    const currentAcc = Array.isArray(editingPkg.accommodations) ? [...editingPkg.accommodations] : [];
    const newTier = {
      type: `Room Option ${currentAcc.length + 1}`,
      price: editingPkg.pricing?.doubleOccupancy ? `$${Number(editingPkg.pricing.doubleOccupancy).toLocaleString()} USD / person` : '$2,500 USD',
      occupancy: 'Shared or Single Occupancy',
      description: 'Comfortable luxury accommodations with ensuite bathroom, air conditioning, and resort amenities.'
    };
    updateEditingPkg({ accommodations: [...currentAcc, newTier] });
  };

  const handleUpdateAccommodationTier = (index, field, value) => {
    if (!editingPkg) return;
    const currentAcc = Array.isArray(editingPkg.accommodations) ? [...editingPkg.accommodations] : [];
    if (!currentAcc[index]) return;
    currentAcc[index] = { ...currentAcc[index], [field]: value };
    updateEditingPkg({ accommodations: currentAcc });
  };

  const handleRemoveAccommodationTier = (index) => {
    if (!editingPkg) return;
    const currentAcc = Array.isArray(editingPkg.accommodations) ? [...editingPkg.accommodations] : [];
    currentAcc.splice(index, 1);
    updateEditingPkg({ accommodations: currentAcc });
  };

  const handleSyncAccommodationPrices = () => {
    if (!editingPkg) return;
    const singlePrice = editingPkg.pricing?.singleOccupancy;
    const doublePrice = editingPkg.pricing?.doubleOccupancy;
    const currentAcc = Array.isArray(editingPkg.accommodations) ? [...editingPkg.accommodations] : [];
    
    const updated = currentAcc.map(acc => {
      const lower = (acc.type || '').toLowerCase();
      if (lower.includes('single') && singlePrice) {
        return { ...acc, price: `$${Number(singlePrice).toLocaleString()} USD` };
      }
      if ((lower.includes('double') || lower.includes('shared')) && doublePrice) {
        return { ...acc, price: `$${Number(doublePrice).toLocaleString()} USD / person` };
      }
      return acc;
    });
    updateEditingPkg({ accommodations: updated });
  };

  const handleInitDefaultAccommodations = () => {
    if (!editingPkg) return;
    const singlePrice = editingPkg.pricing?.singleOccupancy || 3500;
    const doublePrice = editingPkg.pricing?.doubleOccupancy || 2500;
    updateEditingPkg({
      accommodations: [
        {
          type: 'Single Luxury Suite',
          price: editingPkg.customQuoteOnly ? 'Custom Quote on Request' : `$${Number(singlePrice).toLocaleString()} USD`,
          occupancy: 'Single (1 King Bed)',
          description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
        },
        {
          type: 'Shared Double Room',
          price: editingPkg.customQuoteOnly ? 'Custom Quote on Request' : `$${Number(doublePrice).toLocaleString()} USD / person`,
          occupancy: 'Shared (2 Queen Beds or King for Couples)',
          description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
        }
      ]
    });
  };

  // Real-time Firestore sync for incoming bookings (NO mock demo data)
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'travelBookings'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        setBookings(list);
        setLoading(false);
      },
      (err) => {
        console.warn('[MoyAgentDashboard] Firestore bookings listener:', err.message);
        setBookings([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Clean Autosave Updater for Editing Package
  const updateEditingPkg = (updater) => {
    setEditingPkg((prev) => {
      if (!prev) return null;
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      const pkgId = next.id || `custom-pkg-${Date.now()}`;
      const payload = {
        ...next,
        id: pkgId,
        updatedAt: new Date().toISOString()
      };

      // 1. Instant local autosave to browser localStorage
      try {
        localStorage.setItem(`mmw_draft_${pkgId}`, JSON.stringify(payload));
      } catch (e) {}

      // 2. Debounced cloud autosave to live Firestore
      setAutosaveStatus('saving');
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = setTimeout(async () => {
        try {
          await setDoc(doc(db, 'travelPackages', pkgId), payload, { merge: true });

          // Also update dashboard list in state and local cache
          setPackagesList(curr => {
            const exists = curr.find(p => p.id === pkgId);
            const updatedList = exists 
              ? curr.map(p => p.id === pkgId ? payload : p)
              : [payload, ...curr];
            try {
              localStorage.setItem('mmw_packages_custom', JSON.stringify(updatedList));
            } catch (e) {}
            return updatedList;
          });

          setAutosaveStatus('saved');
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setLastSavedText(`Autosaved to cloud at ${time}`);
        } catch (err) {
          console.warn('[Autosave] Firestore auto-sync error:', err.message);
          setAutosaveStatus('local_only');
          setLastSavedText('Autosaved locally in browser');
        }
      }, 800);

      return payload;
    });
  };

  // Open edit modal with draft restoration check
  const handleOpenEdit = (pkg) => {
    let initial = { ...pkg };
    try {
      const savedDraft = localStorage.getItem(`mmw_draft_${pkg.id}`);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && parsed.updatedAt && (!pkg.updatedAt || new Date(parsed.updatedAt) > new Date(pkg.updatedAt))) {
          initial = parsed;
          setRestoredFromDraft(true);
          setTimeout(() => setRestoredFromDraft(false), 6000);
        }
      }
    } catch (e) {}

    // Ensure accommodations array exists
    if (!Array.isArray(initial.accommodations) || initial.accommodations.length === 0) {
      const singlePrice = initial.pricing?.singleOccupancy || 3500;
      const doublePrice = initial.pricing?.doubleOccupancy || 2500;
      initial.accommodations = [
        {
          type: 'Single Luxury Suite',
          price: initial.customQuoteOnly ? 'Custom Quote on Request' : `$${Number(singlePrice).toLocaleString()} USD`,
          occupancy: 'Single (1 King Bed)',
          description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
        },
        {
          type: 'Shared Double Room',
          price: initial.customQuoteOnly ? 'Custom Quote on Request' : `$${Number(doublePrice).toLocaleString()} USD / person`,
          occupancy: 'Shared (2 Queen Beds or King for Couples)',
          description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
        }
      ];
    }

    if (!initial.whenWhere) {
      initial.whenWhere = {
        hotel: 'Hotels / Luxury Resorts',
        dates: initial.dates || 'Summer 2027',
        location: initial.location || initial.country || 'Caribbean',
        securityNote: '24/7 On-Ground Host & Concierge'
      };
    }

    if (!initial.pricing) {
      initial.pricing = {
        deposit: 500,
        doubleOccupancy: 2500,
        singleOccupancy: 3500,
        currency: 'USD',
        paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
      };
    }

    if (!Array.isArray(initial.included)) {
      initial.included = initial.included ? (typeof initial.included === 'string' ? initial.included.split('\n') : [initial.included]) : [];
    }
    if (!Array.isArray(initial.notIncluded)) {
      initial.notIncluded = initial.notIncluded ? (typeof initial.notIncluded === 'string' ? initial.notIncluded.split('\n') : [initial.notIncluded]) : [];
    }

    setEditingPkg(initial);
    setAutosaveStatus('saved');
    setLastSavedText('Synced with live database');
  };

  // Dedicated Save & Publish Handler for In-Page Package Editor
  const handleSavePackage = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingPkg) return;
    setIsSavingPkg(true);

    const pkgId = editingPkg.id || `custom-pkg-${Date.now()}`;
    const payload = {
      ...editingPkg,
      id: pkgId,
      updatedAt: new Date().toISOString()
    };

    try {
      // 1. Direct immediate save to live Firestore
      await setDoc(doc(db, 'travelPackages', pkgId), payload, { merge: true });

      // 2. Save snapshot to revision history
      try {
        const revId = 'rev_' + Date.now();
        await setDoc(doc(db, 'travelPackages', pkgId, 'revisions', revId), {
          ...payload,
          savedBy: currentUser?.email || 'Admin',
          savedAt: new Date().toISOString()
        });
      } catch (revErr) {
        console.warn('Package revision notice:', revErr.message);
      }

      // 3. Update state & localStorage
      setPackagesList(prev => {
        const exists = prev.find(p => p.id === pkgId);
        const updated = exists 
          ? prev.map(p => p.id === pkgId ? payload : p)
          : [payload, ...prev];
        try {
          localStorage.setItem('mmw_packages_custom', JSON.stringify(updated));
        } catch (err) {}
        return updated;
      });

      setAutosaveStatus('saved');
      setLastSavedText('Saved to live database');
      setEditingPkg(null);
      alert(`Trip package "${payload.title}" saved successfully to live database!`);
    } catch (err) {
      console.error('Error saving trip to Firestore:', err);
      setPackagesList(prev => {
        const exists = prev.find(p => p.id === pkgId);
        const updated = exists 
          ? prev.map(p => p.id === pkgId ? payload : p)
          : [payload, ...prev];
        try {
          localStorage.setItem('mmw_packages_custom', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      
      let noticeMsg = err.message;
      if (err.code === 'permission-denied') {
        noticeMsg = 'Permission denied by database security rules. Please click "Sign In for Cloud Sync" at the top with an authorized admin account to save directly to the live site.';
      }
      alert(`Saved to local browser storage.\n\nNotice: ${noticeMsg}`);
      setEditingPkg(null);
    } finally {
      setIsSavingPkg(false);
    }
  };

  // Resilient Photo Upload (Cloud Storage + Web-Safe Optimized Compression)
  const handleUploadPhoto = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const isHero = field === 'heroImage';
      const result = await uploadImageResilient(file, {
        folder: 'travel_assets',
        maxWidth: isHero ? 1600 : 1200,
        quality: 0.82
      });
      if (result?.url) {
        updateEditingPkg({ [field]: result.url });
        setUploadSuccessField(field);
        setTimeout(() => setUploadSuccessField(null), 3000);
      }
    } catch (err) {
      console.warn('Photo upload cloud notice; applying local fallback:', err);
      try {
        const reader = new FileReader();
        reader.onload = (re) => {
          if (re.target?.result) {
            updateEditingPkg({ [field]: re.target.result });
            setUploadSuccessField(field);
            setTimeout(() => setUploadSuccessField(null), 3000);
          }
        };
        reader.readAsDataURL(file);
      } catch (fallbackErr) {
        console.error('All photo upload options failed:', fallbackErr);
      }
    } finally {
      setUploadingField(null);
      if (e.target) e.target.value = '';
    }
  };

  // Autosave Gateway Settings
  const updateGatewaySetting = (field, val) => {
    let nextWipay = wipayId;
    let nextWhatsapp = whatsappNum;
    let nextBank = bankAccount;

    if (field === 'wipay') {
      setWipayId(val);
      nextWipay = val;
    } else if (field === 'whatsapp') {
      setWhatsappNum(val);
      nextWhatsapp = val;
    } else if (field === 'bank') {
      setBankAccount(val);
      nextBank = val;
    }

    try {
      localStorage.setItem('mmw_gateway_draft', JSON.stringify({
        wipayId: nextWipay,
        whatsappNum: nextWhatsapp,
        bankAccount: nextBank,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {}

    setGatewayAutosaveStatus('saving');
    if (gatewayTimerRef.current) clearTimeout(gatewayTimerRef.current);
    gatewayTimerRef.current = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'travelSettings', 'gateway'), {
          wipayId: nextWipay,
          whatsappNum: nextWhatsapp,
          bankAccount: nextBank,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setGatewayAutosaveStatus('saved');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setGatewaySavedText(`Autosaved at ${time}`);
      } catch (err) {
        console.warn('[MoySettings] Gateway autosave error:', err.message);
        setGatewayAutosaveStatus('local_only');
        setGatewaySavedText('Saved locally');
      }
    }, 800);
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, 'travelBookings', bookingId), {
        status: newStatus
      });
    } catch (err) {
      console.warn('Update status notice:', err.message);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return alert('No bookings to export.');
    const headers = ['Ref', 'Name', 'Email', 'Phone', 'Package', 'Room', 'Guests', 'Band Section', 'Deposit USD', 'Method', 'Status'];
    const rows = bookings.map(b => [
      b.bookingRef,
      `"${b.customerName}"`,
      b.customerEmail,
      b.customerPhone,
      `"${b.packageTitle}"`,
      `"${b.roomType}"`,
      b.guestCount,
      `"${b.masqueradeSection || 'N/A'}"`,
      b.depositAmount,
      b.paymentMethod,
      b.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moy_travel_bookings_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bookingRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.packageTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenueDeposits = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, curr) => acc + (curr.depositAmount || 0), 0);

  // ── AUTH GATE FOR MOY ──
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
        <div className="w-full max-w-md bg-[#080c14] border border-cyan-500/30 rounded-3xl p-8 text-center text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-[#00e5cc] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,229,204,0.3)]">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight font-heading">
            Moy Meets World
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Travel Agent Management Portal (Trinidad Operations)
          </p>

          {/* Auth Method Selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-white/10 mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('passcode'); setAuthError(''); }}
              className={`py-2 rounded-xl transition-all ${authMode === 'passcode' ? 'bg-[#00e5cc] text-black shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Passcode
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('google'); setAuthError(''); }}
              className={`py-2 rounded-xl transition-all ${authMode === 'google' ? 'bg-[#00e5cc] text-black shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('email'); setAuthError(''); }}
              className={`py-2 rounded-xl transition-all ${authMode === 'email' ? 'bg-[#00e5cc] text-black shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Email
            </button>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {authMode === 'passcode' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Agent Access Passcode (e.g. moy2027)"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/20 text-white text-sm text-center tracking-widest focus:border-[#00e5cc] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all"
              >
                Access Dashboard
              </button>
            </form>
          )}

          {authMode === 'google' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign in with your verified Google account (Moy or Platform Admin) to enable instant, direct live database syncing.
              </p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoggingIn}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-800" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
            </div>
          )}

          {authMode === 'email' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Admin Email (e.g. info@moymeetsworld.com)"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
              />
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Account Password"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggingIn && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isLoggingIn ? 'Verifying...' : 'Sign In with Email'}</span>
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white font-medium block mx-auto mt-6"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080c14] text-slate-100 flex flex-col animate-fadeIn">
      
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-30 bg-[#080c14]/90 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,204,0.3)] shrink-0">
              <img 
                src="/images/moymeetsworld_logo.jpg" 
                alt="Moy Meets World" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-base font-black text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <span>MOY MEETS WORLD</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                  🇹🇹 Trinidad Operations
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Chief Travel Curator & Booking Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Cloud Sync Status Badge */}
            {currentUser?.email ? (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Synced: {currentUser.email}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-[11px] font-bold text-amber-300 transition-colors"
                title="Sign in with your Google or Admin account to enable instant live cloud syncing"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isLoggingIn ? 'Connecting...' : 'Sign In for Cloud Sync'}</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,204,0.3)]"
            >
              Exit Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ── DASHBOARD BODY ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Inquiries</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-heading">
              {bookings.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across all active destinations</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Confirmed Deposits</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-heading">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Spots locked with $500 deposit</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400 font-heading">
              {bookings.filter(b => b.status === 'pending_payment').length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting wire / WiPay payment</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase mb-2">
              <span>Total Deposits (USD)</span>
              <DollarSign className="w-4 h-4 text-[#00e5cc]" />
            </div>
            <div className="text-3xl font-black text-[#00e5cc] font-heading">
              ${totalRevenueDeposits.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct Trinidad payout pool</p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 flex-wrap">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Guest Bookings ({bookings.length})
          </button>
          
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'packages'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Manage Packages ({packagesList.length})
          </button>

          <button
            onClick={() => setActiveTab('siteContent')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'siteContent'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Site Content, Bio & FAQs
          </button>

          <button
            onClick={() => setActiveTab('gateway')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'gateway'
                ? 'bg-[#00e5cc] text-black shadow-[0_0_15px_rgba(0,229,204,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900/60'
            }`}
          >
            Trinidad Gateway & Bank Settings
          </button>
        </div>

        {/* ── TAB 1: GUEST BOOKINGS ── */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ref, email or destination..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00e5cc] focus:outline-none"
              />
            </div>

            {/* Bookings Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-black tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Ref #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Room & Guests</th>
                      <th className="p-4">Band Section</th>
                      <th className="p-4">Deposit</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200 font-medium">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No bookings found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-cyan-950/20 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#00e5cc]">
                            {b.bookingRef}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-[11px] text-slate-400">{b.customerEmail}</div>
                            <div className="text-[10px] text-cyan-300 font-mono">{b.customerPhone}</div>
                          </td>
                          <td className="p-4 font-semibold text-white">
                            {b.packageTitle}
                          </td>
                          <td className="p-4">
                            <div>{b.roomType}</div>
                            <div className="text-[10px] text-slate-400">{b.guestCount} Guest(s)</div>
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {b.masqueradeSection || '—'}
                          </td>
                          <td className="p-4 font-bold text-emerald-400">
                            ${b.depositAmount} USD
                          </td>
                          <td className="p-4 uppercase text-[10px] font-bold text-cyan-200">
                            {b.paymentMethod}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.customerName)},%20Moy%20here%20from%20Moy%20Meets%20World%20regarding%20your%20${encodeURIComponent(b.packageTitle)}%20booking%20(${b.bookingRef})!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              <button
                                onClick={() => handleUpdateStatus(b.id, b.status === 'confirmed' ? 'pending_payment' : 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-white border border-white/20 transition-all"
                              >
                                {b.status === 'confirmed' ? 'Mark Pending' : 'Mark Paid'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 2: MANAGE PACKAGES (CATALOG & DEDICATED IN-PAGE EDITOR) ── */}
        {activeTab === 'packages' && (
          editingPkg ? (
            /* DEDICATED IN-PAGE PACKAGE EDITOR (NO OVERLAY / NO BLANK SCREEN) */
            <DashboardErrorBoundary fallbackTitle="Trip Package Editor" onReset={() => setEditingPkg(null)}>
              <div className="space-y-6 animate-fadeIn pb-16">
                
                {/* Header & Breadcrumb Bar */}
                <div className="glass-panel p-5 sm:p-6 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/20 text-slate-300 hover:text-white hover:border-[#00e5cc] transition-all flex items-center gap-2 text-xs font-bold shrink-0 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#00e5cc]" />
                      <span>Back to Packages</span>
                    </button>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/30">
                          {editingPkg.country || 'Destination'}
                        </span>
                        
                        {/* Autosave Status Indicator Badge */}
                        {autosaveStatus === 'saving' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 animate-pulse">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Autosaving changes...</span>
                          </div>
                        )}
                        {autosaveStatus === 'saved' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{lastSavedText || 'Autosaved to cloud'}</span>
                          </div>
                        )}
                        {autosaveStatus === 'local_only' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-[10px] font-bold text-amber-300">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{lastSavedText || 'Autosaved locally in browser'}</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                        {editingPkg.id?.startsWith('custom-pkg-') && (!editingPkg.title || editingPkg.title === 'New Trip Experience')
                          ? '✨ Create New Travel Package'
                          : `Edit Package: ${editingPkg.title || 'Untitled Trip'}`}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white text-xs font-bold transition-all"
                    >
                      Cancel & Return
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePackage}
                      disabled={isSavingPkg}
                      className="px-6 py-2.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSavingPkg && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>{isSavingPkg ? 'Saving...' : 'Save & Publish'}</span>
                    </button>
                  </div>
                </div>

                {restoredFromDraft && (
                  <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-200 text-xs font-medium flex items-center justify-between">
                    <span>💡 Restored your latest auto-saved draft from this device.</span>
                    <button type="button" onClick={() => setRestoredFromDraft(false)} className="text-cyan-400 hover:text-white font-bold">✕</button>
                  </div>
                )}

                {/* Form Body */}
                <form onSubmit={handleSavePackage} className="space-y-6">
                  
                  {/* Card 1: Core Trip Details */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00e5cc]" />
                      <span>1. Core Package Identity & Timing</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Package Title <span className="text-rose-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={editingPkg.title || ''}
                          onChange={(e) => updateEditingPkg({ title: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St Lucia Carnival 2027"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Country / Island</label>
                        <input
                          type="text"
                          value={editingPkg.country || ''}
                          onChange={(e) => updateEditingPkg({ country: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St. Lucia, Caribbean"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Subtitle / Headline</label>
                        <input
                          type="text"
                          value={editingPkg.subtitle || ''}
                          onChange={(e) => updateEditingPkg({ subtitle: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. The Sweetest Summer Festival"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Experience Badge</label>
                        <input
                          type="text"
                          value={editingPkg.badge || ''}
                          onChange={(e) => updateEditingPkg({ badge: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. Flagship Experience, New Experience, Limited Spots"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Dates Display <span className="text-rose-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={editingPkg.dates || ''}
                          onChange={(e) => updateEditingPkg({ dates: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. July 16th - July 23rd, 2027"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Duration</label>
                        <input
                          type="text"
                          value={editingPkg.duration || ''}
                          onChange={(e) => updateEditingPkg({ duration: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. 7 Days, 10 Days"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Package Status</label>
                        <select
                          value={editingPkg.status || 'Booking Open'}
                          onChange={(e) => updateEditingPkg({ status: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        >
                          <option value="Booking Open">Booking Open</option>
                          <option value="Limited Spots">Limited Spots</option>
                          <option value="Waitlist Open">Waitlist Open</option>
                          <option value="Sold Out">Sold Out</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Spots Remaining</label>
                        <input
                          type="number"
                          value={editingPkg.spotsRemaining ?? 10}
                          onChange={(e) => updateEditingPkg({ spotsRemaining: Number(e.target.value) })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Total Capacity</label>
                        <input
                          type="number"
                          value={editingPkg.spotsTotal ?? 10}
                          onChange={(e) => updateEditingPkg({ spotsTotal: Number(e.target.value) })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Location, Hotel & On-Ground Concierge */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#00e5cc]" />
                      <span>2. Concierge, Location & Hotel</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Location Label</label>
                        <input
                          type="text"
                          value={editingPkg.location || ''}
                          onChange={(e) => updateEditingPkg({ 
                            location: e.target.value,
                            whenWhere: { ...(editingPkg.whenWhere || {}), location: e.target.value }
                          })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St. Lucia, Caribbean"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Hotel / Resort Type</label>
                        <input
                          type="text"
                          value={editingPkg.whenWhere?.hotel || ''}
                          onChange={(e) => updateEditingPkg({ 
                            whenWhere: { ...(editingPkg.whenWhere || {}), hotel: e.target.value }
                          })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. Luxury Beachfront Resort / Private Villas"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Concierge & Ground Safety Note</label>
                      <input
                        type="text"
                        value={editingPkg.whenWhere?.securityNote || ''}
                        onChange={(e) => updateEditingPkg({ 
                          whenWhere: { ...(editingPkg.whenWhere || {}), securityNote: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        placeholder="e.g. 24/7 On-Ground Host & Concierge"
                      />
                    </div>
                  </div>

                  {/* Card 3: Story & Copywriting */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00e5cc]" />
                      <span>3. Story & Copywriting</span>
                    </h4>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Tagline Summary (Card Teaser)</label>
                      <textarea
                        rows={2}
                        value={editingPkg.tagline || ''}
                        onChange={(e) => updateEditingPkg({ tagline: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        placeholder="Short punchy summary displayed on package cards..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Full Trip Overview / Story</label>
                      <textarea
                        rows={4}
                        value={editingPkg.overview || ''}
                        onChange={(e) => updateEditingPkg({ overview: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                        placeholder="Detailed itinerary overview and description of the cultural experience..."
                      />
                    </div>
                  </div>

                  {/* Card 4: Pricing & Deposit */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#00e5cc]" />
                      <span>4. Pricing & Deposit Configuration</span>
                    </h4>

                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-xs block">Custom Quote Mode ("Price on Request")</span>
                        <span className="text-[11px] text-slate-400">
                          When enabled, displays "Price on Request" instead of fixed pricing numbers.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={editingPkg.customQuoteOnly || false}
                        onChange={(e) => updateEditingPkg({ customQuoteOnly: e.target.checked })}
                        className="w-5 h-5 accent-[#00e5cc] rounded cursor-pointer"
                      />
                    </div>

                    {!editingPkg.customQuoteOnly && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Double Occupancy ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.doubleOccupancy || ''}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, doubleOccupancy: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Single Suite ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.singleOccupancy || ''}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, singleOccupancy: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Hold Deposit ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.deposit || 500}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, deposit: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-300 text-xs mb-1">Payment Schedule & Terms Note</label>
                          <input
                            type="text"
                            value={editingPkg.pricing?.paymentSchedule || ''}
                            onChange={(e) => updateEditingPkg({
                              pricing: { ...editingPkg.pricing, paymentSchedule: e.target.value }
                            })}
                            placeholder="e.g. Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection."
                            className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 5: Room Tiers & Luxury Accommodations */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#00e5cc]" />
                          <span>5. Room Tiers & Luxury Accommodations</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Configure the accommodation options guests select during booking and on the detail view.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={handleSyncAccommodationPrices}
                          className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          title="Update Single and Double room price labels to match your pricing numbers above"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Sync Prices</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddAccommodationTier}
                          className="px-3 py-1.5 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Tier</span>
                        </button>
                      </div>
                    </div>

                    {(!editingPkg.accommodations || editingPkg.accommodations.length === 0) ? (
                      <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-3">
                        <p className="text-xs text-slate-400">No custom accommodation tiers defined yet for this trip.</p>
                        <button
                          type="button"
                          onClick={handleInitDefaultAccommodations}
                          className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition-colors"
                        >
                          + Generate Standard Room Tiers (Single Suite & Double Room)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {editingPkg.accommodations.map((acc, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                                Tier #{idx + 1}: {acc.type || 'Untitled Option'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveAccommodationTier(idx)}
                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 transition-colors"
                                title="Remove this room tier"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Room Type Title</label>
                                <input
                                  type="text"
                                  value={acc.type || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'type', e.target.value)}
                                  placeholder="e.g. Single Luxury Suite"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Price Label</label>
                                <input
                                  type="text"
                                  value={acc.price || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'price', e.target.value)}
                                  placeholder="e.g. $3,500 USD or Custom Quote on Request"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Bed / Occupancy Detail</label>
                                <input
                                  type="text"
                                  value={acc.occupancy || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'occupancy', e.target.value)}
                                  placeholder="e.g. Single (1 King Bed) or Double Occupancy (2 Guests)"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Room Amenities & Description</label>
                                <textarea
                                  rows={2}
                                  value={acc.description || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'description', e.target.value)}
                                  placeholder="Private oceanfront suite with ensuite bathroom, balcony, high-speed WiFi..."
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card 6: Inclusions & Exclusions */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                      <span>6. Inclusions & Exclusions</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">What's Included (1 item per line)</label>
                        <textarea
                          rows={6}
                          value={Array.isArray(editingPkg.included) ? editingPkg.included.join('\n') : (editingPkg.included || '')}
                          onChange={(e) => updateEditingPkg({ included: e.target.value.split('\n') })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                          placeholder="e.g.&#10;Round Trip Flights from Trinidad&#10;Accommodations (Breakfast Inclusive)&#10;Carnival Costume Package&#10;Ground Transportation"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">What's Not Included (1 item per line)</label>
                        <textarea
                          rows={6}
                          value={Array.isArray(editingPkg.notIncluded) ? editingPkg.notIncluded.join('\n') : (editingPkg.notIncluded || '')}
                          onChange={(e) => updateEditingPkg({ notIncluded: e.target.value.split('\n') })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                          placeholder="e.g.&#10;Personal spending & tips&#10;Meals outside of breakfast&#10;Optional private catamaran tour"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 7: Media & Imagery */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00e5cc]" />
                      <span>7. Package Imagery & Banners</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Hero Image */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-300 text-xs">Hero Image (Banner & Detail View)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingPkg.heroImage || ''}
                            onChange={(e) => updateEditingPkg({ heroImage: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                            placeholder="Image URL or upload from device..."
                          />
                          <label className={`cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm ${
                            uploadSuccessField === 'heroImage' 
                              ? 'bg-emerald-950 border border-emerald-400 text-emerald-300' 
                              : 'bg-cyan-950 border border-cyan-400/40 hover:bg-cyan-900 text-cyan-300'
                          }`}>
                            {uploadingField === 'heroImage' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : uploadSuccessField === 'heroImage' ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>
                              {uploadingField === 'heroImage' 
                                ? 'Uploading...' 
                                : uploadSuccessField === 'heroImage' 
                                  ? '✓ Updated' 
                                  : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={Boolean(uploadingField)}
                              onChange={(e) => handleUploadPhoto(e, 'heroImage')}
                            />
                          </label>
                        </div>
                        {editingPkg.heroImage && (
                          <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                            <img 
                              src={resolveTravelImageUrl(editingPkg.heroImage, { country: editingPkg.country, title: editingPkg.title, isHero: true })} 
                              alt="Hero Preview" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: editingPkg.country, title: editingPkg.title, isHero: true });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                            <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-1 rounded-lg text-slate-300 font-bold border border-white/10">
                              Hero Banner Preview
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Thumbnail */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-300 text-xs">Card Image (Catalog Grid Thumbnail)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingPkg.cardImage || ''}
                            onChange={(e) => updateEditingPkg({ cardImage: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                            placeholder="Image URL or upload from device..."
                          />
                          <label className={`cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm ${
                            uploadSuccessField === 'cardImage' 
                              ? 'bg-emerald-950 border border-emerald-400 text-emerald-300' 
                              : 'bg-cyan-950 border border-cyan-400/40 hover:bg-cyan-900 text-cyan-300'
                          }`}>
                            {uploadingField === 'cardImage' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : uploadSuccessField === 'cardImage' ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>
                              {uploadingField === 'cardImage' 
                                ? 'Uploading...' 
                                : uploadSuccessField === 'cardImage' 
                                  ? '✓ Updated' 
                                  : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={Boolean(uploadingField)}
                              onChange={(e) => handleUploadPhoto(e, 'cardImage')}
                            />
                          </label>
                        </div>
                        {editingPkg.cardImage && (
                          <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                            <img 
                              src={resolveTravelImageUrl(editingPkg.cardImage, { country: editingPkg.country, title: editingPkg.title, isHero: false })} 
                              alt="Card Preview" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: editingPkg.country, title: editingPkg.title, isHero: false });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                            <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-1 rounded-lg text-slate-300 font-bold border border-white/10">
                              Card Thumbnail Preview
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="glass-panel p-5 sm:p-6 rounded-3xl border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {editingPkg.id && !editingPkg.id.startsWith('custom-pkg-') ? (
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to permanently delete "${editingPkg.title}"? This cannot be undone.`)) {
                            try {
                              await deleteDoc(doc(db, 'travelPackages', editingPkg.id));
                            } catch (err) {
                              console.warn('Firestore delete notice:', err.message);
                            }
                            const updated = packagesList.filter(p => p.id !== editingPkg.id);
                            setPackagesList(updated);
                            try {
                              localStorage.setItem('mmw_packages_custom', JSON.stringify(updated));
                              localStorage.removeItem(`mmw_draft_${editingPkg.id}`);
                            } catch (e) {}
                            setEditingPkg(null);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Package</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingPkg(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 text-xs font-bold hover:text-white"
                      >
                        Discard New Package
                      </button>
                    )}

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingPkg(null)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-slate-300 hover:text-white text-xs font-bold"
                      >
                        Cancel & Return
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingPkg}
                        className="px-8 py-2.5 rounded-xl bg-[#00e5cc] text-black font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,204,0.4)] hover:bg-[#24f6df] transition-all disabled:opacity-50 flex items-center gap-2 text-xs"
                      >
                        {isSavingPkg && <RefreshCw className="w-4 h-4 animate-spin" />}
                        <span>{isSavingPkg ? 'Saving...' : 'Save & Publish Package'}</span>
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </DashboardErrorBoundary>
          ) : (
            /* ACTIVE PACKAGES CATALOG GRID VIEW */
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-white font-heading">Active Destinations & Packages</h3>
                  <p className="text-xs text-slate-400">Edit prices, dates, spots remaining, room tiers, or add new bespoke experiences.</p>
                </div>
                <button
                  onClick={() => {
                    const newPkg = {
                      id: `custom-pkg-${Date.now()}`,
                      title: 'New Trip Experience',
                      subtitle: 'Curated Cultural Escape',
                      badge: 'New Experience',
                      country: 'St. Lucia',
                      dates: 'Summer 2027',
                      duration: '7 Days',
                      location: 'St. Lucia, Caribbean',
                      spotsTotal: 10,
                      spotsRemaining: 10,
                      status: 'Booking Open',
                      customQuoteOnly: false,
                      pricing: {
                        deposit: 500,
                        doubleOccupancy: 2500,
                        singleOccupancy: 3500,
                        currency: 'USD',
                        paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
                      },
                      whenWhere: {
                        dates: 'Summer 2027',
                        location: 'St. Lucia, Caribbean',
                        hotel: 'Hotels / Luxury Resorts',
                        securityNote: '24/7 On-Ground Host & Concierge'
                      },
                      accommodations: [
                        {
                          type: 'Single Luxury Suite',
                          price: '$3,500 USD',
                          occupancy: 'Single (1 King Bed)',
                          description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
                        },
                        {
                          type: 'Shared Double Room',
                          price: '$2,500 USD / person',
                          occupancy: 'Shared (2 Queen Beds or King for Couples)',
                          description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
                        }
                      ],
                      tagline: 'Custom curated carnival journey.',
                      overview: 'Experience this stunning cultural celebration with full concierge guidance and unforgettable vibes.',
                      cardImage: '/images/travel/stlucia_card.jpeg',
                      heroImage: '/images/travel/stlucia_hero.jpeg',
                      included: [
                        'Round Trip Flights from Trinidad',
                        'Accommodations (Breakfast Inclusive)',
                        'Carnival Costume Package',
                        'Ground Transportation',
                        'Signature Events Access',
                        'Carnival Survival Kit'
                      ],
                      notIncluded: [
                        'Discretionary personal spending, tips & optional private excursions',
                        'Meals outside of breakfast or all-inclusive events'
                      ],
                      accentColor: '#00e5cc'
                    };
                    handleOpenEdit(newPkg);
                  }}
                  className="px-5 py-2.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,204,0.3)] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Package</span>
                </button>
              </div>

              {packagesList.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border-dashed border-cyan-500/30 space-y-4">
                  <Globe className="w-12 h-12 text-cyan-400 mx-auto opacity-50" />
                  <h4 className="text-base font-bold text-white">No Travel Packages Found</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Start creating your first curated travel package to showcase destinations, accommodations, and pricing.
                  </p>
                  <button
                    onClick={() => {
                      const newPkg = {
                        id: `custom-pkg-${Date.now()}`,
                        title: 'New Trip Experience',
                        subtitle: 'Curated Cultural Escape',
                        badge: 'New Experience',
                        country: 'St. Lucia',
                        dates: 'Summer 2027',
                        duration: '7 Days',
                        location: 'St. Lucia, Caribbean',
                        spotsTotal: 10,
                        spotsRemaining: 10,
                        status: 'Booking Open',
                        customQuoteOnly: false,
                        pricing: {
                          deposit: 500,
                          doubleOccupancy: 2500,
                          singleOccupancy: 3500,
                          currency: 'USD',
                          paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
                        },
                        whenWhere: {
                          dates: 'Summer 2027',
                          location: 'St. Lucia, Caribbean',
                          hotel: 'Hotels / Luxury Resorts',
                          securityNote: '24/7 On-Ground Host & Concierge'
                        },
                        accommodations: [
                          {
                            type: 'Single Luxury Suite',
                            price: '$3,500 USD',
                            occupancy: 'Single (1 King Bed)',
                            description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
                          },
                          {
                            type: 'Shared Double Room',
                            price: '$2,500 USD / person',
                            occupancy: 'Shared (2 Queen Beds or King for Couples)',
                            description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
                          }
                        ],
                        tagline: 'Custom curated carnival journey.',
                        overview: 'Experience this stunning cultural celebration with full concierge guidance and unforgettable vibes.',
                        cardImage: '/images/travel/stlucia_card.jpeg',
                        heroImage: '/images/travel/stlucia_hero.jpeg',
                        included: [
                          'Round Trip Flights from Trinidad',
                          'Accommodations (Breakfast Inclusive)',
                          'Carnival Costume Package',
                          'Ground Transportation',
                          'Signature Events Access',
                          'Carnival Survival Kit'
                        ],
                        notIncluded: [
                          'Discretionary personal spending, tips & optional private excursions',
                          'Meals outside of breakfast or all-inclusive events'
                        ],
                        accentColor: '#00e5cc'
                      };
                      handleOpenEdit(newPkg);
                    }}
                    className="px-5 py-2.5 bg-[#00e5cc] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
                  >
                    + Create First Package
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packagesList.map((pkg) => (
                    <div key={pkg.id} className="glass-panel p-6 rounded-3xl border-cyan-500/20 flex flex-col justify-between hover:border-cyan-500/40 transition-all group">
                      <div>
                        {pkg.cardImage && (
                          <div className="h-44 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-black/40">
                            <img 
                              src={resolveTravelImageUrl(pkg.cardImage, { country: pkg.country, title: pkg.title, isHero: false })} 
                              alt={pkg.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: pkg.country, title: pkg.title, isHero: false });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-400/30">
                            {pkg.country || 'Destination'}
                          </span>
                          <span className={`text-xs font-bold ${pkg.spotsRemaining > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {pkg.spotsRemaining} / {pkg.spotsTotal || 10} spots left
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-white font-heading mb-1">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-cyan-300 font-semibold mb-3">
                          {pkg.dates} {pkg.duration ? `• ${pkg.duration}` : ''}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4 line-clamp-3">
                          {pkg.tagline || pkg.overview}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Pricing:</span>
                          <span className="font-bold text-white">
                            {pkg.customQuoteOnly ? 'Custom Quote' : (pkg.pricing?.doubleOccupancy ? `$${Number(pkg.pricing.doubleOccupancy).toLocaleString()} USD` : 'Contact Moy')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shadow-sm"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {/* ── TAB 3: SITE CONTENT, BIO & FAQS WITH AUTOSAVE ── */}
        {activeTab === 'siteContent' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Header & Status */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white font-heading uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00e5cc]" />
                  <span>Site Content & Bio Management</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Edit Moy's bio, manage FAQs, configure the philosophy manifesto, and upload photos. All changes autosave to the live site.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {contentAutosaveStatus === 'saving' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-lg">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Autosaving to cloud...</span>
                  </div>
                )}
                {contentAutosaveStatus === 'saved' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{contentSavedText || 'Cloud Autosaved'}</span>
                  </div>
                )}
                {contentAutosaveStatus === 'local_only' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold">
                    <span>Draft saved locally</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleOpenRevisions}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Version History</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await setDoc(doc(db, 'travelSiteContent', 'main'), siteContentState, { merge: true });

                      // Save version snapshot
                      try {
                        const revId = 'rev_' + Date.now();
                        await setDoc(doc(db, 'travelSiteContent', 'main', 'revisions', revId), {
                          savedAt: new Date().toISOString(),
                          savedBy: currentUser?.email || 'Admin',
                          content: siteContentState
                        });
                      } catch (revErr) {
                        console.warn('Revision snapshot notice:', revErr.message);
                      }

                      setContentAutosaveStatus('saved');
                      setContentSaveSuccess(true);
                      setTimeout(() => setContentSaveSuccess(false), 4000);
                      alert('Site content, Bio, and FAQs published live to website successfully!');
                    } catch (err) {
                      console.error('Error saving site content:', err);
                      alert('Error saving site content: ' + err.message);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,204,0.3)]"
                >
                  Publish to Live Site
                </button>
              </div>
            </div>

            {/* Revisions History Modal */}
            {revisionsModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
                <div className="relative w-full max-w-xl bg-[#080c14] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-slate-100 max-h-[85vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-lg font-black text-white font-heading flex items-center gap-2">
                      <History className="w-5 h-5 text-[#00e5cc]" />
                      <span>Site Content Version History</span>
                    </h3>
                    <button onClick={() => setRevisionsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center">✕</button>
                  </div>

                  {loadingRevisions ? (
                    <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#00e5cc]" />
                      <span>Loading historical snapshots...</span>
                    </div>
                  ) : revisionsList.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                      No revision snapshots recorded yet. Snapshots are created automatically when site content is published.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {revisionsList.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold text-white">
                              {new Date(rev.savedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Saved by: <span className="text-cyan-300 font-medium">{rev.savedBy || 'Admin'}</span>
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">
                              FAQs: {rev.content?.faqs?.length || 0} • Title: "{rev.content?.hero?.titleLine1 || 'Default'}"
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRestoreRevision(rev)}
                            className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shrink-0"
                          >
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {contentSaveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Site content, bio, and FAQs successfully published live to all visitors!</span>
              </div>
            )}

            {/* SECTION 1: ABOUT MOY & PROFILE */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#00e5cc]" />
                  <span>Meet Moy & Host Profile</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update Moy's title, verified credentials, direct contact links, and personal bio story.
                </p>
              </div>

              {/* Portrait Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Moy's Portrait Photo (Meet Moy & Host Badge)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-black shrink-0 shadow-lg">
                    <img
                      src={resolveTravelImageUrl(
                        siteContentState.aboutMoy?.photo || siteContentState.aboutMoy?.hostPhoto || MOY_AGENT_PROFILE.avatar,
                        { type: 'avatar' }
                      )}
                      alt="Moy Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const fallback = getTravelImageFallback({ type: 'avatar' });
                        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold transition-all flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingContentPhoto ? 'Uploading Photo...' : 'Upload New Portrait'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingContentPhoto}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadContentPhoto(file, 'avatar');
                            if (e.target) e.target.value = '';
                          }}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">Optimized instant web-safe upload</span>
                    </div>
                    <input
                      type="text"
                      value={siteContentState.aboutMoy?.photo || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateSiteContent(prev => ({
                          ...prev,
                          aboutMoy: { ...prev.aboutMoy, photo: val, hostPhoto: val }
                        }));
                      }}
                      placeholder="Or paste image URL directly..."
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.fullName || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, fullName: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.title || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, title: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.location || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, location: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Verified Badge Text</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.verifiedBadge || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, verifiedBadge: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Concierge Number</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.whatsappNumber || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, whatsappNumber: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={siteContentState.aboutMoy?.email || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, email: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Moy's Personal Bio Story (Multi-Paragraph with Emojis)
                </label>
                <textarea
                  rows={8}
                  value={siteContentState.aboutMoy?.bio || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      aboutMoy: { ...prev.aboutMoy, bio: val }
                    }));
                  }}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none font-sans"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Line breaks and paragraphs will be preserved and rendered cleanly on the live "Meet Moy" section.
                </p>
              </div>
            </div>

            {/* SECTION 2: FREQUENTLY ASKED QUESTIONS (FAQS) */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#00e5cc]" />
                    <span>Frequently Asked Questions ({siteContentState.faqs?.length || 0})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage the questions and answers displayed in the live accordion FAQ.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateSiteContent(prev => ({
                      ...prev,
                      faqs: [
                        ...(prev.faqs || []),
                        { q: 'New Question Title?', a: 'Write the answer to this question here.' }
                      ]
                    }));
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {(siteContentState.faqs || []).map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1">
                          Question #{index + 1}
                        </label>
                        <input
                          type="text"
                          value={faq.q || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSiteContent(prev => {
                              const newFaqs = [...(prev.faqs || [])];
                              newFaqs[index] = { ...newFaqs[index], q: val };
                              return { ...prev, faqs: newFaqs };
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-bold focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete FAQ: "${faq.q}"?`)) {
                            updateSiteContent(prev => ({
                              ...prev,
                              faqs: prev.faqs.filter((_, i) => i !== index)
                            }));
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors mt-5"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Answer
                      </label>
                      <textarea
                        rows={3}
                        value={faq.a || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSiteContent(prev => {
                            const newFaqs = [...(prev.faqs || [])];
                            newFaqs[index] = { ...newFaqs[index], a: val };
                            return { ...prev, faqs: newFaqs };
                          });
                        }}
                        className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-slate-200 text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: THE VIBE / PHILOSOPHY & MANIFESTO */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00e5cc]" />
                  <span>The Vibe / Philosophy & Manifesto</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The brand manifesto lines and soul summary on the main homepage.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Philosophy Header Title</label>
                <input
                  type="text"
                  value={siteContentState.manifesto?.title || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, title: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Manifesto Lines (One statement per line)
                </label>
                <textarea
                  rows={6}
                  value={(siteContentState.manifesto?.lines || []).join('\n')}
                  onChange={(e) => {
                    const val = e.target.value;
                    const lines = val.split('\n');
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, lines }
                    }));
                  }}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed font-mono focus:border-[#00e5cc] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Each line appears as an elegant phrase in the centered "Travel with Soul" manifesto.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Manifesto Summary Statement</label>
                <textarea
                  rows={3}
                  value={siteContentState.manifesto?.summary || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, summary: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 4: HERO BANNER & HEADINGS */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#00e5cc]" />
                  <span>Hero Banner & Destinations Pill</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title Line 1</label>
                  <input
                    type="text"
                    value={siteContentState.hero?.titleLine1 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine1: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title Line 2</label>
                  <input
                    type="text"
                    value={siteContentState.hero?.titleLine2 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine2: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={siteContentState.hero?.tagline || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, tagline: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Destinations Pill</label>
                <input
                  type="text"
                  value={siteContentState.hero?.destinationsPill || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, destinationsPill: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              {/* Hero Background Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Hero Background Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-20 rounded-xl overflow-hidden border border-cyan-400/40 bg-black shrink-0">
                    <img
                      src={resolveTravelImageUrl(
                        siteContentState.hero?.backgroundImage || siteContentState.aboutMoy?.lifestylePhoto || MOY_AGENT_PROFILE.lifestylePhoto,
                        { type: 'lifestyle', isHero: true }
                      )}
                      alt="Hero Bg"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const fallback = getTravelImageFallback({ type: 'lifestyle', isHero: true });
                        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingHeroBg ? 'Uploading...' : 'Upload Background Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingHeroBg}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadContentPhoto(file, 'heroBg');
                          if (e.target) e.target.value = '';
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={siteContentState.hero?.backgroundImage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateSiteContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, backgroundImage: val }
                        }));
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await setDoc(doc(db, 'travelSiteContent', 'main'), siteContentState, { merge: true });
                    setContentAutosaveStatus('saved');
                    setContentSaveSuccess(true);
                    setTimeout(() => setContentSaveSuccess(false), 4000);
                    alert('All site content, Bio, and FAQs published live to website successfully!');
                  } catch (err) {
                    console.error('Error saving site content:', err);
                    alert('Error saving site content: ' + err.message);
                  }
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,229,204,0.4)] transition-all"
              >
                Publish All Changes to Live Site
              </button>
            </div>

          </div>
        )}

        {/* ── TAB 4: TRINIDAD GATEWAY & BANKING SETTINGS WITH AUTOSAVE ── */}
        {activeTab === 'gateway' && (
          <div className="max-w-2xl mx-auto glass-panel p-8 rounded-3xl border-cyan-500/30 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-heading">
                  Trinidad Payment Gateway Configuration
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Configure your WiPay Caribbean Merchant ID, Republic Bank settlement details, and WhatsApp Concierge routing. Changes autosave automatically.
                </p>
              </div>

              {gatewayAutosaveStatus === 'saving' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Autosaving...</span>
                </div>
              )}
              {gatewayAutosaveStatus === 'saved' && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{gatewaySavedText || 'Autosaved'}</span>
                </div>
              )}
            </div>

            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gateway settings successfully updated for live customer checkouts.</span>
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await setDoc(doc(db, 'travelSettings', 'gateway'), {
                    wipayId,
                    whatsappNum,
                    bankAccount,
                    updatedAt: new Date().toISOString()
                  }, { merge: true });
                  setSettingsSaved(true);
                  setGatewayAutosaveStatus('saved');
                  setGatewaySavedText('Saved to live database');
                  setTimeout(() => setSettingsSaved(false), 4000);
                  alert('Payment gateway and concierge settings saved successfully to live database!');
                } catch (err) {
                  console.error('Error saving gateway settings:', err);
                  alert('Error saving gateway settings to database: ' + err.message);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  WiPay Caribbean Merchant ID (Trinidad & Tobago)
                </label>
                <input
                  type="text"
                  value={wipayId}
                  onChange={(e) => updateGatewaySetting('wipay', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Connects credit/debit card checkouts directly to your Trinidad WiPay account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Moy WhatsApp Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappNum}
                  onChange={(e) => updateGatewaySetting('whatsapp', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Republic Bank Account Number (Settlement Account)
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => updateGatewaySetting('bank', e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all"
                >
                  Save Gateway Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

    </div>
  );
}
