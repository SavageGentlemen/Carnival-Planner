import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { ShieldCheck, Building, Mail, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function BandSignup({ user, onComplete }) {
  const [formData, setFormData] = useState({
    businessName: '',
    taxId: '',
    supportEmail: '',
    logoUrl: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
