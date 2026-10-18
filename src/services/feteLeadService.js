import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Service for managing VIP Fete Drop Leads and Campaign Dispatches
 */
export const feteLeadService = {
  /**
   * Fetch all active leads from Firestore
   */
  async getLeads() {
    if (!db) return [];
    try {
      const q = query(
        collection(db, 'feteAlertLeads'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAtFormatted: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toLocaleDateString() : 'Recent'
      }));
    } catch (err) {
      console.warn('Failed to fetch fete leads:', err.message);
      return [];
    }
  },

  /**
   * Calculate summary metrics from leads array
   */
  getLeadStats(leads = []) {
    const total = leads.length;
    let whatsappCount = 0;
    let emailCount = 0;
    const carnivalCounts = {};

    leads.forEach(lead => {
      if (lead.notifyMethod === 'whatsapp') whatsappCount++;
      else emailCount++;

      const carnival = lead.preferredCarnival || 'Trinidad Carnival 🇹🇹';
      carnivalCounts[carnival] = (carnivalCounts[carnival] || 0) + 1;
    });

    return {
      total,
      whatsappCount,
      emailCount,
      carnivalCounts
    };
  },

  /**
   * Record and dispatch a new VIP Fete Drop Alert Campaign
   */
  async broadcastDropAlert({ carnival, feteName, dropTime, ticketUrl, promoCode, note, targetLeads = [] }) {
    if (!db) throw new Error('Database offline');

    const whatsappLeads = targetLeads.filter(l => l.notifyMethod === 'whatsapp');
    const emailLeads = targetLeads.filter(l => l.notifyMethod === 'email');

    // 1. Log campaign to Firestore
    const campaignRef = await addDoc(collection(db, 'feteDropCampaigns'), {
      carnival,
      feteName,
      dropTime,
      ticketUrl,
      promoCode: promoCode || null,
      note: note || null,
      totalRecipients: targetLeads.length,
      whatsappRecipients: whatsappLeads.length,
      emailRecipients: emailLeads.length,
      createdAt: serverTimestamp(),
      status: 'dispatched'
    });

    // 2. Format pre-filled WhatsApp broadcast text
    const cleanDropTime = dropTime || 'Dropping Soon';
    const cleanUrl = ticketUrl || 'https://www.carnival-planner.com';
    const waText = encodeURIComponent(
      `🚨 *CARNIVAL PLANNER VIP FLASH DROP* 🚨\n\n` +
      `🎉 *Event:* ${feteName}\n` +
      `📍 *Carnival:* ${carnival}\n` +
      `⏰ *Drop Time:* ${cleanDropTime}\n` +
      `🎟️ *Tickets:* ${cleanUrl}\n` +
      (promoCode ? `🔑 *Code:* ${promoCode}\n` : '') +
      (note ? `\n💬 *Note:* ${note}\n` : '') +
      `\n_Powered by Caribbean Carnival Planner (www.carnival-planner.com)_`
    );

    return {
      campaignId: campaignRef.id,
      totalSent: targetLeads.length,
      whatsappCount: whatsappLeads.length,
      emailCount: emailLeads.length,
      whatsappBroadcastUrl: `https://api.whatsapp.com/send?text=${waText}`
    };
  },

  /**
   * Export leads to clean CSV file
   */
  exportToCSV(leads = []) {
    if (!leads.length) return;

    const headers = ['Contact', 'Channel', 'Preferred Carnival', 'Source', 'Date Joined'];
    const rows = leads.map(l => [
      `"${l.contact || ''}"`,
      `"${l.notifyMethod || 'email'}"`,
      `"${l.preferredCarnival || ''}"`,
      `"${l.source || 'website'}"`,
      `"${l.createdAtFormatted || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `carnival_planner_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
