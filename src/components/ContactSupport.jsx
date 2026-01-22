import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, MessageSquare, CheckCircle, Loader2, Mail, Trash2 } from 'lucide-react';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export function ContactPage({ onBack, logo, user }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'support-requests'), {
        email: email.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim(),
        userId: user?.uid || null,
        userName: user?.displayName || null,
        status: 'new',
        createdAt: Timestamp.now()
      });

      setSubmitted(true);
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting support request:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Back to App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -top-48 -right-48" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl bottom-0 left-0" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-4 mb-8">
          {logo && <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl" />}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-pink-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Contact Support</h1>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          <p className="text-gray-400 mb-6">
            Have a question, feedback, or need help? Send us a message and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition-colors"
              >
                <option value="" className="bg-gray-900">Select a topic...</option>
                <option value="General Question" className="bg-gray-900">General Question</option>
                <option value="Premium Subscription" className="bg-gray-900">Premium Subscription</option>
                <option value="Technical Issue" className="bg-gray-900">Technical Issue</option>
                <option value="Feature Request" className="bg-gray-900">Feature Request</option>
                <option value="Refund Request" className="bg-gray-900">Refund Request</option>
                <option value="Account Issue" className="bg-gray-900">Account Issue</option>
                <option value="Other" className="bg-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-gray-500 text-sm text-center mt-8">
          You can also email us directly at{' '}
          <a href="mailto:support@carnival-planner.com" className="text-pink-400 hover:underline">
            support@carnival-planner.com
          </a>
        </p>
      </div>
    </div>
  );
}

export function SupportAdmin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'support-requests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("SupportAdmin query failed:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this support request?')) {
      await deleteDoc(doc(db, 'support-requests', id));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">Failed to load support requests: {error}</p>
        <p className="text-sm text-gray-500 mt-2">This may require a Firestore index. Check the console.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Support Requests ({requests.length})
      </h3>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No support requests yet</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800 dark:text-white">{req.email}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{req.subject || 'General'}</span>
                </div>
                <button
                  onClick={() => handleDelete(req.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap">{req.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {req.createdAt?.toDate?.().toLocaleString() || 'Unknown date'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactPage;
