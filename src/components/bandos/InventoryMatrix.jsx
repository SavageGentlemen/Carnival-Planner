import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Layers, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  Loader2, 
  Sparkles,
  TrendingDown,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bandOSService } from '../../services/bandOSService';
import Papa from 'papaparse';

const CATEGORY_COLORS = {
  headpiece: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
  backpack: 'from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30',
  bra: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
  bottom: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
  collar: 'from-violet-500/20 to-indigo-500/20 text-violet-300 border-violet-500/30',
  accessory: 'from-fuchsia-500/20 to-rose-500/20 text-fuchsia-300 border-fuchsia-500/30'
};

const CATEGORIES = [
  { id: 'ALL', label: 'All Pieces' },
  { id: 'headpiece', label: 'Crowns & Tiaras' },
  { id: 'backpack', label: 'Feather Backpacks' },
  { id: 'bra', label: 'Bras & Tops' },
  { id: 'bottom', label: 'Belts & Bottoms' },
  { id: 'accessory', label: 'Accessories' }
];

export default function InventoryMatrix({ bandId }) {
  const [components, setComponents] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [saving, setSaving] = useState(false);

  // New component form
  const [formData, setFormData] = useState({
    section_id: '',
    component_name: '',
    category: 'backpack',
    size: 'Standard',
    total_stock: 50,
    assigned_count: 0,
    low_stock_threshold: 10,
    unit_cost: 0
  });

  useEffect(() => {
    loadData();
  }, [bandId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [compData, secData] = await Promise.all([
        bandOSService.getComponentInventory(bandId),
        bandOSService.getSections(bandId)
      ]);
      setComponents(compData || []);
      setSections(secData || []);
      if (secData && secData.length > 0 && !formData.section_id) {
        setFormData(prev => ({ ...prev, section_id: secData[0].id }));
      }
    } catch (err) {
      console.error('Failed to load inventory matrix:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComponent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await bandOSService.addComponent({
        ...formData,
        band_id: bandId,
        total_stock: parseInt(formData.total_stock) || 0,
        assigned_count: parseInt(formData.assigned_count) || 0,
        low_stock_threshold: parseInt(formData.low_stock_threshold) || 10,
        unit_cost: parseFloat(formData.unit_cost) || 0
      });
      setComponents([created, ...components]);
      setShowAddModal(false);
      setFormData({
        section_id: sections[0]?.id || '',
        component_name: '',
        category: 'backpack',
        size: 'Standard',
        total_stock: 50,
        assigned_count: 0,
        low_stock_threshold: 10,
        unit_cost: 0
      });
    } catch (err) {
      alert('Failed to save component');
    } finally {
      setSaving(false);
    }
  };

  const handleStockAdjust = async (id, delta) => {
    const target = components.find(c => c.id === id);
    if (!target) return;
    const newStock = Math.max(0, (target.total_stock || 0) + delta);
    
    // Optimistic UI update
    setComponents(components.map(c => c.id === id ? { ...c, total_stock: newStock } : c));
    await bandOSService.updateComponentStock(id, { total_stock: newStock });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this production component from warehouse matrix?')) return;
    setComponents(components.filter(c => c.id !== id));
    await bandOSService.deleteComponent(id);
  };

  const handleExportCutSheet = () => {
    const rows = filteredComponents.map(c => ({
      'Section': c.band_costume_sections?.title || 'Unassigned',
      'Component Name': c.component_name,
      'Category': c.category.toUpperCase(),
      'Size/Variant': c.size,
      'Total Stock Target': c.total_stock,
      'Assigned to Masqueraders': c.assigned_count,
      'Available Buffer': Math.max(0, c.total_stock - c.assigned_count),
      'Shortfall Risk': c.assigned_count > c.total_stock ? 'CRITICAL SHORTAGE' : (c.total_stock - c.assigned_count <= c.low_stock_threshold ? 'LOW BUFFER' : 'OK'),
      'Unit Production Cost': `$${(c.unit_cost || 0).toFixed(2)}`,
      'Total Est. Cost': `$${((c.unit_cost || 0) * c.total_stock).toFixed(2)}`
    }));

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MasCamp_Production_CutSheet_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredComponents = components.filter(c => {
    if (selectedSection !== 'ALL' && c.section_id !== selectedSection) return false;
    if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;
    if (searchTerm) {
      const match = c.component_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.size?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.band_costume_sections?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  // Summary Metrics
  const totalProductionUnits = components.reduce((sum, c) => sum + (c.total_stock || 0), 0);
  const totalAssignedUnits = components.reduce((sum, c) => sum + (c.assigned_count || 0), 0);
  const lowStockCount = components.filter(c => (c.total_stock - c.assigned_count) <= (c.low_stock_threshold || 10)).length;
  const totalEstProductionValue = components.reduce((sum, c) => sum + ((c.unit_cost || 0) * (c.total_stock || 0)), 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs text-white/50 font-medium">Total Workshop Target</p>
          <p className="text-2xl font-black text-white mt-1 font-display">{totalProductionUnits} <span className="text-xs font-normal text-white/50">pcs</span></p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs text-white/50 font-medium">Allocated to Orders</p>
          <p className="text-2xl font-black text-cyan-400 mt-1 font-display">{totalAssignedUnits} <span className="text-xs font-normal text-white/50">pcs</span></p>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs text-white/50 font-medium">Stock Buffer Alerts</p>
          <div className="flex items-center gap-2 mt-1">
            <p className={`text-2xl font-black font-display ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{lowStockCount}</p>
            {lowStockCount > 0 && <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">Action Needed</span>}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-xs text-white/50 font-medium">Est. Workshop Value</p>
          <p className="text-2xl font-black text-emerald-400 mt-1 font-display">${totalEstProductionValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      {/* Control Bar: Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search & Section Filter */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search components, sizes, wingspans..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
          >
            <option value="ALL" className="bg-gray-900 text-white">All Sections</option>
            {sections.map(s => (
              <option key={s.id} value={s.id} className="bg-gray-900 text-white">{s.title}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCutSheet}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 transition-all hover:scale-[1.02]"
            title="Download CSV Cut Sheet for Workshop"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Cut Sheet
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-bold text-white shadow-lg shadow-pink-500/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Add Piece
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-pink-500/20 border-pink-500 text-pink-300 shadow-sm'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Component Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/50 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="text-xs">Loading warehouse inventory matrix...</p>
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center border border-white/10 bg-white/5">
          <Box className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1 font-display">No Inventory Pieces Found</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto mb-4">
            Add component breakdowns (crowns, wireframe backpacks, belts, monokinis) to start tracking production allocations.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-bold text-white inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First Piece
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredComponents.map(comp => {
              const remaining = Math.max(0, comp.total_stock - comp.assigned_count);
              const percentage = comp.total_stock > 0 ? Math.min(100, Math.round((comp.assigned_count / comp.total_stock) * 100)) : 0;
              const isLowStock = remaining <= (comp.low_stock_threshold || 10);
              const isOverAllocated = comp.assigned_count > comp.total_stock;
              const categoryTheme = CATEGORY_COLORS[comp.category] || CATEGORY_COLORS.accessory;

              return (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all shadow-md group"
                >
                  <div>
                    {/* Card Header: Section & Category */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 truncate">
                        {comp.band_costume_sections?.title || 'Section Component'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${categoryTheme}`}>
                        {comp.category}
                      </span>
                    </div>

                    {/* Component Name & Size */}
                    <h4 className="text-sm font-bold text-white font-display mb-0.5">{comp.component_name}</h4>
                    <p className="text-xs text-white/60 font-medium mb-3">Size: <span className="text-white/90">{comp.size}</span></p>

                    {/* Allocation Progress Bar */}
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white/50">Allocated to Orders</span>
                        <span className="font-bold text-white">{comp.assigned_count} / {comp.total_stock} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOverAllocated 
                              ? 'bg-red-500' 
                              : isLowStock 
                                ? 'bg-amber-400' 
                                : 'bg-gradient-to-r from-cyan-400 to-pink-500'
                          }`}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-0.5">
                        <span className={`text-[10px] font-bold flex items-center gap-1 ${
                          isOverAllocated 
                            ? 'text-red-400' 
                            : isLowStock 
                              ? 'text-amber-300' 
                              : 'text-emerald-400'
                        }`}>
                          {isOverAllocated ? (
                            <>
                              <AlertTriangle className="w-3 h-3" /> Shortage: {comp.assigned_count - comp.total_stock} pcs needed!
                            </>
                          ) : isLowStock ? (
                            <>
                              <AlertTriangle className="w-3 h-3" /> Only {remaining} buffer pcs left
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" /> {remaining} buffer pcs in stock
                            </>
                          )}
                        </span>
                        {comp.unit_cost > 0 && (
                          <span className="text-[10px] text-white/40">${comp.unit_cost.toFixed(2)}/pc</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stock Quick-Adjust Controls & Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStockAdjust(comp.id, -5)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center justify-center"
                        title="-5 Stock"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleStockAdjust(comp.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center justify-center"
                        title="-1 Stock"
                      >
                        -1
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-2">{comp.total_stock}</span>
                      <button
                        onClick={() => handleStockAdjust(comp.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center justify-center"
                        title="+1 Stock"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => handleStockAdjust(comp.id, 5)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center justify-center"
                        title="+5 Stock"
                      >
                        +5
                      </button>
                    </div>

                    <button
                      onClick={() => handleDelete(comp.id)}
                      className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete piece"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add New Component Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-white/20 bg-gray-900/95 shadow-2xl text-white relative"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-display flex items-center gap-2 mb-1">
              <Box className="w-5 h-5 text-pink-500" />
              Add Production Piece
            </h3>
            <p className="text-xs text-white/50 mb-6">
              Track raw pieces in workshop storage and verify that registrations do not exceed physical capacity.
            </p>

            <form onSubmit={handleCreateComponent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Costume Section *</label>
                <select
                  required
                  value={formData.section_id}
                  onChange={e => setFormData({ ...formData, section_id: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                >
                  {sections.map(s => (
                    <option key={s.id} value={s.id} className="bg-gray-900 text-white">{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="backpack" className="bg-gray-900 text-white">Feather Backpack</option>
                    <option value="headpiece" className="bg-gray-900 text-white">Crown / Tiara</option>
                    <option value="bra" className="bg-gray-900 text-white">Bra / Wireframe Top</option>
                    <option value="bottom" className="bg-gray-900 text-white">Belt / Bottom</option>
                    <option value="collar" className="bg-gray-900 text-white">Feather Collar</option>
                    <option value="accessory" className="bg-gray-900 text-white">Accessory (Legs/Arms)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Size / Dimension *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 34C, Large 6ft, Standard"
                    value={formData.size}
                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1">Component Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solstice Extra Large Wireframe Wings"
                  value={formData.component_name}
                  onChange={e => setFormData({ ...formData, component_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Total Stock *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.total_stock}
                    onChange={e => setFormData({ ...formData, total_stock: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Alert Threshold</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.low_stock_threshold}
                    onChange={e => setFormData({ ...formData, low_stock_threshold: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1">Unit Cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.unit_cost}
                    onChange={e => setFormData({ ...formData, unit_cost: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-pink-500/20"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save to Workshop Matrix
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
