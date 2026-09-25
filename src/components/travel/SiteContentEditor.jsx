import React from 'react';
import { FileText, RefreshCw, CheckCircle2, History, HelpCircle, Plus, Trash2, Sparkles, Globe, Upload } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { resolveTravelImageUrl, getTravelImageFallback } from '../../utils/travelMedia';
import { MOY_AGENT_PROFILE } from './travelData';

export function SiteContentEditor({
  contentAutosaveStatus, contentSavedText, handleOpenRevisions, siteContentState, setContentAutosaveStatus, setContentSaveSuccess,
  currentUser, updateSiteContent, revisionsModalOpen, setRevisionsModalOpen, loadingRevisions, revisionsList, handleRestoreRevision,
  uploadingHeroBg, handleUploadContentPhoto
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Header & Status */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white font-heading uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00e5cc]" />
                  <span>Site Content & Bio Management</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Edit Moy's bio, manage FAQs, configure the philosophy manifesto, and upload photos. All changes autosave to the live site.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {contentAutosaveStatus === 'saving' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-lg">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Autosaving to cloud...</span>
                  </div>
                )}
                {contentAutosaveStatus === 'saved' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{contentSavedText || 'Cloud Autosaved'}</span>
                  </div>
                )}
                {contentAutosaveStatus === 'local_only' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold">
                    <span>Draft saved locally</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleOpenRevisions}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Version History</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      localStorage.setItem('mmw_site_content', JSON.stringify(siteContentState));
                      localStorage.setItem('mmw_site_content_draft', JSON.stringify(siteContentState));
                    } catch (e) {}
                    setContentAutosaveStatus('saved');
                    setContentSaveSuccess(true);
                    setTimeout(() => setContentSaveSuccess(false), 4000);

                    try {
                      await setDoc(doc(db, 'travelSiteContent', 'main'), siteContentState, { merge: true });
                      try {
                        const revId = 'rev_' + Date.now();
                        await setDoc(doc(db, 'travelSiteContent', 'main', 'revisions', revId), {
                          savedAt: new Date().toISOString(),
                          savedBy: currentUser?.email || 'Admin',
                          content: siteContentState
                        });
                      } catch (revErr) {}
                    } catch (err) {
                      console.warn('Cloud sync notice (saved locally):', err.message);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,204,0.3)]"
                >
                  Publish to Live Site
                </button>
              </div>
            </div>

            {/* Revisions History Modal */}
            {revisionsModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
                <div className="relative w-full max-w-xl bg-[#080c14] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-slate-100 max-h-[85vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-lg font-black text-white font-heading flex items-center gap-2">
                      <History className="w-5 h-5 text-[#00e5cc]" />
                      <span>Site Content Version History</span>
                    </h3>
                    <button onClick={() => setRevisionsModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center">✕</button>
                  </div>

                  {loadingRevisions ? (
                    <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#00e5cc]" />
                      <span>Loading historical snapshots...</span>
                    </div>
                  ) : revisionsList.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                      No revision snapshots recorded yet. Snapshots are created automatically when site content is published.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {revisionsList.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-bold text-white">
                              {new Date(rev.savedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Saved by: <span className="text-cyan-300 font-medium">{rev.savedBy || 'Admin'}</span>
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">
                              FAQs: {rev.content?.faqs?.length || 0} • Title: "{rev.content?.hero?.titleLine1 || 'Default'}"
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRestoreRevision(rev)}
                            className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shrink-0"
                          >
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {contentSaveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Site content, bio, and FAQs successfully published live to all visitors!</span>
              </div>
            )}

            {/* SECTION 1: ABOUT MOY & PROFILE */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#00e5cc]" />
                  <span>Meet Moy & Host Profile</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update Moy's title, verified credentials, direct contact links, and personal bio story.
                </p>
              </div>

              {/* Portrait Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Moy's Portrait Photo (Meet Moy & Host Badge)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-black shrink-0 shadow-lg">
                    <img
                      src={resolveTravelImageUrl(
                        siteContentState.aboutMoy?.photo || siteContentState.aboutMoy?.hostPhoto || MOY_AGENT_PROFILE.avatar,
                        { type: 'avatar' }
                      )}
                      alt="Moy Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const fallback = getTravelImageFallback({ type: 'avatar' });
                        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold transition-all flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingContentPhoto ? 'Uploading Photo...' : 'Upload New Portrait'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingContentPhoto}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadContentPhoto(file, 'avatar');
                            if (e.target) e.target.value = '';
                          }}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">Optimized instant web-safe upload</span>
                    </div>
                    <input
                      type="text"
                      value={siteContentState.aboutMoy?.photo || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateSiteContent(prev => ({
                          ...prev,
                          aboutMoy: { ...prev.aboutMoy, photo: val, hostPhoto: val }
                        }));
                      }}
                      placeholder="Or paste image URL directly..."
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.fullName || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, fullName: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.title || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, title: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.location || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, location: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Verified Badge Text</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.verifiedBadge || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, verifiedBadge: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Concierge Number</label>
                  <input
                    type="text"
                    value={siteContentState.aboutMoy?.whatsappNumber || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, whatsappNumber: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={siteContentState.aboutMoy?.email || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        aboutMoy: { ...prev.aboutMoy, email: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Moy's Personal Bio Story (Multi-Paragraph with Emojis)
                </label>
                <textarea
                  rows={8}
                  value={siteContentState.aboutMoy?.bio || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      aboutMoy: { ...prev.aboutMoy, bio: val }
                    }));
                  }}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none font-sans"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Line breaks and paragraphs will be preserved and rendered cleanly on the live "Meet Moy" section.
                </p>
              </div>
            </div>

            {/* SECTION 2: FREQUENTLY ASKED QUESTIONS (FAQS) */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#00e5cc]" />
                    <span>Frequently Asked Questions ({siteContentState.faqs?.length || 0})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage the questions and answers displayed in the live accordion FAQ.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateSiteContent(prev => ({
                      ...prev,
                      faqs: [
                        ...(prev.faqs || []),
                        { q: 'New Question Title?', a: 'Write the answer to this question here.' }
                      ]
                    }));
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {(siteContentState.faqs || []).map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-1">
                          Question #{index + 1}
                        </label>
                        <input
                          type="text"
                          value={faq.q || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSiteContent(prev => {
                              const newFaqs = [...(prev.faqs || [])];
                              newFaqs[index] = { ...newFaqs[index], q: val };
                              return { ...prev, faqs: newFaqs };
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-bold focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete FAQ: "${faq.q}"?`)) {
                            updateSiteContent(prev => ({
                              ...prev,
                              faqs: prev.faqs.filter((_, i) => i !== index)
                            }));
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors mt-5"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Answer
                      </label>
                      <textarea
                        rows={3}
                        value={faq.a || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSiteContent(prev => {
                            const newFaqs = [...(prev.faqs || [])];
                            newFaqs[index] = { ...newFaqs[index], a: val };
                            return { ...prev, faqs: newFaqs };
                          });
                        }}
                        className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-slate-200 text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: THE VIBE / PHILOSOPHY & MANIFESTO */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00e5cc]" />
                  <span>The Vibe / Philosophy & Manifesto</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The brand manifesto lines and soul summary on the main homepage.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Philosophy Header Title</label>
                <input
                  type="text"
                  value={siteContentState.manifesto?.title || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, title: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Manifesto Lines (One statement per line)
                </label>
                <textarea
                  rows={6}
                  value={(siteContentState.manifesto?.lines || []).join('\n')}
                  onChange={(e) => {
                    const val = e.target.value;
                    const lines = val.split('\n');
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, lines }
                    }));
                  }}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed font-mono focus:border-[#00e5cc] focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Each line appears as an elegant phrase in the centered "Travel with Soul" manifesto.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Manifesto Summary Statement</label>
                <textarea
                  rows={3}
                  value={siteContentState.manifesto?.summary || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      manifesto: { ...prev.manifesto, summary: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs leading-relaxed focus:border-[#00e5cc] focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 4: HERO BANNER & HEADINGS */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-black text-white uppercase font-heading flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#00e5cc]" />
                  <span>Hero Banner & Destinations Pill</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title Line 1</label>
                  <input
                    type="text"
                    value={siteContentState.hero?.titleLine1 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine1: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title Line 2</label>
                  <input
                    type="text"
                    value={siteContentState.hero?.titleLine2 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSiteContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine2: val }
                      }));
                    }}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={siteContentState.hero?.tagline || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, tagline: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Destinations Pill</label>
                <input
                  type="text"
                  value={siteContentState.hero?.destinationsPill || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateSiteContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, destinationsPill: val }
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                />
              </div>

              {/* Hero Background Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Hero Background Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-20 rounded-xl overflow-hidden border border-cyan-400/40 bg-black shrink-0">
                    <img
                      src={resolveTravelImageUrl(
                        siteContentState.hero?.backgroundImage || siteContentState.aboutMoy?.lifestylePhoto || MOY_AGENT_PROFILE.lifestylePhoto,
                        { type: 'lifestyle', isHero: true }
                      )}
                      alt="Hero Bg"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const fallback = getTravelImageFallback({ type: 'lifestyle', isHero: true });
                        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/40 text-[#00e5cc] text-xs font-bold transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingHeroBg ? 'Uploading...' : 'Upload Background Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingHeroBg}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadContentPhoto(file, 'heroBg');
                          if (e.target) e.target.value = '';
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={siteContentState.hero?.backgroundImage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateSiteContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, backgroundImage: val }
                        }));
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={async () => {
                  try {
                    localStorage.setItem('mmw_site_content', JSON.stringify(siteContentState));
                    localStorage.setItem('mmw_site_content_draft', JSON.stringify(siteContentState));
                  } catch (e) {}
                  setContentAutosaveStatus('saved');
                  setContentSaveSuccess(true);
                  setTimeout(() => setContentSaveSuccess(false), 4000);

                  try {
                    await setDoc(doc(db, 'travelSiteContent', 'main'), siteContentState, { merge: true });
                  } catch (err) {
                    console.warn('Cloud sync notice (saved locally):', err.message);
                  }
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,229,204,0.4)] transition-all"
              >
                Publish All Changes to Live Site
              </button>
            </div>

          </div>
  );
}
