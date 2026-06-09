import React, { useState, useEffect } from 'react';
import { Search, Mail, Bell, Loader2, CheckSquare, Square, Filter, Download, Upload } from 'lucide-react';
import { bandOSService } from '../../services/bandOSService';
import { supabase } from '../../supabaseClient';
import Papa from 'papaparse';

export default function BandCRM({ bandId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredOrders = orders.filter(o => 
    o.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.buyer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.band_costume_sections?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (selectedIds.size === 0) return alert("Select at least one masquerader");
    
    setSending(true);
    try {
      // Collect the buyer_ids to send push notifications to
      const targetUserIds = orders
        .filter(o => selectedIds.has(o.id) && o.buyer_id)
        .map(o => o.buyer_id);

      // Call Edge Function
      const { data, error } = await supabase.functions.invoke('bandos-broadcast', {
        body: { 
          bandId,
          userIds: targetUserIds,
          message 
        }
      });

      if (error) throw error;
      
      alert(`Message broadcasted successfully to ${targetUserIds.length} users!`);
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

  const handleExportCSV = () => {
    const dataToExport = selectedIds.size > 0 
      ? orders.filter(o => selectedIds.has(o.id))
      : filteredOrders;

    if (dataToExport.length === 0) return alert("No data to export.");

    const csvData = dataToExport.map(o => ({
      'Order ID': o.id,
      'Name': o.buyer_name,
      'Email': o.buyer_email,
      'Section': o.band_costume_sections?.title || '',
      'Status': o.distribution_status,
      'Amount Paid': o.amount_paid,
      'Variants': Object.entries(o.selected_variants || {}).map(([k,v]) => `${k}:${v}`).join(' | ')
    }));

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BandOS_Roster_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const newOrders = results.data.map(row => ({
            band_id: bandId,
            buyer_name: row['Name'] || row['name'] || row['Buyer Name'] || 'Imported User',
            buyer_email: row['Email'] || row['email'] || row['Buyer Email'] || 'imported@example.com',
            total_amount: parseFloat(row['Amount Paid'] || row['amount_paid'] || 0),
            amount_paid: parseFloat(row['Amount Paid'] || row['amount_paid'] || 0),
            distribution_status: 'Pending',
            selected_variants: { imported_section: row['Section'] || row['section'] || 'Unknown' }
            // Note: Section ID would need a lookup in a robust scenario. We store it in variants as fallback.
          }));

          if (newOrders.length === 0) throw new Error("No valid rows found in CSV");

          await bandOSService.bulkImportOrders(newOrders);
          alert(`Successfully imported ${newOrders.length} masqueraders!`);
          fetchRoster(); // Reload table
        } catch (err) {
          console.error(err);
          alert('Failed to import CSV: ' + err.message);
          setLoading(false);
        }
      },
      error: (error) => {
        console.error(error);
        alert('Error parsing CSV file');
        setLoading(false);
      }
    });
    // Reset input
    e.target.value = null;
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" /></div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header & Controls */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg dark:text-white">Masquerader CRM</h3>
            <p className="text-sm text-gray-500">Manage orders and send mass communications.</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleExportCSV}
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm shadow-sm"
            >
              <Download className="w-4 h-4" /> 
              Export
            </button>
            <label className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm shadow-sm cursor-pointer">
              <Upload className="w-4 h-4" /> 
              Import
              <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
            </label>
            <button 
              disabled={selectedIds.size === 0}
              onClick={() => setShowBroadcast(true)}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
            >
              <Bell className="w-4 h-4" /> 
              Broadcast ({selectedIds.size})
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or section..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col justify-center">
          <div className="max-w-lg mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold dark:text-white mb-2">Send Broadcast Message</h3>
            <p className="text-sm text-gray-500 mb-4">This will send an in-app push notification to the {selectedIds.size} selected masqueraders.</p>
            
            <form onSubmit={handleBroadcast}>
              <textarea 
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white mb-4"
                placeholder="e.g. Costume distribution for Frontline is delayed by 1 hour..."
              ></textarea>
              
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowBroadcast(false)} className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                <button type="submit" disabled={sending} className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roster Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 sticky top-0 z-0">
            <tr>
              <th className="px-4 py-3 w-10">
                <button onClick={toggleSelectAll} className="text-gray-400 hover:text-purple-600">
                  {selectedIds.size > 0 && selectedIds.size === filteredOrders.length ? <CheckSquare className="w-5 h-5 text-purple-600" /> : <Square className="w-5 h-5" />}
                </button>
              </th>
              <th className="px-6 py-3">Masquerader</th>
              <th className="px-6 py-3">Section</th>
              <th className="px-6 py-3">Details</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id} className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${selectedIds.has(o.id) ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''}`} onClick={() => toggleSelect(o.id)}>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => toggleSelect(o.id)} className="text-gray-400 hover:text-purple-600">
                    {selectedIds.has(o.id) ? <CheckSquare className="w-5 h-5 text-purple-600" /> : <Square className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {o.buyer_name}
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{o.buyer_email}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                  {o.band_costume_sections?.title}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 max-w-[200px] truncate">
                  {Object.entries(o.selected_variants || {}).map(([k,v]) => `${k}: ${v}`).join(', ') || '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${o.distribution_status === 'Distributed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'}`}>
                    {o.distribution_status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
