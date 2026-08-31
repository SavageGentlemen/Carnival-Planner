import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  Square, 
  Download, 
  Printer, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  Truck, 
  Layers, 
  DollarSign, 
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYBOOK_PHASES = [
  {
    id: 'launch',
    title: 'Phase 1: Band Launch & Early Deposits (T-120 Days)',
    icon: Sparkles,
    color: 'text-pink-400',
    tasks: [
      { id: 't1', label: 'Complete BandOS white-label branding (logo, colors, custom URL slug)', critical: true },
      { id: 't2', label: 'Connect bank account via Stripe Connect for direct rolling deposits', critical: true },
      { id: 't3', label: 'Create costume sections with capacity limits in Sections Catalog', critical: true },
      { id: 't4', label: 'Configure multi-installment payment plans (e.g. 30% deposit, 40% second, 30% final)', critical: true },
      { id: 't5', label: 'Assign Section Leaders & referral codes in Ambassadors portal', critical: false }
    ]
  },
  {
    id: 'production',
    title: 'Phase 2: Sizing Lock-in & Production Cut Sheets (T-60 Days)',
    icon: Layers,
    color: 'text-purple-400',
    tasks: [
      { id: 't6', label: 'Send broadcast reminder for masqueraders to verify bra/belt sizing in Self-Service Portal', critical: true },
      { id: 't7', label: 'Export Mas Camp Production Cut Sheet (CSV) from Inventory Matrix for wireframers', critical: true },
      { id: 't8', label: 'Review buffer inventory thresholds for backpacks, crowns, and monokinis', critical: false },
      { id: 't9', label: 'Trigger automated second installment collection reminders via Cloud Functions', critical: true }
    ]
  },
  {
    id: 'mascamp',
    title: 'Phase 3: Mas Camp Distribution Week (T-14 Days)',
    icon: Users,
    color: 'text-cyan-400',
    tasks: [
      { id: 't10', label: 'Cache masquerader roster for Offline Mas Camp Mode in case warehouse has dead zones', critical: true },
      { id: 't11', label: 'Set up time slot windows in Logistics & Slots for controlled masquerader flow', critical: true },
      { id: 't12', label: 'Brief distribution staff on camera QR scanner and audio chime verification', critical: true },
      { id: 't13', label: 'Print physical backup check-in sheets and warehouse aisle labels', critical: false }
    ]
  },
  {
    id: 'parade',
    title: 'Phase 4: Carnival Monday & Tuesday Road Operations (T-0 Days)',
    icon: Truck,
    color: 'text-emerald-400',
    tasks: [
      { id: 't14', label: 'Deploy Road Radar GPS beacons on Lead DJ Truck, Drinks Bar, and Restroom trailer', critical: true },
      { id: 't15', label: 'Dispatch assembly meetup time and breakfast truck broadcast to all masqueraders', critical: true },
      { id: 't16', label: 'Verify hydration bar ice and beverage restock schedule along route', critical: false },
      { id: 't17', label: 'Designate mobile medical and emergency cooldown misting points', critical: true }
    ]
  }
];

export default function BandPlaybook({ bandId }) {
  const [completedTasks, setCompletedTasks] = useState({});
  const [expandedPhase, setExpandedPhase] = useState('launch');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`bandos_playbook_${bandId || 'demo'}`);
      if (saved) setCompletedTasks(JSON.parse(saved));
    } catch (e) {}
  }, [bandId]);

  const toggleTask = (taskId) => {
    const next = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(next);
    try {
      localStorage.setItem(`bandos_playbook_${bandId || 'demo'}`, JSON.stringify(next));
    } catch (e) {}
  };

  // Calculate overall progress
  const allTaskIds = PLAYBOOK_PHASES.flatMap(p => p.tasks.map(t => t.id));
  const completedCount = allTaskIds.filter(id => completedTasks[id]).length;
  const overallPercentage = Math.round((completedCount / allTaskIds.length) * 100);

  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <BookOpen className="w-6 h-6 text-pink-500" />
            Band Leader Operations Playbook
          </h2>
          <p className="text-xs text-white/50">
            End-to-end standard operating procedures from costume launch to parade day road management.
          </p>
        </div>

        <button
          onClick={handlePrintChecklist}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Printer className="w-3.5 h-3.5" /> Print Checklist
        </button>
      </div>

      {/* Progress Bar Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Playbook Completion Progress</span>
          <span className="text-sm font-black font-display text-pink-400">{completedCount} of {allTaskIds.length} Tasks ({overallPercentage}%)</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Phases Accordion */}
      <div className="space-y-4">
        {PLAYBOOK_PHASES.map((phase) => {
          const isExpanded = expandedPhase === phase.id;
          const phaseTasks = phase.tasks;
          const phaseCompleted = phaseTasks.filter(t => completedTasks[t.id]).length;
          const PhaseIcon = phase.icon;

          return (
            <div
              key={phase.id}
              className="glass-panel rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all shadow-md"
            >
              <button
                type="button"
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <PhaseIcon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">{phase.title}</h3>
                    <p className="text-[11px] text-white/50">{phaseCompleted} / {phaseTasks.length} milestones complete</p>
                  </div>
                </div>

                {isExpanded ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 pt-2 border-t border-white/5 space-y-2.5"
                  >
                    {phaseTasks.map(task => {
                      const isDone = !!completedTasks[task.id];
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                            isDone 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                              : 'bg-white/5 border-white/5 text-white/80 hover:border-white/15'
                          }`}
                        >
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-white/40 flex-shrink-0" />
                          )}
                          <span className={`text-xs font-medium flex-1 ${isDone ? 'line-through opacity-70' : ''}`}>
                            {task.label}
                          </span>
                          {task.critical && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex-shrink-0">
                              Critical
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
