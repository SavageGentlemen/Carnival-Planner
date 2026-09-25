import React from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, AlertTriangle, Sparkles, Building2, FileText, DollarSign, Plus, Trash2, Image as ImageIcon, Upload, Globe } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { resolveTravelImageUrl, getTravelImageFallback } from '../../utils/travelMedia';
import { DashboardErrorBoundary } from './DashboardErrorBoundary';

export function PackageEditor({ 
  editingPkg, setEditingPkg, autosaveStatus, lastSavedText, isSavingPkg, restoredFromDraft, setRestoredFromDraft,
  handleSavePackage, updateEditingPkg, handleSyncAccommodationPrices, handleAddAccommodationTier, handleInitDefaultAccommodations,
  handleRemoveAccommodationTier, handleUpdateAccommodationTier, uploadSuccessField, uploadingField, handleUploadPhoto,
  handleOpenEdit, packagesList, setPackagesList, currentUser 
}) {
  return (
    editingPkg ? (
            /* DEDICATED IN-PAGE PACKAGE EDITOR (NO OVERLAY / NO BLANK SCREEN) */
            <DashboardErrorBoundary fallbackTitle="Trip Package Editor" onReset={() => setEditingPkg(null)}>
              <div className="space-y-6 animate-fadeIn pb-16">
                
                {/* Header & Breadcrumb Bar */}
                <div className="glass-panel p-5 sm:p-6 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/20 text-slate-300 hover:text-white hover:border-[#00e5cc] transition-all flex items-center gap-2 text-xs font-bold shrink-0 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#00e5cc]" />
                      <span>Back to Packages</span>
                    </button>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-400/30">
                          {editingPkg.country || 'Destination'}
                        </span>
                        
                        {/* Autosave Status Indicator Badge */}
                        {autosaveStatus === 'saving' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-bold text-cyan-300 animate-pulse">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Autosaving changes...</span>
                          </div>
                        )}
                        {autosaveStatus === 'saved' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] font-bold text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{lastSavedText || 'Autosaved to cloud'}</span>
                          </div>
                        )}
                        {autosaveStatus === 'local_only' && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-[10px] font-bold text-amber-300">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{lastSavedText || 'Autosaved locally in browser'}</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                        {editingPkg.id?.startsWith('custom-pkg-') && (!editingPkg.title || editingPkg.title === 'New Trip Experience')
                          ? '✨ Create New Travel Package'
                          : `Edit Package: ${editingPkg.title || 'Untitled Trip'}`}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-300 hover:text-white text-xs font-bold transition-all"
                    >
                      Cancel & Return
                    </button>
                    <button
                      type="button"
                      onClick={handleSavePackage}
                      disabled={isSavingPkg}
                      className="px-6 py-2.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,229,204,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSavingPkg && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>{isSavingPkg ? 'Saving...' : 'Save & Publish'}</span>
                    </button>
                  </div>
                </div>

                {restoredFromDraft && (
                  <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-200 text-xs font-medium flex items-center justify-between">
                    <span>💡 Restored your latest auto-saved draft from this device.</span>
                    <button type="button" onClick={() => setRestoredFromDraft(false)} className="text-cyan-400 hover:text-white font-bold">✕</button>
                  </div>
                )}

                {/* Form Body */}
                <form onSubmit={handleSavePackage} className="space-y-6">
                  
                  {/* Card 1: Core Trip Details */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00e5cc]" />
                      <span>1. Core Package Identity & Timing</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Package Title <span className="text-rose-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={editingPkg.title || ''}
                          onChange={(e) => updateEditingPkg({ title: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St Lucia Carnival 2027"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Country / Island</label>
                        <input
                          type="text"
                          value={editingPkg.country || ''}
                          onChange={(e) => updateEditingPkg({ country: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St. Lucia, Caribbean"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Subtitle / Headline</label>
                        <input
                          type="text"
                          value={editingPkg.subtitle || ''}
                          onChange={(e) => updateEditingPkg({ subtitle: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. The Sweetest Summer Festival"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Experience Badge</label>
                        <input
                          type="text"
                          value={editingPkg.badge || ''}
                          onChange={(e) => updateEditingPkg({ badge: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. Flagship Experience, New Experience, Limited Spots"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Dates Display <span className="text-rose-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={editingPkg.dates || ''}
                          onChange={(e) => updateEditingPkg({ dates: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. July 16th - July 23rd, 2027"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Duration</label>
                        <input
                          type="text"
                          value={editingPkg.duration || ''}
                          onChange={(e) => updateEditingPkg({ duration: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. 7 Days, 10 Days"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Package Status</label>
                        <select
                          value={editingPkg.status || 'Booking Open'}
                          onChange={(e) => updateEditingPkg({ status: e.target.value })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        >
                          <option value="Booking Open">Booking Open</option>
                          <option value="Limited Spots">Limited Spots</option>
                          <option value="Waitlist Open">Waitlist Open</option>
                          <option value="Sold Out">Sold Out</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Spots Remaining</label>
                        <input
                          type="number"
                          value={editingPkg.spotsRemaining ?? 10}
                          onChange={(e) => updateEditingPkg({ spotsRemaining: Number(e.target.value) })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Total Capacity</label>
                        <input
                          type="number"
                          value={editingPkg.spotsTotal ?? 10}
                          onChange={(e) => updateEditingPkg({ spotsTotal: Number(e.target.value) })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Location, Hotel & On-Ground Concierge */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#00e5cc]" />
                      <span>2. Concierge, Location & Hotel</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Location Label</label>
                        <input
                          type="text"
                          value={editingPkg.location || ''}
                          onChange={(e) => updateEditingPkg({ 
                            location: e.target.value,
                            whenWhere: { ...(editingPkg.whenWhere || {}), location: e.target.value }
                          })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. St. Lucia, Caribbean"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">Hotel / Resort Type</label>
                        <input
                          type="text"
                          value={editingPkg.whenWhere?.hotel || ''}
                          onChange={(e) => updateEditingPkg({ 
                            whenWhere: { ...(editingPkg.whenWhere || {}), hotel: e.target.value }
                          })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          placeholder="e.g. Luxury Beachfront Resort / Private Villas"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Concierge & Ground Safety Note</label>
                      <input
                        type="text"
                        value={editingPkg.whenWhere?.securityNote || ''}
                        onChange={(e) => updateEditingPkg({ 
                          whenWhere: { ...(editingPkg.whenWhere || {}), securityNote: e.target.value }
                        })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        placeholder="e.g. 24/7 On-Ground Host & Concierge"
                      />
                    </div>
                  </div>

                  {/* Card 3: Story & Copywriting */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00e5cc]" />
                      <span>3. Story & Copywriting</span>
                    </h4>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Tagline Summary (Card Teaser)</label>
                      <textarea
                        rows={2}
                        value={editingPkg.tagline || ''}
                        onChange={(e) => updateEditingPkg({ tagline: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                        placeholder="Short punchy summary displayed on package cards..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 text-xs mb-1">Full Trip Overview / Story</label>
                      <textarea
                        rows={4}
                        value={editingPkg.overview || ''}
                        onChange={(e) => updateEditingPkg({ overview: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                        placeholder="Detailed itinerary overview and description of the cultural experience..."
                      />
                    </div>
                  </div>

                  {/* Card 4: Pricing & Deposit */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#00e5cc]" />
                      <span>4. Pricing & Deposit Configuration</span>
                    </h4>

                    <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-xs block">Custom Quote Mode ("Price on Request")</span>
                        <span className="text-[11px] text-slate-400">
                          When enabled, displays "Price on Request" instead of fixed pricing numbers.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={editingPkg.customQuoteOnly || false}
                        onChange={(e) => updateEditingPkg({ customQuoteOnly: e.target.checked })}
                        className="w-5 h-5 accent-[#00e5cc] rounded cursor-pointer"
                      />
                    </div>

                    {!editingPkg.customQuoteOnly && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Double Occupancy ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.doubleOccupancy || ''}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, doubleOccupancy: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Single Suite ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.singleOccupancy || ''}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, singleOccupancy: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-300 text-xs mb-1">Hold Deposit ($ USD)</label>
                            <input
                              type="number"
                              value={editingPkg.pricing?.deposit || 500}
                              onChange={(e) => updateEditingPkg({
                                pricing: { ...editingPkg.pricing, deposit: Number(e.target.value) }
                              })}
                              className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-300 text-xs mb-1">Payment Schedule & Terms Note</label>
                          <input
                            type="text"
                            value={editingPkg.pricing?.paymentSchedule || ''}
                            onChange={(e) => updateEditingPkg({
                              pricing: { ...editingPkg.pricing, paymentSchedule: e.target.value }
                            })}
                            placeholder="e.g. Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection."
                            className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 5: Room Tiers & Luxury Accommodations */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#00e5cc]" />
                          <span>5. Room Tiers & Luxury Accommodations</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Configure the accommodation options guests select during booking and on the detail view.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={handleSyncAccommodationPrices}
                          className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          title="Update Single and Double room price labels to match your pricing numbers above"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Sync Prices</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddAccommodationTier}
                          className="px-3 py-1.5 rounded-xl bg-[#00e5cc] hover:bg-[#24f6df] text-black text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Tier</span>
                        </button>
                      </div>
                    </div>

                    {(!editingPkg.accommodations || editingPkg.accommodations.length === 0) ? (
                      <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 text-center space-y-3">
                        <p className="text-xs text-slate-400">No custom accommodation tiers defined yet for this trip.</p>
                        <button
                          type="button"
                          onClick={handleInitDefaultAccommodations}
                          className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition-colors"
                        >
                          + Generate Standard Room Tiers (Single Suite & Double Room)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {editingPkg.accommodations.map((acc, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                                Tier #{idx + 1}: {acc.type || 'Untitled Option'}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveAccommodationTier(idx)}
                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 transition-colors"
                                title="Remove this room tier"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Room Type Title</label>
                                <input
                                  type="text"
                                  value={acc.type || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'type', e.target.value)}
                                  placeholder="e.g. Single Luxury Suite"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Price Label</label>
                                <input
                                  type="text"
                                  value={acc.price || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'price', e.target.value)}
                                  placeholder="e.g. $3,500 USD or Custom Quote on Request"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Bed / Occupancy Detail</label>
                                <input
                                  type="text"
                                  value={acc.occupancy || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'occupancy', e.target.value)}
                                  placeholder="e.g. Single (1 King Bed) or Double Occupancy (2 Guests)"
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-slate-400 mb-1">Room Amenities & Description</label>
                                <textarea
                                  rows={2}
                                  value={acc.description || ''}
                                  onChange={(e) => handleUpdateAccommodationTier(idx, 'description', e.target.value)}
                                  placeholder="Private oceanfront suite with ensuite bathroom, balcony, high-speed WiFi..."
                                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-[#00e5cc] focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card 6: Inclusions & Exclusions */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                      <span>6. Inclusions & Exclusions</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">What's Included (1 item per line)</label>
                        <textarea
                          rows={6}
                          value={Array.isArray(editingPkg.included) ? editingPkg.included.join('\n') : (editingPkg.included || '')}
                          onChange={(e) => updateEditingPkg({ included: e.target.value.split('\n') })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                          placeholder="e.g.&#10;Round Trip Flights from Trinidad&#10;Accommodations (Breakfast Inclusive)&#10;Carnival Costume Package&#10;Ground Transportation"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 text-xs mb-1">What's Not Included (1 item per line)</label>
                        <textarea
                          rows={6}
                          value={Array.isArray(editingPkg.notIncluded) ? editingPkg.notIncluded.join('\n') : (editingPkg.notIncluded || '')}
                          onChange={(e) => updateEditingPkg({ notIncluded: e.target.value.split('\n') })}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white font-mono text-xs focus:border-[#00e5cc] focus:outline-none leading-relaxed"
                          placeholder="e.g.&#10;Personal spending & tips&#10;Meals outside of breakfast&#10;Optional private catamaran tour"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 7: Media & Imagery */}
                  <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
                    <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00e5cc]" />
                      <span>7. Package Imagery & Banners</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Hero Image */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-300 text-xs">Hero Image (Banner & Detail View)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingPkg.heroImage || ''}
                            onChange={(e) => updateEditingPkg({ heroImage: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                            placeholder="Image URL or upload from device..."
                          />
                          <label className={`cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm ${
                            uploadSuccessField === 'heroImage' 
                              ? 'bg-emerald-950 border border-emerald-400 text-emerald-300' 
                              : 'bg-cyan-950 border border-cyan-400/40 hover:bg-cyan-900 text-cyan-300'
                          }`}>
                            {uploadingField === 'heroImage' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : uploadSuccessField === 'heroImage' ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>
                              {uploadingField === 'heroImage' 
                                ? 'Uploading...' 
                                : uploadSuccessField === 'heroImage' 
                                  ? '✓ Updated' 
                                  : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={Boolean(uploadingField)}
                              onChange={(e) => handleUploadPhoto(e, 'heroImage')}
                            />
                          </label>
                        </div>
                        {editingPkg.heroImage && (
                          <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                            <img 
                              src={resolveTravelImageUrl(editingPkg.heroImage, { country: editingPkg.country, title: editingPkg.title, isHero: true })} 
                              alt="Hero Preview" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: editingPkg.country, title: editingPkg.title, isHero: true });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                            <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-1 rounded-lg text-slate-300 font-bold border border-white/10">
                              Hero Banner Preview
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Thumbnail */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-300 text-xs">Card Image (Catalog Grid Thumbnail)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingPkg.cardImage || ''}
                            onChange={(e) => updateEditingPkg({ cardImage: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-mono focus:border-[#00e5cc] focus:outline-none"
                            placeholder="Image URL or upload from device..."
                          />
                          <label className={`cursor-pointer px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm ${
                            uploadSuccessField === 'cardImage' 
                              ? 'bg-emerald-950 border border-emerald-400 text-emerald-300' 
                              : 'bg-cyan-950 border border-cyan-400/40 hover:bg-cyan-900 text-cyan-300'
                          }`}>
                            {uploadingField === 'cardImage' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : uploadSuccessField === 'cardImage' ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00e5cc]" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <span>
                              {uploadingField === 'cardImage' 
                                ? 'Uploading...' 
                                : uploadSuccessField === 'cardImage' 
                                  ? '✓ Updated' 
                                  : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={Boolean(uploadingField)}
                              onChange={(e) => handleUploadPhoto(e, 'cardImage')}
                            />
                          </label>
                        </div>
                        {editingPkg.cardImage && (
                          <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-inner">
                            <img 
                              src={resolveTravelImageUrl(editingPkg.cardImage, { country: editingPkg.country, title: editingPkg.title, isHero: false })} 
                              alt="Card Preview" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: editingPkg.country, title: editingPkg.title, isHero: false });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                            <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-1 rounded-lg text-slate-300 font-bold border border-white/10">
                              Card Thumbnail Preview
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="glass-panel p-5 sm:p-6 rounded-3xl border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {editingPkg.id && !editingPkg.id.startsWith('custom-pkg-') ? (
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to permanently delete "${editingPkg.title}"? This cannot be undone.`)) {
                            try {
                              await deleteDoc(doc(db, 'travelPackages', editingPkg.id));
                            } catch (err) {
                              console.warn('Firestore delete notice:', err.message);
                            }
                            const updated = packagesList.filter(p => p.id !== editingPkg.id);
                            setPackagesList(updated);
                            try {
                              localStorage.setItem('mmw_packages_custom', JSON.stringify(updated));
                              localStorage.removeItem(`mmw_draft_${editingPkg.id}`);
                            } catch (e) {}
                            setEditingPkg(null);
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-900 transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Package</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingPkg(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 text-xs font-bold hover:text-white"
                      >
                        Discard New Package
                      </button>
                    )}

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingPkg(null)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-slate-300 hover:text-white text-xs font-bold"
                      >
                        Cancel & Return
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingPkg}
                        className="px-8 py-2.5 rounded-xl bg-[#00e5cc] text-black font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,204,0.4)] hover:bg-[#24f6df] transition-all disabled:opacity-50 flex items-center gap-2 text-xs"
                      >
                        {isSavingPkg && <RefreshCw className="w-4 h-4 animate-spin" />}
                        <span>{isSavingPkg ? 'Saving...' : 'Save & Publish Package'}</span>
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </DashboardErrorBoundary>
          ) : (
            /* ACTIVE PACKAGES CATALOG GRID VIEW */
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-white font-heading">Active Destinations & Packages</h3>
                  <p className="text-xs text-slate-400">Edit prices, dates, spots remaining, room tiers, or add new bespoke experiences.</p>
                </div>
                <button
                  onClick={() => {
                    const newPkg = {
                      id: `custom-pkg-${Date.now()}`,
                      title: 'New Trip Experience',
                      subtitle: 'Curated Cultural Escape',
                      badge: 'New Experience',
                      country: 'St. Lucia',
                      dates: 'Summer 2027',
                      duration: '7 Days',
                      location: 'St. Lucia, Caribbean',
                      spotsTotal: 10,
                      spotsRemaining: 10,
                      status: 'Booking Open',
                      customQuoteOnly: false,
                      pricing: {
                        deposit: 500,
                        doubleOccupancy: 2500,
                        singleOccupancy: 3500,
                        currency: 'USD',
                        paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
                      },
                      whenWhere: {
                        dates: 'Summer 2027',
                        location: 'St. Lucia, Caribbean',
                        hotel: 'Hotels / Luxury Resorts',
                        securityNote: '24/7 On-Ground Host & Concierge'
                      },
                      accommodations: [
                        {
                          type: 'Single Luxury Suite',
                          price: '$3,500 USD',
                          occupancy: 'Single (1 King Bed)',
                          description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
                        },
                        {
                          type: 'Shared Double Room',
                          price: '$2,500 USD / person',
                          occupancy: 'Shared (2 Queen Beds or King for Couples)',
                          description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
                        }
                      ],
                      tagline: 'Custom curated carnival journey.',
                      overview: 'Experience this stunning cultural celebration with full concierge guidance and unforgettable vibes.',
                      cardImage: '/images/travel/stlucia_card.jpeg',
                      heroImage: '/images/travel/stlucia_hero.jpeg',
                      included: [
                        'Round Trip Flights from Trinidad',
                        'Accommodations (Breakfast Inclusive)',
                        'Carnival Costume Package',
                        'Ground Transportation',
                        'Signature Events Access',
                        'Carnival Survival Kit'
                      ],
                      notIncluded: [
                        'Discretionary personal spending, tips & optional private excursions',
                        'Meals outside of breakfast or all-inclusive events'
                      ],
                      accentColor: '#00e5cc'
                    };
                    handleOpenEdit(newPkg);
                  }}
                  className="px-5 py-2.5 bg-[#00e5cc] hover:bg-[#24f6df] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,204,0.3)] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Package</span>
                </button>
              </div>

              {packagesList.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-3xl border-dashed border-cyan-500/30 space-y-4">
                  <Globe className="w-12 h-12 text-cyan-400 mx-auto opacity-50" />
                  <h4 className="text-base font-bold text-white">No Travel Packages Found</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Start creating your first curated travel package to showcase destinations, accommodations, and pricing.
                  </p>
                  <button
                    onClick={() => {
                      const newPkg = {
                        id: `custom-pkg-${Date.now()}`,
                        title: 'New Trip Experience',
                        subtitle: 'Curated Cultural Escape',
                        badge: 'New Experience',
                        country: 'St. Lucia',
                        dates: 'Summer 2027',
                        duration: '7 Days',
                        location: 'St. Lucia, Caribbean',
                        spotsTotal: 10,
                        spotsRemaining: 10,
                        status: 'Booking Open',
                        customQuoteOnly: false,
                        pricing: {
                          deposit: 500,
                          doubleOccupancy: 2500,
                          singleOccupancy: 3500,
                          currency: 'USD',
                          paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
                        },
                        whenWhere: {
                          dates: 'Summer 2027',
                          location: 'St. Lucia, Caribbean',
                          hotel: 'Hotels / Luxury Resorts',
                          securityNote: '24/7 On-Ground Host & Concierge'
                        },
                        accommodations: [
                          {
                            type: 'Single Luxury Suite',
                            price: '$3,500 USD',
                            occupancy: 'Single (1 King Bed)',
                            description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
                          },
                          {
                            type: 'Shared Double Room',
                            price: '$2,500 USD / person',
                            occupancy: 'Shared (2 Queen Beds or King for Couples)',
                            description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
                          }
                        ],
                        tagline: 'Custom curated carnival journey.',
                        overview: 'Experience this stunning cultural celebration with full concierge guidance and unforgettable vibes.',
                        cardImage: '/images/travel/stlucia_card.jpeg',
                        heroImage: '/images/travel/stlucia_hero.jpeg',
                        included: [
                          'Round Trip Flights from Trinidad',
                          'Accommodations (Breakfast Inclusive)',
                          'Carnival Costume Package',
                          'Ground Transportation',
                          'Signature Events Access',
                          'Carnival Survival Kit'
                        ],
                        notIncluded: [
                          'Discretionary personal spending, tips & optional private excursions',
                          'Meals outside of breakfast or all-inclusive events'
                        ],
                        accentColor: '#00e5cc'
                      };
                      handleOpenEdit(newPkg);
                    }}
                    className="px-5 py-2.5 bg-[#00e5cc] text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
                  >
                    + Create First Package
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packagesList.map((pkg) => (
                    <div key={pkg.id} className="glass-panel p-6 rounded-3xl border-cyan-500/20 flex flex-col justify-between hover:border-cyan-500/40 transition-all group">
                      <div>
                        {pkg.cardImage && (
                          <div className="h-44 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-black/40">
                            <img 
                              src={resolveTravelImageUrl(pkg.cardImage, { country: pkg.country, title: pkg.title, isHero: false })} 
                              alt={pkg.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              onError={(e) => {
                                const fallback = getTravelImageFallback({ country: pkg.country, title: pkg.title, isHero: false });
                                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                              }}
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold uppercase border border-cyan-400/30">
                            {pkg.country || 'Destination'}
                          </span>
                          <span className={`text-xs font-bold ${pkg.spotsRemaining > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {pkg.spotsRemaining} / {pkg.spotsTotal || 10} spots left
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-white font-heading mb-1">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-cyan-300 font-semibold mb-3">
                          {pkg.dates} {pkg.duration ? `• ${pkg.duration}` : ''}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4 line-clamp-3">
                          {pkg.tagline || pkg.overview}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Pricing:</span>
                          <span className="font-bold text-white">
                            {pkg.customQuoteOnly ? 'Custom Quote' : (pkg.pricing?.doubleOccupancy ? `$${Number(pkg.pricing.doubleOccupancy).toLocaleString()} USD` : 'Contact Moy')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shadow-sm"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
  );
}
