import React, { useState, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { functions, auth, googleProvider } from './firebase'; 
import { carnivalData } from './carnivals';
import logo from './assets/carnival-logo.png'; 
import './index.css';

// Stripe Price IDs
const MONTHLY_PRICE_ID = "price_1SanHUJR9xpdRiXijLesRPVt"; 
const YEARLY_PRICE_ID = "price_1SanMhJR9xpdRiXinv2F9knM";

function App() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [loading, setLoading] = useState(false);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');

  // Budget State
  const [budgetItems, setBudgetItems] = useState([
    { id: 1, name: 'Costume Deposit', cost: 350 },
    { id: 2, name: 'Flight', cost: 600 }
  ]);
  const [newItem, setNewItem] = useState({ name: '', cost: '' });

  // --- Auth Listener ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // ADMIN OVERRIDE FOR TEST USER
        if (currentUser.email === 'djkrss1@gmail.com') {
          setIsPremium(true);
        } else {
          // Check URL for success flag (simulating subscription for now)
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('success') === 'true') {
            setIsPremium(true);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // --- Auth Functions ---
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // --- Premium Upgrade ---
  const handleUpgrade = async (selectedPriceId) => {
    setLoading(true);
    try {
      const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
      const origin = window.location.origin;
      const { data } = await createCheckoutSession({ 
        priceId: selectedPriceId,
        successUrl: `${origin}/?success=true`,
        cancelUrl: `${origin}/?canceled=true`,
      });
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ---
  const getDaysUntil = (dateString) => {
    const today = new Date();
    const target = new Date(dateString);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const addBudgetItem = () => {
    if (!newItem.name || !newItem.cost) return;
    setBudgetItems([...budgetItems, { id: Date.now(), name: newItem.name, cost: parseFloat(newItem.cost) }]);
    setNewItem({ name: '', cost: '' });
  };

  const totalCost = budgetItems.reduce((acc, item) => acc + item.cost, 0);

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-carnival-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-carnival-primary/20 rounded-full blur-[100px]"></div>
        
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-full max-w-md z-10 shadow-2xl">
          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400">Plan your next fete experience.</p>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors mb-6"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="G" />
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-carnival-primary outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-carnival-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
            
            <button type="submit" className="w-full bg-carnival-primary hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition-colors">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400 text-sm">
            {isRegistering ? "Already have an account?" : "Don't have an account?"} 
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-2 text-carnival-secondary hover:underline font-bold"
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div className="min-h-screen bg-carnival-dark text-white font-sans selection:bg-carnival-primary selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-carnival-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight hidden sm:block">Carnival<span className="text-carnival-primary">Planner</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            {!isPremium ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleUpgrade(MONTHLY_PRICE_ID)}
                  className="hidden sm:block bg-carnival-primary hover:bg-pink-600 text-white px-4 py-2 rounded-full font-bold text-xs"
                  disabled={loading}
                >
                  $4.99/mo
                </button>
                <button 
                  onClick={() => handleUpgrade(YEARLY_PRICE_ID)}
                  className="bg-carnival-secondary hover:bg-cyan-400 text-carnival-dark px-4 py-2 rounded-full font-bold text-xs"
                  disabled={loading}
                >
                  Upgrade
                </button>
              </div>
            ) : (
              <span className="bg-carnival-gold/20 text-carnival-gold border border-carnival-gold/50 px-3 py-1 rounded-full text-xs font-bold">VIP MEMBER 👑</span>
            )}
            <button onClick={() => signOut(auth)} className="text-gray-400 hover:text-white text-sm">Sign Out</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-8 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-carnival-secondary/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-carnival-secondary to-carnival-primary">
          2026 Carnival Countdown
        </h1>
        <p className="text-gray-300 text-lg mb-8">Logged in as: <span className="text-carnival-secondary">{user.email}</span></p>
        
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setActiveTab('itinerary')} className={`px-6 py-2 rounded-full transition-all ${activeTab === 'itinerary' ? 'bg-white text-carnival-dark font-bold' : 'bg-white/10 hover:bg-white/20'}`}>Itinerary</button>
          <button onClick={() => setActiveTab('budget')} className={`px-6 py-2 rounded-full transition-all ${activeTab === 'budget' ? 'bg-white text-carnival-dark font-bold' : 'bg-white/10 hover:bg-white/20'}`}>Budget {isPremium ? '' : '🔒'}</button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        
        {/* ITINERARY LIST (FREE) */}
        {activeTab === 'itinerary' && (
          <div className="space-y-4 animate-fadeIn">
            {carnivalData.map((carnival, index) => {
              const daysLeft = getDaysUntil(carnival.date);
              if (daysLeft <= 0) return null; // Don't show past events

              return (
                <div key={index} className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors group">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-carnival-secondary transition-colors">{carnival.name}</h3>
                    <p className="text-gray-400 text-sm">{new Date(carnival.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl md:text-3xl font-bold text-carnival-primary">{daysLeft}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Days Left</span>
                  </div>
                </div>
              );
            })}
            
            {!isPremium && (
               <div className="mt-8 p-6 border border-carnival-gold/30 rounded-2xl bg-gradient-to-b from-carnival-gold/10 to-transparent text-center">
                 <h3 className="text-xl font-bold text-carnival-gold mb-2">Want to save this schedule?</h3>
                 <p className="text-gray-400 text-sm mb-4">Export to Google Calendar and PDF with Premium.</p>
                 <button onClick={() => handleUpgrade(MONTHLY_PRICE_ID)} className="text-white underline text-sm hover:text-carnival-primary">Unlock Premium</button>
               </div>
            )}
          </div>
        )}

        {/* BUDGET TRACKER (LOCKED) */}
        {activeTab === 'budget' && (
          <div className="animate-fadeIn relative">
            {!isPremium && (
              <div className="absolute inset-0 z-10 backdrop-blur-md bg-carnival-dark/70 flex flex-col items-center justify-center rounded-2xl border border-white/10 p-6 text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
                <p className="text-gray-300 mb-6 max-w-xs">Track costs for flights, costumes, and fetes.</p>
                <button 
                  onClick={() => handleUpgrade(YEARLY_PRICE_ID)}
                  className="bg-carnival-secondary text-carnival-dark px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 w-full max-w-xs"
                >
                  Unlock for $39.99/yr
                </button>
              </div>
            )}

            <div className={`space-y-6 ${!isPremium ? 'opacity-20 pointer-events-none' : ''}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-400 text-sm">Budget</p>
                  <p className="text-3xl font-bold text-white">$2.5k</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-gray-400 text-sm">Spent</p>
                  <p className="text-3xl font-bold text-carnival-primary">${totalCost}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Expenses</h3>
                <div className="space-y-3 mb-6">
                  {budgetItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-lg">
                      <span>{item.name}</span>
                      <span className="font-mono text-gray-300">${item.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Item" className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 flex-grow text-white" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
                  <input type="number" placeholder="$" className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 w-20 text-white" value={newItem.cost} onChange={(e) => setNewItem({...newItem, cost: e.target.value})} />
                  <button onClick={addBudgetItem} className="bg-carnival-secondary text-carnival-dark font-bold px-4 py-2 rounded-lg">+</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;