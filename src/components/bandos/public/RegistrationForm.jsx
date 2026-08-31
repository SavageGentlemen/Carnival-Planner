import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const steps = ['Section', 'Options', 'Details', 'Review'];

const RegistrationForm = ({ band, section, variants = [], affiliateCode = '', onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    repCode: affiliateCode
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Group variants by type (e.g., Size, Gender, Option)
  const groupedVariants = variants.reduce((acc, v) => {
    if (!acc[v.variant_type]) acc[v.variant_type] = [];
    acc[v.variant_type].push(v);
    return acc;
  }, {});

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      Object.keys(groupedVariants).forEach(type => {
        if (!selectedVariants[type]) {
          newErrors[type] = `Please select a ${type}`;
        }
      });
    } else if (step === 2) {
      if (!details.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!details.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!details.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) newErrors.email = 'Valid email is required';
      if (!details.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    let totalOptions = 0;
    Object.values(selectedVariants).forEach(val => {
      const v = variants.find(v => v.id === val);
      if (v && v.additional_cost) totalOptions += Number(v.additional_cost);
    });
    const subtotal = Number(section.deposit_amount) + totalOptions;
    const platformFee = (subtotal * 0.025) + 1.00;
    const stripeFee = ((subtotal + platformFee) * 0.029) + 0.30;
    const total = subtotal + platformFee + stripeFee;
    
    return {
      deposit: Number(section.deposit_amount),
      options: totalOptions,
      subtotal,
      platformFee,
      stripeFee,
      total
    };
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    // Simulate API call to checkout/cloud function
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        onComplete({ section, selectedVariants, details, total: calculateTotal() });
      }, 2000);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white mb-4">Confirm Selection</h3>
            <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-32 h-32 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                {section.image_url ? (
                  <img src={section.image_url} alt={section.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--band-primary)] to-[var(--band-secondary)] opacity-50" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">{section.name}</h4>
                <p className="text-sm text-white/70 mb-3">{section.description}</p>
                <div className="space-y-1">
                  <div className="text-white/90 text-sm">
                    <span className="font-semibold inline-block w-24">Base Price:</span> ${section.base_price}
                  </div>
                  <div className="text-[var(--band-primary)] text-sm">
                    <span className="font-semibold inline-block w-24">Deposit:</span> ${section.deposit_amount}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white mb-4">Customize Options</h3>
            {Object.keys(groupedVariants).length === 0 ? (
              <div className="glass-panel p-6 text-center">
                <AlertCircle className="mx-auto mb-2 text-white/50" size={24} />
                <p className="text-white/70 italic">No customizable options for this section.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedVariants).map(([type, options]) => (
                  <div key={type} className="space-y-1">
                    <label className="text-sm font-medium text-white/90 capitalize">{type}</label>
                    <select
                      value={selectedVariants[type] || ''}
                      onChange={(e) => {
                        setSelectedVariants(prev => ({ ...prev, [type]: e.target.value }));
                        if (errors[type]) setErrors(prev => ({ ...prev, [type]: null }));
                      }}
                      className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)] transition-all"
                    >
                      <option value="" disabled>Select {type}</option>
                      {options.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.variant_value} {opt.additional_cost > 0 ? `(+$${opt.additional_cost})` : ''}
                        </option>
                      ))}
                    </select>
                    {errors[type] && <p className="text-red-400 text-xs mt-1">{errors[type]}</p>}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white mb-4">Your Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/90">First Name</label>
                <input
                  type="text"
                  value={details.firstName}
                  onChange={(e) => setDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)]"
                />
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/90">Last Name</label>
                <input
                  type="text"
                  value={details.lastName}
                  onChange={(e) => setDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)]"
                />
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                value={details.email}
                onChange={(e) => setDetails(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)]"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/90">Phone Number</label>
              <input
                type="tel"
                value={details.phone}
                onChange={(e) => setDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (000) 000-0000"
                className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)]"
              />
              {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/90">Affiliate / Rep Code (Optional)</label>
              <input
                type="text"
                value={details.repCode}
                onChange={(e) => setDetails(prev => ({ ...prev, repCode: e.target.value }))}
                className="w-full bg-slate-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--band-primary)]"
              />
            </div>
          </motion.div>
        );
      case 3:
        const pricing = calculateTotal();
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white mb-4">Review & Pay</h3>
            
            <div className="glass-panel p-5 space-y-4 mb-6">
              <h4 className="font-semibold text-white border-b border-white/10 pb-3">Order Summary</h4>
              <div className="flex justify-between text-sm text-white/80">
                <span>{section.name} Deposit</span>
                <span>${pricing.deposit.toFixed(2)}</span>
              </div>
              {pricing.options > 0 && (
                <div className="flex justify-between text-sm text-white/80">
                  <span>Selected Options</span>
                  <span>${pricing.options.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-white/80">
                <span>Platform Fee</span>
                <span>${pricing.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>Processing Fee</span>
                <span>${pricing.stripeFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-xl border-t border-white/10 pt-4 mt-2">
                <span>Total Due Today</span>
                <span className="text-[var(--band-primary)]">${pricing.total.toFixed(2)}</span>
              </div>
            </div>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
              >
                <CheckCircle size={48} className="mb-3" />
                <p className="font-bold text-lg">Success!</p>
                <p className="text-sm text-center mt-1 text-green-400/80">Redirecting to your dashboard...</p>
              </motion.div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:opacity-90"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--band-primary, #ec4899), var(--band-secondary, #8b5cf6))',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={20} /> Processing Payment...</>
                ) : (
                  <>Pay Deposit (${pricing.total.toFixed(2)})</>
                )}
              </button>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel w-full max-w-lg bg-slate-950/95 relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl border border-white/10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-10 transition-colors bg-black/20 rounded-full p-1">
          <X size={20} />
        </button>

        <div className="px-6 py-5 border-b border-white/10 flex-shrink-0 bg-white/5">
          <div className="flex items-center justify-between mt-2">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center w-full relative z-10">
                <div className={`w-4 h-4 rounded-full mb-2 transition-all duration-300 flex items-center justify-center ${
                  idx < currentStep ? 'bg-[var(--band-primary,#ec4899)]' : 
                  idx === currentStep ? 'bg-[var(--band-primary,#ec4899)] ring-4 ring-[var(--band-primary,#ec4899)]/30' : 
                  'bg-white/20'
                }`}>
                  {idx < currentStep && <CheckCircle size={10} className="text-white" />}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors ${
                  idx <= currentStep ? 'text-white' : 'text-white/40'
                }`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-grow custom-scrollbar min-h-[300px]">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between flex-shrink-0">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0 ? 'invisible' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            disabled={submitSuccess || isSubmitting}
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-all shadow-md hover:opacity-90"
              style={{
                backgroundImage: 'linear-gradient(to right, var(--band-primary, #ec4899), var(--band-secondary, #8b5cf6))'
              }}
            >
              Next Step <ArrowRight size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
