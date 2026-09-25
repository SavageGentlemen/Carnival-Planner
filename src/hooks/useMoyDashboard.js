import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { MOY_AGENT_PROFILE, MOY_TRAVEL_PACKAGES, DEFAULT_SITE_CONTENT } from '../components/travel/travelData';
import { sanitizePackageData } from '../utils/travelMedia';
import { uploadImageResilient } from '../utils/imageUploadService';

export function useMoyDashboard(user, onClose) {
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

  // Sync packages from Firestore in real-time with resilient local storage preservation
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'travelPackages'), (snap) => {
      if (!snap.empty) {
        const firestorePkgs = snap.docs.map(d => sanitizePackageData({ id: d.id, ...d.data() }));
        setPackagesList(firestorePkgs);
        try {
          localStorage.setItem('mmw_packages_custom', JSON.stringify(firestorePkgs));
        } catch (e) {}
      } else {
        // Only fallback if localStorage has no custom packages
        try {
          const cached = localStorage.getItem('mmw_packages_custom');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPackagesList(parsed.map(sanitizePackageData));
              return;
            }
          }
        } catch (e) {}
        setPackagesList(MOY_TRAVEL_PACKAGES.map(sanitizePackageData));
      }
    }, (err) => {
      console.warn('[MoyTravel] Firestore packages sync notice:', err.message);
      try {
        const cached = localStorage.getItem('mmw_packages_custom');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPackagesList(parsed.map(sanitizePackageData));
          }
        }
      } catch (e) {}
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

    // 1. Immediately persist to state & localStorage (guaranteed, instant, reliable)
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
    setLastSavedText('Package saved successfully');

    // 2. Attempt Firestore background sync without throwing blocking alerts
    try {
      await setDoc(doc(db, 'travelPackages', pkgId), payload, { merge: true });
      try {
        const revId = 'rev_' + Date.now();
        await setDoc(doc(db, 'travelPackages', pkgId, 'revisions', revId), {
          ...payload,
          savedBy: currentUser?.email || 'Admin',
          savedAt: new Date().toISOString()
        });
      } catch (revErr) {}
      setLastSavedText('Synced with live database');
    } catch (err) {
      console.warn('Firestore cloud sync notice (saved locally):', err.message);
    } finally {
      setIsSavingPkg(false);
      setEditingPkg(null);
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

  
  return {
    activeTab,
    setActiveTab,
    bookings,
    setBookings,
    packagesList,
    setPackagesList,
    editingPkg,
    setEditingPkg,
    loading,
    setLoading,
    searchQuery,
    setSearchQuery,
    selectedBooking,
    setSelectedBooking,
    passcode,
    setPasscode,
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    authMode,
    setAuthMode,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    authError,
    setAuthError,
    isLoggingIn,
    setIsLoggingIn,
    isSavingPkg,
    setIsSavingPkg,
    uploadingField,
    setUploadingField,
    uploadSuccessField,
    setUploadSuccessField,
    autosaveStatus,
    setAutosaveStatus,
    lastSavedText,
    setLastSavedText,
    restoredFromDraft,
    setRestoredFromDraft,
    wipayId,
    setWipayId,
    whatsappNum,
    setWhatsappNum,
    bankAccount,
    setBankAccount,
    settingsSaved,
    setSettingsSaved,
    gatewayAutosaveStatus,
    setGatewayAutosaveStatus,
    gatewaySavedText,
    setGatewaySavedText,
    siteContentState,
    setSiteContentState,
    contentAutosaveStatus,
    setContentAutosaveStatus,
    contentSavedText,
    setContentSavedText,
    contentSaveSuccess,
    setContentSaveSuccess,
    uploadingContentPhoto,
    setUploadingContentPhoto,
    uploadingHeroBg,
    setUploadingHeroBg,
    revisionsModalOpen,
    setRevisionsModalOpen,
    revisionsList,
    setRevisionsList,
    loadingRevisions,
    setLoadingRevisions,
    handleOpenRevisions,
    handleRestoreRevision,
    updateSiteContent,
    handleUploadContentPhoto,
    handleLogin,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleAddAccommodationTier,
    handleUpdateAccommodationTier,
    handleRemoveAccommodationTier,
    handleSyncAccommodationPrices,
    lower,
    handleInitDefaultAccommodations,
    updateEditingPkg,
    handleOpenEdit,
    handleSavePackage,
    handleUploadPhoto,
    updateGatewaySetting,
    handleUpdateStatus,
    handleExportCSV,
    cached,
    parsed,
    ADMIN_EMAILS,
    isSuperAdmin,
    autosaveTimerRef,
    draft,
    gatewayTimerRef,
    firestorePkgs,
    data,
    contentTimerRef,
    snap,
    list,
    next,
    url,
    fallbackUrl,
    currentAcc,
    singlePrice,
    doublePrice,
    unsubscribe,
    exists,
    updatedList,
    savedDraft,
    revId,
    headers,
    rows,
    csvContent,
    encodedUri,
    link,
    filteredBookings,
    totalRevenueDeposits
  };
}
