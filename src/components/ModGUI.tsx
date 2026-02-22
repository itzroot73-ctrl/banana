import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Settings, 
  Search, 
  Layout, 
  Sword, 
  Zap, 
  Eye, 
  MousePointer2, 
  Activity,
  Check,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';
import { BananaLogo } from './BananaLogo';

interface Mod {
  id: string;
  name: string;
  description: string;
  category: 'HUD' | 'Combat' | 'Movement' | 'Visual';
  enabled: boolean;
}

const INITIAL_MODS: Mod[] = [
  { id: 'fps', name: 'FPS Display', description: 'Shows your current frames per second', category: 'HUD', enabled: true },
  { id: 'cps', name: 'CPS Counter', description: 'Shows your clicks per second', category: 'HUD', enabled: true },
  { id: 'keystrokes', name: 'Keystrokes', description: 'Displays WASD and mouse buttons', category: 'HUD', enabled: false },
  { id: 'armor', name: 'Armor Status', description: 'Shows durability of your armor', category: 'HUD', enabled: true },
  { id: 'reach', name: 'Reach Display', description: 'Shows your attack reach distance', category: 'Combat', enabled: false },
  { id: 'toggle-sprint', name: 'Toggle Sprint', description: 'Automatically sprint without holding key', category: 'Movement', enabled: true },
  { id: 'fullbright', name: 'Fullbright', description: 'Makes everything bright in the dark', category: 'Visual', enabled: false },
  { id: 'zoom', name: 'Optifine Zoom', description: 'Smooth zoom functionality', category: 'Visual', enabled: true },
];

interface ModGUIProps {
  onClose: () => void;
}

export const ModGUI: React.FC<ModGUIProps> = ({ onClose }) => {
  const [mods, setMods] = useState<Mod[]>(INITIAL_MODS);
  const [activeCategory, setActiveCategory] = useState<string>('HUD');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMod = (id: string) => {
    setMods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const filteredMods = mods.filter(m => 
    m.category === activeCategory && 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: 'HUD', icon: <Layout size={18} /> },
    { id: 'Combat', icon: <Sword size={18} /> },
    { id: 'Movement', icon: <Zap size={18} /> },
    { id: 'Visual', icon: <Eye size={18} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-6xl h-[750px] bg-[#0F0F0F] rounded-[24px] overflow-hidden flex flex-col border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-6 bg-[#141414] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <BananaLogo size={40} />
              <h1 className="text-xl font-display font-black uppercase italic tracking-tight">
                MOD <span className="text-banana">MENU</span>
              </h1>
            </div>
            
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
              <div className="w-2 h-2 bg-banana rounded-full animate-pulse" />
              <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest">2024/02/19 07:44 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="Search mods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/60 border border-white/5 rounded-xl py-2.5 pl-10 pr-6 text-xs focus:outline-none focus:border-banana/30 transition-all w-64 font-mono"
              />
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-24 bg-[#111111] border-r border-white/5 flex flex-col items-center py-8 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all group relative gap-1",
                  activeCategory === cat.id 
                    ? "bg-banana text-black shadow-[0_0_20px_rgba(253,224,71,0.2)]" 
                    : "bg-transparent text-white/20 hover:bg-white/5 hover:text-white"
                )}
              >
                {cat.icon}
                <span className={cn(
                  "text-[8px] font-bold uppercase tracking-tighter",
                  activeCategory === cat.id ? "text-black" : "text-white/20"
                )}>{cat.id}</span>
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -left-0 w-1 h-8 bg-banana rounded-r-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#0A0A0A]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMods.map((mod) => (
                <div 
                  key={mod.id}
                  className={cn(
                    "p-6 rounded-[20px] border transition-all flex flex-col gap-6 group relative overflow-hidden",
                    mod.enabled 
                      ? "bg-[#141414] border-banana/20" 
                      : "bg-[#111111] border-white/5 hover:border-white/10"
                  )}
                >
                  {mod.enabled && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-banana/50" />
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-lg tracking-tight uppercase italic">{mod.name}</h3>
                        {mod.id === 'fps' && <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[8px] font-black uppercase rounded-md">New!</span>}
                      </div>
                      <p className="text-[11px] text-white/30 mt-1 font-medium leading-relaxed uppercase tracking-tight">{mod.description}</p>
                    </div>
                    <button className="text-white/10 hover:text-banana transition-colors">
                      <Star size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-center py-4 bg-black/20 rounded-xl border border-white/5">
                    {mod.id === 'fps' && <Activity size={32} className="text-white/10" />}
                    {mod.id === 'cps' && <MousePointer2 size={32} className="text-white/10" />}
                    {mod.id === 'zoom' && <Eye size={32} className="text-white/10" />}
                    {mod.id === 'toggle-sprint' && <Zap size={32} className="text-white/10" />}
                    {!['fps', 'cps', 'zoom', 'toggle-sprint'].includes(mod.id) && <Layout size={32} className="text-white/10" />}
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/40 transition-all border border-white/5">
                      <Settings size={16} />
                    </button>
                    <button 
                      onClick={() => toggleMod(mod.id)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all border",
                        mod.enabled 
                          ? "bg-banana text-black border-banana-dark shadow-[0_5px_15px_rgba(253,224,71,0.2)]" 
                          : "bg-white/5 text-white/20 border-white/5 hover:bg-white/10"
                      )}
                    >
                      {mod.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-80 border-l border-white/5 bg-[#0F0F0F] p-8 flex flex-col gap-6">
            <h2 className="text-xs font-mono text-white/20 uppercase tracking-[0.3em]">HUD Preview</h2>
            
            <div className="flex-1 bg-black/40 rounded-3xl relative overflow-hidden p-4 border border-white/5">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/mc/400/600')] opacity-10 grayscale" />
              
              {/* Simulated HUD Elements */}
              <div className="relative z-10 flex flex-col gap-2">
                {mods.filter(m => m.enabled && m.category === 'HUD').map(m => (
                  <div key={m.id} className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono flex justify-between">
                    <span className="text-white/40">{m.name.split(' ')[0]}</span>
                    <span className="text-banana">
                      {m.id === 'fps' ? '144' : m.id === 'cps' ? '12.4' : 'OK'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-4 h-4 border border-white/40 rounded-full" />
                <div className="absolute w-0.5 h-0.5 bg-white" />
              </div>
            </div>

            <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border border-white/5">
              Edit HUD Layout
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
