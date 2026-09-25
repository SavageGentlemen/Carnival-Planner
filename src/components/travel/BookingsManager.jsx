import React from 'react';
import { Search, MessageCircle } from 'lucide-react';

export function BookingsManager({ 
  searchQuery, setSearchQuery, filteredBookings, handleUpdateStatus 
}) {
  return (
    <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ref, email or destination..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-[#00e5cc] focus:outline-none"
              />
            </div>

            {/* Bookings Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border-cyan-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-black tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Ref #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Room & Guests</th>
                      <th className="p-4">Band Section</th>
                      <th className="p-4">Deposit</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200 font-medium">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No bookings found matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-cyan-950/20 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#00e5cc]">
                            {b.bookingRef}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-[11px] text-slate-400">{b.customerEmail}</div>
                            <div className="text-[10px] text-cyan-300 font-mono">{b.customerPhone}</div>
                          </td>
                          <td className="p-4 font-semibold text-white">
                            {b.packageTitle}
                          </td>
                          <td className="p-4">
                            <div>{b.roomType}</div>
                            <div className="text-[10px] text-slate-400">{b.guestCount} Guest(s)</div>
                          </td>
                          <td className="p-4 text-slate-300 text-[11px]">
                            {b.masqueradeSection || '—'}
                          </td>
                          <td className="p-4 font-bold text-emerald-400">
                            ${b.depositAmount} USD
                          </td>
                          <td className="p-4 uppercase text-[10px] font-bold text-cyan-200">
                            {b.paymentMethod}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {b.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.customerName)},%20Moy%20here%20from%20Moy%20Meets%20World%20regarding%20your%20${encodeURIComponent(b.packageTitle)}%20booking%20(${b.bookingRef})!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              <button
                                onClick={() => handleUpdateStatus(b.id, b.status === 'confirmed' ? 'pending_payment' : 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-white border border-white/20 transition-all"
                              >
                                {b.status === 'confirmed' ? 'Mark Pending' : 'Mark Paid'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
  );
}
