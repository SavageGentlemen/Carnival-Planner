import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Loader2, Edit3, X, Image as ImageIcon } from 'lucide-react';
import { bandOSService } from '../../services/bandOSService';
import { motion, AnimatePresence } from 'framer-motion';

export default function CostumeBuilder({ bandId }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSectionId, setEditingSectionId] = useState(null);

  // New section form state
  const [isCreating, setIsCreating] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    base_price: '',
    deposit_amount: '',
    image_url: ''
  });

  useEffect(() => {
    fetchSections();
  }, [bandId]);

  const fetchSections = async () => {
    try {
      const data = await bandOSService.getSections(bandId);
      setSections(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async (e) => {
    e.preventDefault();
    try {
      const created = await bandOSService.createSection({
        ...newSection,
        band_id: bandId,
        base_price: parseFloat(newSection.base_price),
        deposit_amount: parseFloat(newSection.deposit_amount)
      });
      setSections([created, ...sections]);
      setIsCreating(false);
      setNewSection({ title: '', description: '', base_price: '', deposit_amount: '', image_url: '' });
      setEditingSectionId(created.id);
    } catch (err) {
      console.error(err);
      alert('Failed to create section');
    }
  };

  const handleDeleteSection = async (id) => {
    if (!confirm("Are you sure you want to delete this section? This will remove all variants.")) return;
    try {
      await bandOSService.deleteSection(id);
      setSections(sections.filter(s => s.id !== id));
      if (editingSectionId === id) setEditingSectionId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete section');
    }
  };

  if (loading) return <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">Costume Sections</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Section
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleCreateSection}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg dark:text-white">Create New Section</h3>
              <button type="button" onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                <input required value={newSection.title} onChange={e => setNewSection({...newSection, title: e.target.value})} type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="e.g. Frontline Goddess" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input value={newSection.image_url} onChange={e => setNewSection({...newSection, image_url: e.target.value})} type="url" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Base Price ($)</label>
                <input required value={newSection.base_price} onChange={e => setNewSection({...newSection, base_price: e.target.value})} type="number" min="0" step="0.01" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="1200.00" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Required Deposit ($)</label>
                <input required value={newSection.deposit_amount} onChange={e => setNewSection({...newSection, deposit_amount: e.target.value})} type="number" min="0" step="0.01" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="300.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea value={newSection.description} onChange={e => setNewSection({...newSection, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white h-24" placeholder="Describe the section..."></textarea>
            </div>
            
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
              Save Section
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sections List */}
        <div className="md:col-span-1 space-y-3">
          {sections.map(section => (
            <div 
              key={section.id} 
              onClick={() => setEditingSectionId(section.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${editingSectionId === section.id ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 ring-2 ring-purple-500/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'}`}
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 shrink-0 overflow-hidden">
                  {section.image_url ? (
                    <img src={section.image_url} alt={section.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400 m-auto mt-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{section.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">Base: ${section.base_price}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Dep: ${section.deposit_amount}</p>
                </div>
              </div>
            </div>
          ))}
          {sections.length === 0 && !isCreating && (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500">No sections created yet.</p>
            </div>
          )}
        </div>

        {/* Variant Editor */}
        <div className="md:col-span-2">
          {editingSectionId ? (
            <VariantEditor section={sections.find(s => s.id === editingSectionId)} onDelete={() => handleDeleteSection(editingSectionId)} />
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <div className="text-center text-gray-400">
                <Edit3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a section to manage variants</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for managing the matrix variants of a section
function VariantEditor({ section, onDelete }) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVariant, setNewVariant] = useState({ variant_type: 'bra_size', variant_value: '', additional_cost: '0', inventory_cap: '' });

  useEffect(() => {
    fetchVariants();
  }, [section.id]);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const data = await bandOSService.getVariantsBySection(section.id);
      setVariants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVariant = async (e) => {
    e.preventDefault();
    try {
      const created = await bandOSService.addVariant({
        section_id: section.id,
        variant_type: newVariant.variant_type,
        variant_value: newVariant.variant_value,
        additional_cost: parseFloat(newVariant.additional_cost) || 0,
        inventory_cap: newVariant.inventory_cap ? parseInt(newVariant.inventory_cap) : null
      });
      setVariants([...variants, created]);
      setNewVariant({ ...newVariant, variant_value: '', additional_cost: '0', inventory_cap: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add variant');
    }
  };

  const handleDeleteVariant = async (id) => {
    try {
      await bandOSService.deleteVariant(id);
      setVariants(variants.filter(v => v.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const groupedVariants = variants.reduce((acc, curr) => {
    if (!acc[curr.variant_type]) acc[curr.variant_type] = [];
    acc[curr.variant_type].push(curr);
    return acc;
  }, {});

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/80">
        <div>
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
            {section.title}
            {section.is_active ? (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-wider">Active</span>
            ) : (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold uppercase tracking-wider">Draft</span>
            )}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Manage sizes, addons, and meals for this section.</p>
        </div>
        <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Section">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex-1 space-y-6">
        {/* Variant Groups Display */}
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
        ) : (
          Object.keys(groupedVariants).map(type => (
            <div key={type} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 capitalize border-b border-gray-200 dark:border-gray-700 pb-2">{type.replace('_', ' ')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {groupedVariants[type].map(v => (
                  <div key={v.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 px-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                    <div>
                      <span className="font-medium text-sm dark:text-white">{v.variant_value}</span>
                      <div className="flex gap-2 text-xs mt-0.5">
                        {v.additional_cost > 0 && <span className="text-purple-600 dark:text-purple-400 font-medium">+${v.additional_cost}</span>}
                        {v.inventory_cap !== null ? (
                          <span className={`${v.quantity_sold >= v.inventory_cap ? 'text-red-500' : 'text-gray-500'}`}>
                            {v.quantity_sold}/{v.inventory_cap} sold
                          </span>
                        ) : (
                          <span className="text-green-500">Unlimited</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteVariant(v.id)} className="text-gray-400 hover:text-red-500 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        
        {variants.length === 0 && !loading && (
          <div className="text-center p-6 text-gray-500">No modifiers added yet.</div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <form onSubmit={handleAddVariant} className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
            <select 
              value={newVariant.variant_type}
              onChange={e => setNewVariant({...newVariant, variant_type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="bra_size">Bra Size</option>
              <option value="panty_style">Panty Style</option>
              <option value="meal_preference">Meal Preference</option>
              <option value="add_on">Add-on (e.g. Wire Bra)</option>
              <option value="body_type">Body Type / Size</option>
            </select>
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-bold text-gray-500 mb-1">Value</label>
            <input required value={newVariant.variant_value} onChange={e => setNewVariant({...newVariant, variant_value: e.target.value})} type="text" placeholder="e.g. 34B" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
          </div>
          <div className="w-24">
            <label className="block text-xs font-bold text-gray-500 mb-1">+ Price</label>
            <input value={newVariant.additional_cost} onChange={e => setNewVariant({...newVariant, additional_cost: e.target.value})} type="number" min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
          </div>
          <div className="w-24">
            <label className="block text-xs font-bold text-gray-500 mb-1">Cap (Max)</label>
            <input value={newVariant.inventory_cap} onChange={e => setNewVariant({...newVariant, inventory_cap: e.target.value})} type="number" min="1" placeholder="∞" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white text-sm" />
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors mb-[1px]">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
