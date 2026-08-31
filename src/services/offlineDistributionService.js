/**
 * Offline Mas Camp Distribution Sync Engine
 * Enables seamless QR ticket scanning, manual check-offs, and roster verification
 * even inside dead-zone mas camp warehouses with zero cell reception.
 */

import { supabase } from '../supabaseClient';
import { bandOSService } from './bandOSService';

const CACHE_KEY_PREFIX = 'bandos_offline_roster_';
const QUEUE_KEY_PREFIX = 'bandos_sync_queue_';

export const offlineDistributionService = {
  /**
   * Cache band roster locally for offline access
   */
  async cacheRosterForOffline(bandId) {
    if (!bandId) return { success: false, error: 'No band ID provided' };
    try {
      const orders = await bandOSService.getBandOrders(bandId);
      const cacheData = {
        bandId: bandId,
        cachedAt: new Date().toISOString(),
        orders: orders || []
      };
      localStorage.setItem(`${CACHE_KEY_PREFIX}${bandId}`, JSON.stringify(cacheData));
      return { success: true, count: orders?.length || 0 };
    } catch (e) {
      console.warn('[OfflineDistribution] Cache error:', e.message);
      return { success: false, error: e.message };
    }
  },

  /**
   * Get cached roster for offline lookup
   */
  getCachedRoster(bandId) {
    if (!bandId) return null;
    try {
      const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${bandId}`);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  },

  /**
   * Check if offline cache exists and is fresh
   */
  getCacheStatus(bandId) {
    if (!bandId) return { hasCache: false, count: 0, cachedAt: null, pendingSyncCount: 0 };
    const cached = this.getCachedRoster(bandId);
    const pendingQueue = this.getPendingQueue(bandId);
    return {
      hasCache: !!cached,
      count: cached?.orders?.length || 0,
      cachedAt: cached?.cachedAt || null,
      pendingSyncCount: pendingQueue.length
    };
  },

  /**
   * Perform offline ticket check-off
   */
  recordOfflineDistribution(bandId, orderId, staffId = 'staff-offline') {
    if (!bandId || !orderId) return null;
    const cached = this.getCachedRoster(bandId);
    
    // 1. Update local cache immediately
    if (cached && cached.orders) {
      cached.orders = cached.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            distribution_status: 'Distributed',
            distributed_at: new Date().toISOString()
          };
        }
        return o;
      });
      localStorage.setItem(`${CACHE_KEY_PREFIX}${bandId}`, JSON.stringify(cached));
    }

    // 2. Add to sync queue
    const queue = this.getPendingQueue(bandId);
    const syncItem = {
      orderId,
      bandId: bandId,
      distributed_at: new Date().toISOString(),
      distributed_by: staffId,
      queuedAt: new Date().toISOString()
    };
    queue.push(syncItem);
    localStorage.setItem(`${QUEUE_KEY_PREFIX}${bandId}`, JSON.stringify(queue));

    return syncItem;
  },

  /**
   * Get pending offline items to sync
   */
  getPendingQueue(bandId) {
    if (!bandId) return [];
    try {
      const raw = localStorage.getItem(`${QUEUE_KEY_PREFIX}${bandId}`);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  },

  /**
   * Push pending offline queue to Supabase
   */
  async syncPendingQueue(bandId) {
    if (!bandId) return { synced: 0, failed: 0 };
    const queue = this.getPendingQueue(bandId);
    if (queue.length === 0) return { synced: 0, failed: 0 };

    let synced = 0;
    let failed = 0;
    const remainingQueue = [];

    for (const item of queue) {
      try {
        if (supabase) {
          const { error } = await supabase
            .from('band_orders')
            .update({
              distribution_status: 'Distributed',
              distributed_at: item.distributed_at,
              distributed_by: item.distributed_by
            })
            .eq('id', item.orderId);

          if (!error) {
            synced++;
            continue;
          }
        }
        // If Supabase not connected or failed, keep in queue
        failed++;
        remainingQueue.push(item);
      } catch (err) {
        failed++;
        remainingQueue.push(item);
      }
    }

    // Save remaining items back to queue
    localStorage.setItem(`${QUEUE_KEY_PREFIX}${effectiveBandId}`, JSON.stringify(remainingQueue));
    return { synced, failed, remaining: remainingQueue.length };
  }
};
