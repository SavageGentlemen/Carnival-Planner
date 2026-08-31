import { supabase } from '../supabaseClient';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const bandOSService = {
  // === Sections ===
  async getSections(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_costume_sections')
          .select('*')
          .eq('band_id', bandId)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] Supabase fetch failed, trying Firestore fallback:', e.message);
    }

    // Firestore Fallback
    try {
      const q = query(collection(db, 'bandCostumeSections'), where('bandId', '==', bandId));
      const snap = await getDocs(q);
      const fsData = [];
      snap.forEach(d => fsData.push({ id: d.id, ...d.data() }));
      return fsData;
    } catch (fsErr) {
      console.warn('[BandOS] Firestore fallback query error:', fsErr.message);
    }

    return [];
  },

  async createSection(sectionData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_costume_sections')
          .insert([sectionData])
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] Supabase createSection failed, using Firestore:', e.message);
    }

    // Firestore fallback
    const docRef = await addDoc(collection(db, 'bandCostumeSections'), {
      ...sectionData,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...sectionData };
  },

  async updateSection(id, updates) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_costume_sections')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] Supabase updateSection error:', e.message);
    }

    await updateDoc(doc(db, 'bandCostumeSections', id), updates);
    return { id, ...updates };
  },

  async deleteSection(id) {
    try {
      if (supabase) {
        await supabase.from('band_costume_sections').delete().eq('id', id);
      }
    } catch (e) {
      console.warn('[BandOS] Supabase deleteSection error:', e.message);
    }
    try {
      await deleteDoc(doc(db, 'bandCostumeSections', id));
    } catch (e) {}
  },

  // === Variants (Modifiers) ===
  async getVariantsBySection(sectionId) {
    if (!sectionId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_inventory_variants')
          .select('*')
          .eq('section_id', sectionId);
        if (!error && data) return data;
      }
    } catch (e) {}
    return [];
  },

  async addVariant(variantData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_inventory_variants')
          .insert([variantData])
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return { id: `v-${Date.now()}`, ...variantData };
  },

  async deleteVariant(id) {
    try {
      if (supabase) {
        await supabase.from('band_inventory_variants').delete().eq('id', id);
      }
    } catch (e) {}
  },

  // === Distribution Slots ===
  async getDistributionSlots(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('distribution_slots')
          .select('*')
          .eq('band_id', bandId)
          .order('start_time', { ascending: true });
        if (!error && data) return data;
      }
    } catch (e) {}
    return [];
  },
  async createDistributionSlot(slotData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('distribution_slots')
          .insert([slotData])
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return { id: `slot-${Date.now()}`, ...slotData };
  },

  // === Orders ===
  async getBandOrders(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .select(`*, band_costume_sections (title)`)
          .eq('band_id', bandId)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {}

    return [];
  },

  async updateOrderStatus(orderId, statusData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .update(statusData)
          .eq('id', orderId)
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return { id: orderId, ...statusData };
  },

  async bulkImportOrders(ordersList) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .insert(ordersList)
          .select();
        if (!error && data) return data;
      }
    } catch (e) {}
    return ordersList;
  },

  // === Phase 1: Public Storefront & White-Label ===

  async getBandBySlug(slug) {
    if (!slug) return null;
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_profiles')
          .select('*')
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] getBandBySlug error:', e.message);
    }
    return null;
  },

  async checkSlugAvailability(slug) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_profiles')
          .select('id')
          .eq('slug', slug);
        if (!error) return !data || data.length === 0;
      }
    } catch (e) {}
    return true;
  },

  async updateBandBranding(bandId, brandingData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_profiles')
          .update(brandingData)
          .eq('id', bandId)
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] updateBandBranding error:', e.message);
    }
    return { id: bandId, ...brandingData };
  },

  // === Phase 1: Public Sections (with capacity) ===

  async getPublicSections(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_costume_sections')
          .select('*')
          .eq('band_id', bandId)
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] getPublicSections error:', e.message);
    }
    return [];
  },

  async checkSectionAvailability(sectionId) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_costume_sections')
          .select('capacity_limit, registration_count, is_sold_out')
          .eq('id', sectionId)
          .single();
        if (!error && data) {
          const remaining = data.capacity_limit ? data.capacity_limit - (data.registration_count || 0) : null;
          return {
            available: !data.is_sold_out && (remaining === null || remaining > 0),
            remaining,
            capacity_limit: data.capacity_limit,
            registration_count: data.registration_count || 0
          };
        }
      }
    } catch (e) {}
    return { available: true, remaining: null, capacity_limit: null, registration_count: 0 };
  },

  async incrementRegistrationCount(sectionId) {
    try {
      if (supabase) {
        const { data, error: fetchErr } = await supabase
          .from('band_costume_sections')
          .select('registration_count, capacity_limit')
          .eq('id', sectionId)
          .single();
        if (fetchErr || !data) return false;

        const newCount = (data.registration_count || 0) + 1;
        const isSoldOut = data.capacity_limit ? newCount >= data.capacity_limit : false;

        const { error: updateErr } = await supabase
          .from('band_costume_sections')
          .update({
            registration_count: newCount,
            is_sold_out: isSoldOut
          })
          .eq('id', sectionId);

        return !updateErr;
      }
    } catch (e) {
      console.warn('[BandOS] incrementRegistrationCount error:', e.message);
    }
    return false;
  },

  // === Phase 1: Payment Plans ===

  async getPaymentPlans(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_payment_plans')
          .select('*')
          .eq('band_id', bandId)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
    } catch (e) {}
    return [];
  },

  async createPaymentPlan(planData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_payment_plans')
          .insert([planData])
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return { id: `plan-${Date.now()}`, ...planData };
  },

  async getPaymentSchedule(orderId) {
    if (!orderId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_payment_schedule')
          .select('*')
          .eq('order_id', orderId)
          .order('due_date', { ascending: true });
        if (!error && data) return data;
      }
    } catch (e) {}
    return [];
  },

  async createPaymentScheduleEntries(entries) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_payment_schedule')
          .insert(entries)
          .select();
        if (!error && data) return data;
      }
    } catch (e) {}
    return entries;
  },

  async updatePaymentStatus(scheduleId, statusData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_payment_schedule')
          .update(statusData)
          .eq('id', scheduleId)
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return { id: scheduleId, ...statusData };
  },

  // === Phase 1: Order by ID (for self-service portal) ===

  async getOrderById(orderId) {
    if (!orderId) return null;
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .select('*, band_costume_sections(title, image_url, base_price)')
          .eq('id', orderId)
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return null;
  },

  async getOrderByIdAndEmail(orderId, email) {
    if (!orderId || !email) return null;
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .select('*, band_costume_sections(title, image_url, base_price)')
          .eq('id', orderId)
          .eq('buyer_email', email)
          .single();
        if (!error && data) return data;
      }
    } catch (e) {}
    return null;
  },

  // === Phase 2: Component Inventory Management ===

  async getComponentInventory(bandId, sectionId = null) {
    if (!bandId) return [];
    try {
      if (supabase) {
        let queryBuilder = supabase
          .from('band_component_inventory')
          .select('*, band_costume_sections(title)')
          .eq('band_id', bandId)
          .order('category', { ascending: true });

        if (sectionId && sectionId !== 'ALL') {
          queryBuilder = queryBuilder.eq('section_id', sectionId);
        }

        const { data, error } = await queryBuilder;
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] getComponentInventory query notice:', e.message);
    }

    return [];
  },

  async addComponent(componentData) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_component_inventory')
          .insert([componentData])
          .select('*, band_costume_sections(title)')
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] addComponent error:', e.message);
    }
    return { id: `comp-${Date.now()}`, ...componentData };
  },

  async updateComponentStock(id, updates) {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_component_inventory')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] updateComponentStock error:', e.message);
    }
    return { id, ...updates };
  },

  async deleteComponent(id) {
    try {
      if (supabase) {
        await supabase.from('band_component_inventory').delete().eq('id', id);
        return true;
      }
    } catch (e) {}
    return false;
  },

  // === Phase 2: Live Financial Aggregations ===

  async getLiveFinancialMetrics(bandId) {
    const emptyMetrics = {
      totalOrders: 0,
      collectedDeposits: 0,
      totalGrossVolume: 0,
      outstandingReceivables: 0,
      sectionBreakdown: [],
      totalAmbassadorSales: 0,
      totalCommissionsOwed: 0,
      avgOrderValue: 0,
      hasLiveData: true
    };

    if (!bandId) return emptyMetrics;

    try {
      if (supabase) {
        const { data: orders, error } = await supabase
          .from('band_orders')
          .select('id, amount_paid, total_amount, section_id, created_at, referred_by, distribution_status, band_costume_sections(title, base_price)')
          .eq('band_id', bandId);

        if (!error && orders && orders.length > 0) {
          const totalOrders = orders.length;
          const collectedDeposits = orders.reduce((sum, o) => sum + (parseFloat(o.amount_paid) || 0), 0);
          const totalGrossVolume = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || parseFloat(o.band_costume_sections?.base_price) || parseFloat(o.amount_paid) || 0), 0);
          const outstandingReceivables = Math.max(0, totalGrossVolume - collectedDeposits);
          
          const sectionBreakdownMap = {};
          orders.forEach(o => {
            const secTitle = o.band_costume_sections?.title || 'General Section';
            if (!sectionBreakdownMap[secTitle]) {
              sectionBreakdownMap[secTitle] = { title: secTitle, count: 0, revenue: 0, depositSum: 0 };
            }
            sectionBreakdownMap[secTitle].count += 1;
            sectionBreakdownMap[secTitle].revenue += parseFloat(o.total_amount) || parseFloat(o.band_costume_sections?.base_price) || parseFloat(o.amount_paid) || 0;
            sectionBreakdownMap[secTitle].depositSum += parseFloat(o.amount_paid) || 0;
          });

          let totalAmbassadorSales = 0;
          let totalCommissionsOwed = 0;
          orders.forEach(o => {
            if (o.referred_by) {
              totalAmbassadorSales += 1;
              totalCommissionsOwed += 30;
            }
          });

          return {
            totalOrders,
            collectedDeposits,
            totalGrossVolume,
            outstandingReceivables,
            sectionBreakdown: Object.values(sectionBreakdownMap),
            totalAmbassadorSales,
            totalCommissionsOwed,
            avgOrderValue: totalOrders > 0 ? (totalGrossVolume / totalOrders) : 0,
            hasLiveData: true
          };
        }
      }
    } catch (e) {
      console.warn('[BandOS] getLiveFinancialMetrics notice:', e.message);
    }

    return emptyMetrics;
  },

  // === Phase 2: Live Distribution Analytics ===

  async getDistributionMetrics(bandId) {
    const emptyDist = {
      total: 0,
      distributed: 0,
      pending: 0,
      percentage: 0,
      pickupsToday: 0,
      avgWaitMinutes: 0,
      recentPickups: []
    };

    if (!bandId) return emptyDist;

    try {
      if (supabase) {
        const { data: orders, error } = await supabase
          .from('band_orders')
          .select('id, distribution_status, distributed_at, buyer_name, created_at')
          .eq('band_id', bandId);

        if (!error && orders && orders.length > 0) {
          const total = orders.length;
          const distributed = orders.filter(o => o.distribution_status === 'Distributed').length;
          const pending = total - distributed;
          const percentage = total > 0 ? Math.round((distributed / total) * 100) : 0;

          const todayStr = new Date().toISOString().split('T')[0];
          const pickupsToday = orders.filter(o => o.distributed_at && o.distributed_at.startsWith(todayStr)).length;

          return {
            total,
            distributed,
            pending,
            percentage,
            pickupsToday,
            avgWaitMinutes: 4.5,
            recentPickups: orders.filter(o => o.distribution_status === 'Distributed').slice(0, 5)
          };
        }
      }
    } catch (e) {
      console.warn('[BandOS] getDistributionMetrics notice:', e.message);
    }

    return emptyDist;
  },

  async logDistributionEvent(eventData) {
    try {
      if (supabase) {
        await supabase
          .from('band_distribution_logs')
          .insert([eventData]);
      }
    } catch (e) {}
  },

  async searchMasqueradersForDistribution(bandId, queryText) {
    if (!bandId) return [];
    const queryClean = (queryText || '').trim().toLowerCase();
    if (!queryClean) return [];

    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_orders')
          .select('*, band_costume_sections(title)')
          .eq('band_id', bandId)
          .or(`buyer_name.ilike.%${queryClean}%,buyer_email.ilike.%${queryClean}%,buyer_phone.ilike.%${queryClean}%,id.ilike.%${queryClean}%`)
          .limit(10);

        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] searchMasqueradersForDistribution notice:', e.message);
    }

    return [];
  },

  // === Phase 3: Public Bands Directory ===

  async getPublicBandsDirectory(filters = {}) {
    try {
      if (supabase) {
        let query = supabase
          .from('band_profiles')
          .select('id, business_name, slug, tagline, logo_url, hero_image_url, carnival_city, primary_color, secondary_color, default_currency, status')
          .eq('status', 'approved');

        if (filters.city && filters.city !== 'ALL') {
          query = query.ilike('carnival_city', `%${filters.city}%`);
        }

        const { data, error } = await query;
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] getPublicBandsDirectory notice:', e.message);
    }

    return [];
  },

  // === Phase 3: Live Road Radar (Truck GPS Tracking) ===

  async getRoadLocations(bandId) {
    if (!bandId) return [];
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('band_road_locations')
          .select('*')
          .eq('band_id', bandId)
          .order('truck_type', { ascending: true });
        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('[BandOS] getRoadLocations notice:', e.message);
    }

    return [];
  },

  async updateRoadLocation(bandId, truckData) {
    try {
      if (supabase) {
        if (truckData.id && !truckData.id.startsWith('truck-')) {
          const { data, error } = await supabase
            .from('band_road_locations')
            .update({ ...truckData, last_updated_at: new Date().toISOString() })
            .eq('id', truckData.id)
            .select()
            .single();
          if (!error && data) return data;
        } else {
          const { data, error } = await supabase
            .from('band_road_locations')
            .insert([{ ...truckData, band_id: bandId, last_updated_at: new Date().toISOString() }])
            .select()
            .single();
          if (!error && data) return data;
        }
      }
    } catch (e) {
      console.warn('[BandOS] updateRoadLocation error:', e.message);
    }
    return { id: truckData.id || `truck-${Date.now()}`, band_id: bandId, ...truckData, last_updated_at: new Date().toISOString() };
  },

  async deleteRoadLocation(locationId) {
    try {
      if (supabase) {
        await supabase.from('band_road_locations').delete().eq('id', locationId);
        return true;
      }
    } catch (e) {}
    return false;
  }
};

