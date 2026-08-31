import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { currencyService } from '../../../services/currencyService';

const SectionCard = ({ section, onSelect, currency = 'USD' }) => {
  const {
    name,
    description,
    image_url,
    base_price,
    deposit_amount,
    capacity_limit,
    registration_count = 0,
  } = section;

  const spotsRemaining = Math.max(0, capacity_limit - registration_count);
  const isSoldOut = spotsRemaining === 0;
  const progressPercent = Math.min(100, Math.max(0, (registration_count / capacity_limit) * 100));

  const formattedBase = currencyService.convertAndFormat(base_price, currency, true);
  const formattedDeposit = currencyService.convertAndFormat(deposit_amount, currency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`glass-panel glass-panel-hover flex flex-col overflow-hidden ${isSoldOut ? 'opacity-80 grayscale-[0.5]' : ''}`}
    >
      <div className="relative h-48 w-full bg-slate-800">
        {image_url ? (
          <img src={image_url} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--band-primary,pink)] to-[var(--band-secondary,purple)] opacity-50" />
        )}
        {isSoldOut && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Sold Out
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-display font-bold text-white line-clamp-1">{name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-white font-display">From {formattedBase}</p>
            <p className="text-sm text-[var(--band-primary,pink)] font-medium">{formattedDeposit} deposit</p>
          </div>
        </div>

        <p className="text-sm text-white/70 mb-4 line-clamp-2">{description || 'No description available.'}</p>

        <div className="mt-auto">
          <div className="flex justify-between text-xs text-white/60 mb-1">
            <span className="flex items-center gap-1"><Users size={12} /> Capacity</span>
            <span>{spotsRemaining > 0 ? `${spotsRemaining} spots left` : '0 spots left'}</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div 
              className={`h-full transition-all duration-500 ${isSoldOut ? 'bg-red-500' : 'bg-[var(--band-primary,#ec4899)]'}`} 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>

          <button
            onClick={() => onSelect(section)}
            disabled={isSoldOut}
            className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
              isSoldOut 
                ? 'bg-slate-700 text-white/40 cursor-not-allowed' 
                : 'glass-btn-primary hover:shadow-lg text-white'
            }`}
            style={!isSoldOut ? {
              backgroundImage: 'linear-gradient(to right, var(--band-primary, #ec4899), var(--band-secondary, #8b5cf6))'
            } : {}}
          >
            {isSoldOut ? 'Sold Out' : 'Register Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionCard;
