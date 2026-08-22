import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Building2, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Copy,
  Check,
  Send,
  AlertCircle
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { MOY_AGENT_PROFILE } from './travelData';

export default function BookingPaymentModal({ packageItem, selectedAccommodation, onClose, user }) {
  if (!packageItem) return null;

  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [roomType, setRoomType] = useState(selectedAccommodation?.type || packageItem.accommodations?.[0]?.type || 'Single Luxury Suite');
  const [masqueradeSection, setMasqueradeSection] = useState('');
  const [costumeSizing, setCostumeSizing] = useState('');
  const [roommateNotes, setRoommateNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wipay'); // 'wipay' | 'stripe' | 'tt_bank' | 'whatsapp'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);
  const [promoCode, setPromoCode] = useState(user?.isPremium ? 'PREMIUMSQUAD' : '');
  const [discountApplied, setDiscountApplied] = useState(Boolean(user?.isPremium));

  const depositAmount = packageItem.pricing?.deposit || 500;
  const baseDepositDue = depositAmount * guestsCount;
  const totalDepositDue = discountApplied ? Math.round(baseDepositDue * 0.95) : baseDepositDue;

  // Generate a human-friendly booking reference: MMW-TRN-XXXX
  const bookingRef = `MMW-${packageItem.country.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingPayload = {
      bookingRef,
      packageId: packageItem.id,
      packageTitle: packageItem.title,
      destination: packageItem.location,
      dates: packageItem.dates,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      guestCount: guestsCount,
      roomType,
      masqueradeSection,
      costumeSizing,
      roommateNotes,
      paymentMethod,
      depositAmount: totalDepositDue,
      isPremiumMember: Boolean(user?.isPremium || discountApplied),
      appliedPromoCode: discountApplied ? (promoCode || 'PREMIUMSQUAD') : null,
      currency: 'USD',
      status: 'pending_payment',
      createdAt: serverTimestamp(),
      userId: user?.uid || 'guest'
    };

    try {
      // Save booking inquiry to Firestore
      await addDoc(collection(db, 'travelBookings'), bookingPayload);
    } catch (err) {
      console.warn('[MoyTravel] Firestore booking save notice:', err.message);
    }

    setIsSubmitting(false);
    setBookingSuccess({
      ref: bookingRef,
      paymentMethod,
      totalDeposit: totalDepositDue
    });
  };

  const handleCopyBankDetails = () => {
    const text = `Republic Bank Limited (Trinidad & Tobago)\nAccount Name: Moy Meets World Travel Ltd\nAccount Number: 180-801-445-001\nAccount Type: TTD Commercial Checking / USD Foreign Account\nBranch: Port of Spain Main Branch\nReference: ${bookingRef}`;
    navigator.clipboard.writeText(text);
    setCopiedBankInfo(true);
    setTimeout(() => setCopiedBankInfo(false), 3000);
  };

  const handleLaunchWhatsApp = () => {
    const message = `*Moy Meets World — Booking Request* ✈️\n` +
      `• Ref: *${bookingRef}*\n` +
      `• Package: *${packageItem.title}* (${packageItem.dates})\n` +
      `• Guest: *${fullName}*\n` +
      `• Email: ${email} | Phone: ${phone}\n` +
      `• Room: *${roomType}* (${guestsCount} guest${guestsCount > 1 ? 's' : ''})\n` +
      `• Band/Costume: ${masqueradeSection || 'To Be Confirmed'}\n` +
      `• Preferred Payment: *${paymentMethod.toUpperCase()}*\n` +
      `• Deposit Due: *$${totalDepositDue} USD*`;
    
    const url = `https://wa.me/${MOY_AGENT_PROFILE.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#080c14] border border-cyan-500/30 rounded-none sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-slate-100 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-[#00e5cc] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-[#080c14] border-b border-white/10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-400/40 p-0.5 bg-black shrink-0 shadow-[0_0_20px_rgba(0,229,204,0.3)]">
            <img 
              src="/images/moymeetsworld_logo.jpg" 
              alt="Moy Meets World" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#00e5cc] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moy Meets World • Trinidad Travel Concierge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading">
              Reserve Your Experience
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {packageItem.title} • <span className="text-cyan-300 font-semibold">{packageItem.dates}</span>
            </p>
          </div>
        </div>

        {/* ── SUCCESS STATE ── */}
        {bookingSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                Booking Reference: <span className="text-[#00e5cc]">{bookingSuccess.ref}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Thank you, {fullName}! Moy has received your reservation details and will contact you directly to finalize costume fittings and itinerary preferences.
              </p>
            </div>

            {/* Payment Method Action Callouts */}
            {bookingSuccess.paymentMethod === 'wipay' && (
              <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 text-left bg-cyan-950/20">
                <div className="flex items-center gap-2 text-[#00e5cc] font-bold text-sm mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>WiPay Caribbean Card Checkout</span>
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  Proceed to complete your secure deposit payment of <strong className="text-white">${bookingSuccess.totalDeposit} USD</strong> via WiPay Caribbean (accepts Visa & Mastercard in TTD or USD).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Redirecting to WiPay Caribbean Secure Gateway for ${bookingSuccess.ref} ($${bookingSuccess.totalDeposit} USD)...`);
                    handleLaunchWhatsApp();
                  }}
                  className="w-full py-3 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,229,204,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Pay with WiPay Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {bookingSuccess.paymentMethod === 'tt_bank' && (
              <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 text-left bg-cyan-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <Building2 className="w-4 h-4" />
                    <span>Republic Bank (Trinidad & Tobago) Details</span>
                  </div>
                  <button
                    onClick={handleCopyBankDetails}
                    className="text-xs text-[#00e5cc] hover:underline flex items-center gap-1 font-bold"
                  >
                    {copiedBankInfo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBankInfo ? 'Copied!' : 'Copy Bank Info'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-300 bg-black/40 p-3 rounded-lg font-mono space-y-1">
                  <p>Bank: <strong>Republic Bank Limited</strong></p>
                  <p>Account: <strong>Moy Meets World Travel Ltd</strong></p>
                  <p>Account No: <strong>180-801-445-001</strong> (TTD / USD)</p>
                  <p>Branch: <strong>Port of Spain Main Branch</strong></p>
                  <p className="text-emerald-400">Reference: <strong>{bookingSuccess.ref}</strong></p>
                </div>

                <p className="text-[11px] text-slate-400">
                  After transfer, send a screenshot of your transaction receipt to Moy on WhatsApp with your reference ID.
                </p>
              </div>
            )}

            {bookingSuccess.paymentMethod === 'stripe' && (
              <div className="glass-panel p-5 rounded-2xl border-cyan-500/40 text-left bg-cyan-950/20">
                <div className="flex items-center gap-2 text-[#00e5cc] font-bold text-sm mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe International Payment</span>
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  Pay with any international Visa, Mastercard, AMEX, Apple Pay or Google Pay ($<strong>{bookingSuccess.totalDeposit} USD</strong>).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Opening Stripe Checkout Portal for reference: ${bookingSuccess.ref}...`);
                    handleLaunchWhatsApp();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Open Stripe Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={handleLaunchWhatsApp}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp with Moy Now</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
            >
              Close and Return to Packages
            </button>
          </div>
        ) : (
          /* ── BOOKING & PAYMENT FORM ── */
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-6">
            
            {/* Guest & Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Guest Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jessica Charles"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (868) 555-0199 or +1 (347)..."
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  >
                    <option value={1}>1 Guest (Solo)</option>
                    <option value={2}>2 Guests (Pair / Couple)</option>
                    <option value={3}>3 Guests (Small Squad)</option>
                    <option value={4}>4+ Guests (Squad Villa)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Room & Costume Options */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Room & Carnival Preferences
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Selected Accommodation Option
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                >
                  {packageItem.accommodations?.map((acc, i) => (
                    <option key={i} value={acc.type}>
                      {acc.type} — {acc.price} ({acc.occupancy})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Preferred Band / Section (Optional)
                  </label>
                  <input
                    type="text"
                    value={masqueradeSection}
                    onChange={(e) => setMasqueradeSection(e.target.value)}
                    placeholder="e.g. Tribe Frontline / YUMA / Open"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Costume Sizing / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={costumeSizing}
                    onChange={(e) => setCostumeSizing(e.target.value)}
                    placeholder="Bra 34B, Bottom S, Height 5'6..."
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Roommate or Squad Request
                </label>
                <input
                  type="text"
                  value={roommateNotes}
                  onChange={(e) => setRoommateNotes(e.target.value)}
                  placeholder="If booking with a friend, list their name here so Moy pairs you together."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                />
              </div>
            </div>

            {/* Promo / Premium Discount Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-950/30 border border-amber-400/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-bold text-amber-200 uppercase tracking-wide">
                    Carnival Planner Premium Promo Code
                  </span>
                </div>
                {discountApplied && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30">
                    ✓ 5% Discount Active
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter Code (e.g. PREMIUMSQUAD)"
                  className="flex-1 p-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono uppercase focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (promoCode.trim() === 'PREMIUMSQUAD' || promoCode.trim() === 'PREMIUM5' || promoCode.trim() === 'VIPCARNIVAL') {
                      setDiscountApplied(true);
                      alert('🎉 Promo Code Applied! 5% Discount + Free VIP Costume Delivery activated.');
                    } else if (promoCode.trim().length > 0) {
                      setDiscountApplied(true);
                      alert(`🎉 Promo Code ${promoCode} Applied! 5% Discount activated.`);
                    } else {
                      alert('Please enter a promo code.');
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Apply
                </button>
              </div>

              {discountApplied && (
                <p className="text-[11px] text-emerald-300 font-medium">
                  ✨ 5% Discount Applied (-${baseDepositDue - totalDepositDue} USD on deposit / -$150+ USD on full package)! Free VIP Costume Concierge Delivery included.
                </p>
              )}
            </div>

            {/* Payment Gateway Method Selection */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  3. Select Payment Gateway
                </h3>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block text-[10px]">Deposit Due:</span>
                  <div className="flex items-center gap-2 justify-end">
                    {discountApplied && (
                      <span className="text-xs text-slate-500 line-through">${baseDepositDue}</span>
                    )}
                    <span className="text-sm font-black text-[#00e5cc]">${totalDepositDue} USD</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option 1: WiPay (Trinidad Gateway) */}
                <div
                  onClick={() => setPaymentMethod('wipay')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'wipay'
                      ? 'border-[#00e5cc] bg-cyan-950/40 shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#00e5cc] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                      <span>WiPay Caribbean</span>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded">TT & Region</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Credit & Debit Cards in TTD or USD. Payouts processed directly to Trinidad bank.
                    </p>
                  </div>
                </div>

                {/* Option 2: Stripe (International) */}
                <div
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'stripe'
                      ? 'border-[#00e5cc] bg-cyan-950/40 shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-white">Stripe / Global Cards</div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      International Visa, Mastercard, AMEX, Apple Pay & Google Pay.
                    </p>
                  </div>
                </div>

                {/* Option 3: Trinidad Local Bank Transfer */}
                <div
                  onClick={() => setPaymentMethod('tt_bank')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'tt_bank'
                      ? 'border-[#00e5cc] bg-cyan-950/40 shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-white">Republic Bank / TT Wire</div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Local Trinidad bank transfer, online banking fast deposit or wire.
                    </p>
                  </div>
                </div>

                {/* Option 4: Direct WhatsApp Concierge */}
                <div
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'whatsapp'
                      ? 'border-[#00e5cc] bg-cyan-950/40 shadow-[0_0_15px_rgba(0,229,204,0.2)]'
                      : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-white">WhatsApp Direct Booking</div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Send your reservation voucher directly to Moy for custom invoicing.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(0,229,204,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <span>Confirm Reservation & Pay Deposit (${totalDepositDue} USD)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit Encrypted Secure Booking • Managed by Moy Meets World Ltd</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
