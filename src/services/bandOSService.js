import { supabase } from '../supabaseClient';

export const bandOSService = {
  // === Sections ===
  async getSections(bandId) {
    const { data, error } = await supabase
      .from('band_costume_sections')
      .select('*')
      .eq('band_id', bandId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createSection(sectionData) {
    const { data, error } = await supabase
      .from('band_costume_sections')
      .insert([sectionData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateSection(id, updates) {
    const { data, error } = await supabase
      .from('band_costume_sections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSection(id) {
    const { error } = await supabase
      .from('band_costume_sections')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // === Variants (Modifiers) ===
  async getVariantsBySection(sectionId) {
    const { data, error } = await supabase
      .from('band_inventory_variants')
      .select('*')
      .eq('section_id', sectionId);
    if (error) throw error;
    return data;
  },

  async addVariant(variantData) {
    const { data, error } = await supabase
      .from('band_inventory_variants')
      .insert([variantData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteVariant(id) {
    const { error } = await supabase
      .from('band_inventory_variants')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // === Distribution Slots ===
  async getDistributionSlots(bandId) {
    const { data, error } = await supabase
      .from('distribution_slots')
      .select('*')
      .eq('band_id', bandId)
      .order('start_time', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createDistributionSlot(slotData) {
    const { data, error } = await supabase
      .from('distribution_slots')
      .insert([slotData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // === Orders ===
  async getBandOrders(bandId) {
    const { data, error } = await supabase
      .from('band_orders')
      .select(`
        *,
        band_costume_sections (title)
      `)
      .eq('band_id', bandId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(orderId, statusData) {
    const { data, error } = await supabase
      .from('band_orders')
      .update(statusData)
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async bulkImportOrders(ordersList) {
    const { data, error } = await supabase
      .from('band_orders')
      .insert(ordersList)
      .select();
    if (error) throw error;
    return data;
  }
};
