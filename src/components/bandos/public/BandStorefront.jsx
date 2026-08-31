import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, MapPin, Globe } from 'lucide-react';
import { bandOSService } from '../../../services/bandOSService';
import { currencyService } from '../../../services/currencyService';
import SectionCard from './SectionCard';
import RegistrationForm from './RegistrationForm';

const BandStorefront = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const repCode = searchParams.get('rep') || '';

  const [band, setBand] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState('USD');
  
  const [selectedSection, setSelectedSection] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loadingVariants, setLoadingVariants] = useState(false);

  useEffect(() => {
    const fetchBandData = async () => {
      try {
        setLoading(true);
        const bandData = await bandOSService.getBandBySlug(slug);
        
        if (!bandData) {
          setError('Band not found');
          setLoading(false);
          return;
        }

        setBand(bandData);
        
        // Apply band colors to document root for CSS variables
        if (bandData.primary_color) {
          document.documentElement.style.setProperty('--band-primary', bandData.primary_color);
        }
        if (bandData.secondary_color) {
          document.documentElement.style.setProperty('--band-secondary', bandData.secondary_color);
        }

        const sectionsData = await bandOSService.getPublicSections(bandData.id);
        setSections(sectionsData || []);
      } catch (err) {
        console.error('Error fetching storefront:', err);
        setError('Failed to load storefront');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBandData();
    
    return () => {
      document.documentElement.style.removeProperty('--band-primary');
      document.documentElement.style.removeProperty('--band-secondary');
    };
  }, [slug]);

  const handleSectionSelect = async (section) => {
    setSelectedSection(section);
    try {
      setLoadingVariants(true);
      const sectionVariants = await bandOSService.getVariantsBySection(section.id);
      setVariants(sectionVariants || []);
    } catch (err) {
      console.warn('Error fetching variants:', err);
      setVariants([]); 
    } finally {
      setLoadingVariants(false);
    }
  };

  const handleRegistrationComplete = (orderData) => {
    console.log('Registration completed:', orderData);
    setSelectedSection(null);
    // Ideally refetch sections here to update capacity/sold out status
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4 text-[var(--band-primary,#ec4899)]" size={48} />
        <p className="text-white/60 font-body">Loading storefront...</p>
      </div>
    );
  }

  if (error || !band) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-display font-bold mb-2">Oops!</h2>
        <p className="text-white/70 font-body">{error || 'Band not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body pb-20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {band.logo_url ? (
              <img src={band.logo_url} alt={band.business_name} className="h-10 w-10 rounded-full object-cover border border-white/20" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[var(--band-primary,#ec4899)] flex items-center justify-center font-bold text-white shadow-lg">
                {band.business_name?.charAt(0)}
              </div>
            )}
            <span className="font-display font-bold text-xl tracking-tight">{band.business_name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-Currency Switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-white/50" />
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-xs font-bold cursor-pointer"
              >
                {currencyService.getCurrencies().map(c => (
                  <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 min-h-[50vh] flex items-center justify-center overflow-hidden">
        {band.hero_image_url ? (
          <>
            <div className="absolute inset-0 z-0">
              <img src={band.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 z-10 bg-slate-950/70" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </>
        ) : (
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at center, var(--band-primary, #ec4899), transparent 70%)'
            }}
          />
        )}

        <div className="container mx-auto px-4 z-20 relative text-center py-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg"
          >
            {band.business_name}
          </motion.h1>
          
          {band.tagline && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow"
            >
              {band.tagline}
            </motion.p>
          )}

          {band.carnival_city && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-xl"
            >
              <MapPin size={18} className="text-[var(--band-primary,#ec4899)]" />
              <span className="font-medium text-lg">{band.carnival_city}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-display font-bold text-white mb-3">Costume Sections</h2>
          <p className="text-white/60 text-lg">Choose your section and secure your spot on the road.</p>
        </div>

        {sections.length === 0 ? (
          <div className="glass-panel p-16 text-center">
            <p className="text-white/60 text-xl">No sections are currently available for registration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sections.map((section) => (
              <SectionCard 
                key={section.id} 
                section={section} 
                currency={currency}
                onSelect={handleSectionSelect} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedSection && (
        <RegistrationForm
          band={band}
          section={selectedSection}
          variants={variants}
          affiliateCode={repCode}
          onClose={() => setSelectedSection(null)}
          onComplete={handleRegistrationComplete}
        />
      )}
    </div>
  );
};

export default BandStorefront;
