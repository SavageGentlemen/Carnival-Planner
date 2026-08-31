import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Calendar, MapPin, Package, ArrowRight, CreditCard } from 'lucide-react';
import { bandOSService } from '../../../services/bandOSService';
import PaymentTimeline from './PaymentTimeline';

export default function MasqueraderPortal() {
  const { slug, orderId } = useParams();
  
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await bandOSService.getOrderByIdAndEmail(orderId, email);
      if (!data) {
        setError('No costume registration found matching this Order ID and Email address. Please check your confirmation invoice.');
        return;
      }
      
      // Structure real data
      const order = {
        id: data.id,
        order_date: data.created_at || new Date().toISOString(),
        section_name: data.band_costume_sections?.title || 'Costume Section',
        section_image: data.band_costume_sections?.image_url || '',
        total_cost: parseFloat(data.total_amount) || parseFloat(data.band_costume_sections?.base_price) || 0,
        total_paid: parseFloat(data.amount_paid) || 0,
        remaining_balance: Math.max(0, (parseFloat(data.total_amount) || parseFloat(data.band_costume_sections?.base_price) || 0) - (parseFloat(data.amount_paid) || 0)),
        sizing: Object.entries(data.selected_variants || {}).map(([k, v]) => ({
          label: k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: v
        })),
        payments: [],
        distribution: {
          status: data.distribution_status || 'Pending',
          date: data.distributed_at ? new Date(data.distributed_at).toLocaleDateString() : 'TBD',
          time: 'Mas Camp Hours',
          location: 'Band Distribution Center'
        }
      };
      
      setOrderData(order);
      setIsAuthenticated(true);
    } catch (err) {
      console.warn('Auth failed:', err);
      setError('Invalid email or order ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNext = () => {
    // Determine next pending payment amount (if using real data)
    // For now, simulate checkout
    alert('Redirecting to Stripe Checkout for next installment...');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-8"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">Order Portal</h2>
            <p className="font-body text-white/70 text-sm">Enter your email to view your order details.</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                placeholder="masquerader@example.com"
              />
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full glass-btn-primary py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'View Order'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-48 md:h-64">
          <img 
            src={orderData.section_image} 
            alt={orderData.section_name} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-pink-400 font-medium text-sm tracking-wider uppercase">Order #{orderData.id}</span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
                  {orderData.section_name}
                </h1>
                <p className="text-white/60 text-sm mt-2">
                  Placed on {new Date(orderData.order_date).toLocaleDateString()}
                </p>
              </div>
              <div className="glass-panel px-4 py-2 text-center rounded-lg inline-block">
                <span className="text-white/60 text-xs uppercase block">Status</span>
                <span className="text-green-400 font-bold">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content - Left/Center Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Financials Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-pink-400" />
              Payment Dashboard
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-panel bg-white/5 p-4 rounded-xl text-center">
                <span className="text-white/60 text-xs md:text-sm block">Total Cost</span>
                <span className="text-white font-display text-lg md:text-2xl font-bold mt-1 block">${orderData.total_cost}</span>
              </div>
              <div className="glass-panel bg-green-500/10 border-green-500/20 p-4 rounded-xl text-center">
                <span className="text-green-400/80 text-xs md:text-sm block">Total Paid</span>
                <span className="text-green-400 font-display text-lg md:text-2xl font-bold mt-1 block">${orderData.total_paid}</span>
              </div>
              <div className="glass-panel bg-amber-500/10 border-amber-500/20 p-4 rounded-xl text-center">
                <span className="text-amber-400/80 text-xs md:text-sm block">Balance</span>
                <span className="text-amber-400 font-display text-lg md:text-2xl font-bold mt-1 block">${orderData.remaining_balance}</span>
              </div>
            </div>

            <PaymentTimeline payments={orderData.payments} />
            
            {orderData.remaining_balance > 0 && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={handlePayNext}
                  className="glass-btn-primary px-8 py-3 rounded-lg flex items-center gap-2 font-medium"
                >
                  Pay Next Installment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Sizing Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h2 className="font-display text-xl font-bold text-white mb-6">Sizing & Options</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {orderData.sizing?.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <span className="text-white/50 text-xs block uppercase tracking-wider">{item.label}</span>
                  <span className="text-white font-medium block mt-1">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Distribution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6"
          >
            <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-pink-400" />
              Distribution
            </h2>
            
            {orderData.distribution ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    orderData.distribution.status === 'Ready' ? 'bg-green-500/20 text-green-400' :
                    orderData.distribution.status === 'Distributed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {orderData.distribution.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-white/50 mt-0.5" />
                    <div>
                      <span className="text-white block font-medium">{new Date(orderData.distribution.date).toLocaleDateString()}</span>
                      <span className="text-white/50 text-sm">{orderData.distribution.time}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-white/50 mt-0.5" />
                    <span className="text-white text-sm leading-relaxed">{orderData.distribution.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-center">
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center p-4 mb-3">
                    {/* Placeholder for actual QR code */}
                    <div className="w-full h-full border-4 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 font-mono text-sm break-all text-center">{orderData.id}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs text-center">Present this code at collection</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/50 text-sm">Distribution details will appear here closer to Carnival.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
