import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { bandOSService } from '../../services/bandOSService';
import { ShieldCheck, Building, Mail, FileText, CheckCircle, Loader2, AlertCircle, Phone, Link as LinkIcon, Instagram, Facebook } from 'lucide-react';

export default function BandSignup({ user, onComplete }) {
  const [formData, setFormData] = useState({
    businessName: '',
    taxId: '',
    supportEmail: '',
    logoUrl: '',
    slug: '',
    carnival_city: 'Trinidad',
    tagline: '',
    primary_color: '#ec4899',
    hero_image_url: '',
    contact_phone: '',
    instagram_handle: '',
    facebook_url: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [slugStatus, setSlugStatus] = useState('idle'); // idle, checking, available, unavailable

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'businessName' && !formData.slug) {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, [name]: value, slug: autoSlug }));
      setSlugStatus('idle');
    } else if (name === 'slug') {
      const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, slug: cleanSlug }));
      setSlugStatus('idle');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const checkSlug = async () => {
    if (!formData.slug) return;
    setSlugStatus('checking');
    try {
      const isAvailable = await bandOSService.checkSlugAvailability(formData.slug);
      setSlugStatus(isAvailable ? 'available' : 'unavailable');
    } catch (e) {
      setSlugStatus('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('band_profiles')
        .insert([
          {
            id: user.uid, // Assuming user.uid is mapped to auth.users in Supabase
            business_name: formData.businessName,
            tax_id: formData.taxId,
            support_email: formData.supportEmail,
            logo_url: formData.logoUrl,
            slug: formData.slug,
            carnival_city: formData.carnival_city,
            tagline: formData.tagline,
            primary_color: formData.primary_color,
            hero_image_url: formData.hero_image_url,
            contact_phone: formData.contact_phone,
            instagram_handle: formData.instagram_handle,
            facebook_url: formData.facebook_url,
            status: 'pending'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
            throw new Error("You have already submitted an application for BandOS.");
        }
        throw error;
      }

      setStatus('success');
      setTimeout(() => onComplete && onComplete(), 3000);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during submission.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center max-w-md mx-auto my-8 shadow-sm">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">Application Received</h2>
        <p className="text-green-700 dark:text-green-400">
          Your application to join BandOS is under review. An admin will verify your details shortly.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 max-w-2xl mx-auto my-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">BandOS Onboarding</h2>
          <p className="text-gray-500 text-sm">Submit your organization's details to access advanced tools.</p>
        </div>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex gap-3 text-sm border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Business/Band Name</label>
          <div className="relative">
            <Building className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              required
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              type="text" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. Tribe Carnival"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tax ID / EIN (Optional)</label>
            <div className="relative">
              <FileText className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                type="text" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="For verification"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                required
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                type="email" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="support@band.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Logo URL (Optional)</label>
          <input 
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            type="url" 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Image URL (Optional)</label>
          <input 
            name="hero_image_url"
            value={formData.hero_image_url}
            onChange={handleChange}
            type="url" 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g. tribe-carnival"
                />
              </div>
              <button
                type="button"
                onClick={checkSlug}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {slugStatus === 'checking' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check'}
              </button>
            </div>
            {slugStatus === 'available' && <p className="text-green-600 text-sm mt-1 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Available</p>}
            {slugStatus === 'unavailable' && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Unavailable</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Carnival City</label>
            <select
              name="carnival_city"
              value={formData.carnival_city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none h-[42px]"
            >
              {['Trinidad', 'Jamaica', 'Miami', 'Barbados', 'Notting Hill', 'Toronto', 'Grenada', 'Antigua', 'St. Lucia', 'Atlanta', 'Other'].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tagline (Optional)</label>
            <input 
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Play Mas. Live Bold."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Color</label>
            <div className="flex gap-2 items-center">
              <input 
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                type="color" 
                className="h-10 w-16 p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer"
              />
              <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">{formData.primary_color}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                type="text" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Instagram Handle</label>
            <div className="relative">
              <Instagram className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="instagram_handle"
                value={formData.instagram_handle}
                onChange={handleChange}
                type="text" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="@yourbandname"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
            <div className="relative">
              <Facebook className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                type="url" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </motion.div>
  );
}
