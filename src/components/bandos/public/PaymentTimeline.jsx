import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const fallbackPayments = [
  { id: 'ps-1', installment_label: 'Deposit', amount_due: 400, due_date: '2026-10-01', status: 'paid', paid_at: '2026-09-15' },
  { id: 'ps-2', installment_label: 'Second Payment', amount_due: 500, due_date: '2026-12-01', status: 'pending', paid_at: null },
  { id: 'ps-3', installment_label: 'Final Balance', amount_due: 350, due_date: '2027-01-15', status: 'pending', paid_at: null }
];

export default function PaymentTimeline({ payments = [] }) {
  const displayPayments = payments && payments.length > 0 ? payments : fallbackPayments;

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20'
        };
      case 'overdue':
        return {
          icon: <AlertCircle className="w-6 h-6 text-red-500" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6 text-amber-500" />,
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full py-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row gap-6 relative"
      >
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-8 left-6 right-6 h-0.5 bg-white/10" />
        
        {/* Connecting line (mobile) */}
        <div className="md:hidden absolute top-6 bottom-6 left-8 w-0.5 bg-white/10" />

        {displayPayments.map((payment, index) => {
          const config = getStatusConfig(payment.status);
          
          return (
            <motion.div 
              key={payment.id || index}
              variants={itemVariants}
              className="flex md:flex-col items-center md:items-center relative z-10 flex-1 gap-4 md:gap-2"
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center border-2 ${config.borderColor} ${config.bgColor} backdrop-blur-sm`}>
                {config.icon}
              </div>
              
              <div className="flex flex-col md:items-center text-left md:text-center w-full glass-panel p-4">
                <h4 className="font-display font-medium text-white/90 text-sm md:text-base">
                  {payment.installment_label}
                </h4>
                <p className="font-body text-xl font-bold text-white mt-1">
                  ${payment.amount_due}
                </p>
                <div className="flex flex-col md:items-center mt-2 text-xs">
                  <span className={`${config.color} font-medium uppercase tracking-wider`}>
                    {payment.status}
                  </span>
                  <span className="text-white/50 mt-1">
                    Due: {new Date(payment.due_date).toLocaleDateString()}
                  </span>
                  {payment.paid_at && (
                    <span className="text-white/40 mt-1">
                      Paid: {new Date(payment.paid_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
