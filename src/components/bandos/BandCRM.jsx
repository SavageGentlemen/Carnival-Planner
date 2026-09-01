import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Bell, 
  Loader2, 
  Filter, 
  Download, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Crown, 
  Tag, 
  X,
  FileSpreadsheet,
  Shirt
} from 'lucide-react';
import { bandOSService } from '../../services/bandOSService';
import { supabase } from '../../supabaseClient';
import Papa from 'papaparse';

// Sample exports for 1-click test import
const SAMPLE_ROSTER_CSV = `Order Ref,Masquerader Name,Email,Mobile Phone,Section Title,Bra Size,Belt Size,Bottom Option,Feather Backpack,Deposit Paid,Total Balance,Section Leader
PM-9901,Aaliyah Robinson,aaliyah.r@example.com,8685550192,Frontline Feathers — Solstice,34C,30",Thong,Large Wireframe,400.00,1250.00,jordan
PM-9902,Marcus Vance,marcus.v@example.com,447700900123,Backline Masquerader — Eclipse,36D,34",Full Coverage,Standard Collar,250.00,750.00,kendra
PM-9903,Jade Alexander,jade.alexander@example.com,13055550188,Frontline Feathers — Solstice,32B,26",Cheeky,Large Wireframe,400.00,1250.00,jordan
PM-9904,Chloe Dubois,chloe.d@example.com,14155550144,Backline Masquerader — Eclipse,34B,28",High Waist,Standard Collar,250.00,750.00,marcus
PM-9905,Elena Rostova,elena.r@example.com,12125550133,Frontline Feathers — Solstice,36C,32",Thong,Large Wireframe,400.00,1250.00,jordan`;

const SAMPLE_COSTUME_CSV = `Name,Email,Phone,Lineitem name,Lineitem price,Lineitem quantity,Variant Bra,Variant Bottoms,Customer Tags
#1001,Samantha Wright,samantha.w@example.com,17025550991,Frontline Feathers — Solstice,1250.00,1,34D,Cheeky,VIP_Spender
#1002,Liam Gallagher,liam.g@example.com,447911123456,Backline Masquerader — Eclipse,750.00,1,32A,Full,Loyal_2025
#1003,Zara Hadid,zara.h@example.com,16465550338,Frontline Feathers — Solstice,1250.00,1,36B,Thong,VIP_Spender`;

function normalizeCarnivalPhone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.length === 10) return '+1 (' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  if (digits.length === 11 && digits.startsWith('1')) return '+1 (' + digits.slice(1, 4) + ') ' + digits.slice(4, 7) + '-' + digits.slice(7);
  if (digits.length > 7) return '+' + digits;
  return rawPhone.trim();
}

export default function BandCRM({ bandId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [repFilter, setRepFilter] = useState('ALL');
  const [vipFilter, setVipFilter] = useState(false);
  
  // Migration Modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importCsvText, setImportCsvText] = useState('');
  const [parsedPreview, setParsedPreview] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  // Broadcast modal state
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchRoster();
  }, [bandId]);

  const fetchRoster = async () => {
    try {
      const data = await bandOSService.getBandOrders(bandId);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sectionsList = [...new Set(orders.map(o => o.band_costume_sections?.title || o.listingTitle).filter(Boolean))];
  const repsList = [...new Set(orders.map(o => o.referred_by || o.rep_code || o.section_leader).filter(Boolean))];

  const filteredOrders = orders.filter(o => {
    const name = o.buyer_name || o.buyerName || '';
    const email = o.buyer_email || o.buyerEmail || '';
    const phone = o.buyer_phone || o.phone || '';
    const section = o.band_costume_sections?.title || o.listingTitle || '';
    const rep = o.referred_by || o.rep_code || o.section_leader || '';

    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      section.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (sectionFilter !== 'ALL' && section !== sectionFilter) return false;
    if (repFilter !== 'ALL' && rep !== repFilter) return false;
    if (vipFilter && (o.amount_paid < 350 && !o.is_vip)) return false;

    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredOrders.map(o => o.id)));
    }
  };

  const toggleSelect = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  // CSV Migration Parsing
  const handleParseMigrationCSV = (csvString, platformName = 'AUTO') => {
    if (!csvString || !csvString.trim()) {
      setParsedPreview(null);
      return;
    }

    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        if (!rows || rows.length === 0) return;

        const normalized = rows.map((row, idx) => {
          const name = row['Masquerader Name'] || row['Name'] || row['Buyer Name'] || row['Full Name'] || row['name'] || 'Masquerader';
          const email = row['Email'] || row['Buyer Email'] || row['email'] || '';
          const rawPhone = row['Mobile Phone'] || row['Phone'] || row['Phone Number'] || row['phone'] || '';
          const cleanPhone = normalizeCarnivalPhone(rawPhone);
          const section = row['Section Title'] || row['Section'] || row['Lineitem name'] || row['Costume'] || 'Costume Section';
          const braSize = row['Bra Size'] || row['Variant Bra'] || row['Bra'] || '';
          const beltSize = row['Belt Size'] || row['Belt'] || row['Waist'] || '';
          const bottom = row['Bottom Option'] || row['Variant Bottoms'] || row['Bottom'] || '';
          const backpack = row['Feather Backpack'] || row['Backpack'] || row['Feathers'] || '';
          const deposit = parseFloat(row['Deposit Paid'] || row['Lineitem price'] || row['Amount Paid'] || 0);
          const rep = row['Section Leader'] || row['Referred By'] || row['Rep Code'] || '';
          const isVip = deposit >= 400 || (row['Customer Tags'] || '').includes('VIP');

          return {
            id: 'imp_' + Date.now() + '_' + idx,
            buyer_name: name,
            buyer_email: email,
            buyer_phone: cleanPhone || rawPhone,
            listingTitle: section,
            band_costume_sections: { title: section },
            amount_paid: deposit,
            total_amount: deposit * 2 || 1000,
            distribution_status: 'Pending',
            is_vip: isVip,
            referred_by: rep,
            selected_variants: {
              bra_size: braSize,
              belt_size: beltSize,
              bottom_option: bottom,
              feather_upgrade: backpack
            }
          };
        });

        setParsedPreview({
          platform: platformName,
          records: normalized,
          validPhones: normalized.filter(r => r.buyer_phone && r.buyer_phone.length >= 10).length,
          vips: normalized.filter(r => r.is_vip).length
        });
      }
    });
  };

  const handleCommitMigration = async () => {
    if (!parsedPreview?.records?.length) return;
    setIsImporting(true);

    try {
      await bandOSService.bulkImportOrders(parsedPreview.records);
      setOrders([...parsedPreview.records, ...orders]);
      setShowImportModal(false);
      setParsedPreview(null);
      setImportCsvText('');
      alert('Successfully imported ' + parsedPreview.records.length + ' masqueraders into Band CRM!');
    } catch (err) {
      console.error(err);
      alert('Failed to import: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleExportCSV = () => {
    const dataToExport = selectedIds.size > 0 
      ? orders.filter(o => selectedIds.has(o.id))
      : filteredOrders;

    if (dataToExport.length === 0) return alert("No data to export.");

    const csvData = dataToExport.map(o => ({
      'Order ID': o.id,
      'Name': o.buyer_name || o.buyerName,
      'Email': o.buyer_email || o.buyerEmail,
      'Phone': o.buyer_phone || o.phone || '',
      'Section': o.band_costume_sections?.title || o.listingTitle || '',
      'Status': o.distribution_status || 'Pending',
      'Deposit Paid': o.amount_paid || 0,
      'Section Leader': o.referred_by || o.rep_code || '',
      'Bra Size': o.selected_variants?.bra_size || '',
      'Belt Size': o.selected_variants?.belt_size || '',
      'Bottom': o.selected_variants?.bottom_option || '',
      'Feathers': o.selected_variants?.feather_upgrade || ''
    }));

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BandOS_Carnival_Roster_Export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleDistributionStatus = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'Distributed' ? 'Pending' : 'Distributed';
    // Optimistic UI update
    setOrders(orders.map(o => o.id === orderId ? { ...o, distribution_status: nextStatus } : o));
    try {
      await bandOSService.updateOrderStatus(orderId, {
        distribution_status: nextStatus,
        distributed_at: nextStatus === 'Distributed' ? new Date().toISOString() : null
      });
    } catch (err) {
      console.error('Failed to update distribution status:', err);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (selectedIds.size === 0) return alert("Select at least one masquerader");
    
    setSending(true);
    try {
      const targetUserIds = orders
        .filter(o => selectedIds.has(o.id) && o.buyer_id)
        .map(o => o.buyer_id);

      if (supabase) {
        await supabase.functions.invoke('bandos-broadcast', {
          body: { bandId, userIds: targetUserIds, message }
        });
      }
      
      alert('Broadcast dispatched to ' + selectedIds.size + ' masqueraders via in-app notification & queued SMS!');
      setShowBroadcast(false);
      setMessage('');
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert('Failed to send broadcast');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-500" /></div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
      
      {/* Top Controls Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <Shirt className="w-5 h-5 text-pink-500" />
              Masquerader & Sizing CRM
            </h3>
            <p className="text-xs text-gray-500">Manage costume sizing, section orders, and mass communications.</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setShowImportModal(true)}
              className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" /> 
              Import Masqueraders (CSV)
            </button>

            <button 
              onClick={handleExportCSV}
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> 
              Export Roster
            </button>

            <button 
              disabled={selectedIds.size === 0}
              onClick={() => setShowBroadcast(true)}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs shadow-sm"
            >
              <Bell className="w-3.5 h-3.5" /> 
              Broadcast ({selectedIds.size})
            </button>
          </div>
        </div>

        {/* Filter / Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search masquerader, phone, email, or section..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white"
            />
          </div>

          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300"
          >
            <option value="ALL">All Sections ({sectionsList.length})</option>
            {sectionsList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={repFilter}
            onChange={(e) => setRepFilter(e.target.value)}
            className="p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300"
          >
            <option value="ALL">All Reps ({repsList.length})</option>
            {repsList.map(r => <option key={r} value={r}>@{r}</option>)}
          </select>

          <button
            onClick={() => setVipFilter(!vipFilter)}
            className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border " + (vipFilter ? "bg-amber-100 dark:bg-amber-900/40 border-amber-300 text-amber-800 dark:text-amber-300" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400")}
          >
            <Crown className="w-3.5 h-3.5" /> VIPs
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="p-3 w-8">
                <input 
                  type="checkbox"
                  checked={selectedIds.size > 0 && selectedIds.size === filteredOrders.length}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
              </th>
              <th className="p-3 font-bold">Masquerader</th>
              <th className="p-3 font-bold">Section & Sizing</th>
              <th className="p-3 font-bold">Phone / SMS</th>
              <th className="p-3 font-bold">Deposit</th>
              <th className="p-3 font-bold">Section Leader</th>
              <th className="p-3 font-bold">Distribution Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-gray-400 text-xs">
                  No masquerader registrations found. Masqueraders will appear here automatically when they book sections via your storefront, or you can import customer lists using "Import Masqueraders (CSV)".
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = selectedIds.has(order.id);
                const name = order.buyer_name || order.buyerName || 'Masquerader';
                const email = order.buyer_email || order.buyerEmail || '';
                const phone = order.buyer_phone || order.phone || '';
                const section = order.band_costume_sections?.title || order.listingTitle || 'Costume';
                const rep = order.referred_by || order.rep_code || order.section_leader || '';
                const variants = order.selected_variants || {};

                return (
                  <tr key={order.id} className={"hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors " + (isSelected ? "bg-purple-50/50 dark:bg-purple-900/20" : "")}>
                    <td className="p-3">
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(order.id)}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        {name}
                        {order.is_vip && (
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 text-[11px]">{email}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-purple-600 dark:text-purple-400">{section}</div>
                      <div className="text-gray-500 text-[11px] flex gap-2 mt-0.5">
                        {variants.bra_size && <span>Bra: {variants.bra_size}</span>}
                        {variants.belt_size && <span>Belt: {variants.belt_size}</span>}
                        {variants.bottom_option && <span>Bottom: {variants.bottom_option}</span>}
                      </div>
                    </td>
                    <td className="p-3">
                      {phone ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">{phone}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">
                      {"$" + (order.amount_paid || 0).toFixed(2)}
                    </td>
                    <td className="p-3">
                      {rep ? (
                        <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded font-semibold text-[11px]">
                          @{rep}
                        </span>
                      ) : (
                        <span className="text-gray-400">Direct</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleToggleDistributionStatus(order.id, order.distribution_status)}
                        className={"px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm " + (order.distribution_status === 'Distributed' ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border border-green-300 dark:border-green-800" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800 hover:bg-green-50")}
                        title="Click to toggle pickup status"
                      >
                        {order.distribution_status === 'Distributed' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                            Distributed
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            Pending Pickup
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Migration Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Import Masqueraders & Sizing
                </h3>
                <p className="text-xs text-gray-500">Import CSV exports from your registration roster or customer spreadsheet.</p>
              </div>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 mb-4">
              <div className="text-xs font-bold text-purple-900 dark:text-purple-200 mb-2">
                1-Click Preset Templates:
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setImportCsvText(SAMPLE_ROSTER_CSV);
                    handleParseCSV(SAMPLE_ROSTER_CSV);
                  }}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
                >
                  Standard Roster Sample ({5} rows)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImportCsvText(SAMPLE_COSTUME_CSV);
                    handleParseCSV(SAMPLE_COSTUME_CSV);
                  }}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
                >
                  Costume & Sizing Sample ({3} rows)
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Paste CSV or Drop File Content
              </label>
              <textarea
                rows={6}
                value={importCsvText}
                onChange={(e) => {
                  setImportCsvText(e.target.value);
                  handleParseCSV(e.target.value);
                }}
                placeholder="Paste CSV text with column headers..."
                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>

            {parsedPreview && (
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-white">
                  <span>Detected Records: {parsedPreview.validCount} valid / {parsedPreview.totalRows} rows</span>
                  {parsedPreview.vipCount > 0 && (
                    <span className="text-amber-600 flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5" /> {parsedPreview.vipCount} Frontline VIPs
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500">
                  {parsedPreview.phoneValidCount} masqueraders have valid normalized international/Caribbean phone numbers ready for SMS blasts.
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!parsedPreview || parsedPreview.validCount === 0 || isImporting}
                onClick={handleExecuteImport}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md"
              >
                {isImporting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Import {parsedPreview?.validCount || 0} Masqueraders
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <Bell className="w-5 h-5 text-pink-500" />
              Distribution & Mass Broadcast
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Dispatching to <strong>{selectedIds.size} selected masqueraders</strong> via in-app push and SMS notifications.
            </p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                1-Click Quick Templates:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setMessage("Hey masquerader! Your costume is ready for pickup at Mas Camp. Please select your preferred distribution pickup window here: https://carnival-planner.web.app/band/pickup")}
                  className="text-left p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pink-500 text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate"
                >
                  📅 Mas Camp Pickup Slots
                </button>
                <button
                  type="button"
                  onClick={() => setMessage("Important reminder: The next installment for your carnival costume is due in 3 days. Please visit your masquerader portal to complete your balance.")}
                  className="text-left p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pink-500 text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate"
                >
                  ⚠️ Balance Due Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setMessage("Road Ready Alert! Breakfast & hydration trucks open at 8:00 AM on Carnival Monday. Line-up begins at Assembly Point Alpha.")}
                  className="text-left p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pink-500 text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate"
                >
                  🎉 Road Day Line-up
                </button>
                <button
                  type="button"
                  onClick={() => setMessage("Please log in to verify your sizing measurements (bra/belt/bottom) before costume production lock-in this Friday!")}
                  className="text-left p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-pink-500 text-[11px] font-medium text-gray-700 dark:text-gray-300 truncate"
                >
                  👗 Fitting & Sizing Check
                </button>
              </div>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type or select a template above..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
                  {sending ? 'Dispatching...' : `Send to ${selectedIds.size} Masqueraders`}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBroadcast(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
