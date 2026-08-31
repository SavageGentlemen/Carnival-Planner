import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate, useParams, useLocation } from 'react-router-dom';
import { CheckCircle, Share2, ArrowRight } from 'lucide-react';
import PaymentTimeline from './PaymentTimeline';

export default function OrderConfirmation() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get data from location state or URL params
  const orderId = searchParams.get('orderId') || location.state?.orderId || '';
  const sectionName = searchParams.get('section') || location.state?.sectionName || 'Costume Section';
  const amountPaid = searchParams.get('paid') || location.state?.amountPaid || '0.00';

  const handleViewOrder = () => {
    navigate(`/band/${slug}/order/${orderId}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just registered for Carnival!',
        text: `I'm playing in ${sectionName}. Join me!`,
        url: window.location.origin + `/band/${slug}`
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.origin + `/band/${slug}`);
      alert('Band link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center py-12 px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-400" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">You're Registered!</h1>
        <p className="font-body text-white/70 text-lg">Your deposit has been processed successfully.</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl space-y-6"
      >
        {/* Order Summary Card */}
        <div className="glass-panel p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <CheckCircle className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <span className="text-white/50 text-sm uppercase tracking-wider block mb-1">Order ID</span>
            <span className="text-white font-mono text-xl block mb-6">{orderId}</span>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-white/50 text-sm uppercase tracking-wider block mb-1">Section</span>
                <span className="text-white font-medium text-lg block">{sectionName}</span>
              </div>
              <div>
                <span className="text-white/50 text-sm uppercase tracking-wider block mb-1">Deposit Paid</span>
                <span className="text-green-400 font-display font-bold text-2xl block">${amountPaid}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule Preview */}
        <div className="glass-panel p-6 md:p-8">
          <h3 className="font-display text-xl font-bold text-white mb-2">Payment Schedule</h3>
          <p className="text-white/60 text-sm mb-6">Keep track of your upcoming payments to secure your costume.</p>
          <PaymentTimeline />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            onClick={handleViewOrder}
            className="flex-1 glass-btn-primary py-4 rounded-xl flex items-center justify-center gap-2 font-medium text-lg"
          >
            View Your Order <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleShare}
            className="flex-1 glass-panel glass-panel-hover py-4 rounded-xl flex items-center justify-center gap-2 font-medium text-white transition-colors hover:bg-white/10"
          >
            <Share2 className="w-5 h-5" /> Share with Squad
          </button>
        </div>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/40 text-sm mt-16 text-center"
      >
        A confirmation email has been sent to your inbox.<br />
        Need help? Contact support via the band page.
      </motion.p>
    </div>
  );
}
