import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Monitor, Cpu, Palette, Sliders, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface SettingsProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'general', name: 'General', icon: <Sliders size={18} /> },
  { id: 'graphics', name: 'Graphics', icon: <Monitor size={18} /> },
  { id: 'performance', name: 'Performance', icon: <Cpu size={18} /> },
  { id: 'appearance', name: 'Appearance', icon: <Palette size={18} /> },
  { id: 'about', name: 'About', icon: <Info size={18} /> },
];

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-screen flex p-8 gap-8 max-w-6xl mx-auto w-full"
    >
      {/* Sidebar */}
      <div className="w-64 flex flex-col gap-6">
        <header className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-display font-bold uppercase italic">Settings</h1>
        </header>

        <div className="flex-1 glass rounded-[32px] p-4 flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "w-full p-4 rounded-2xl flex items-center gap-4 transition-all group",
                activeCategory === cat.id 
                  ? "bg-banana text-black" 
                  : "bg-transparent hover:bg-white/5 text-white/60 hover:text-white"
              )}
            >
              <div className={cn(
                "transition-colors",
                activeCategory === cat.id ? "text-black" : "text-white/40 group-hover:text-white"
              )}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 glass rounded-[40px] p-10 flex flex-col gap-8 overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-display font-bold uppercase italic">{activeCategory}</h2>
          <div className="flex gap-2">
            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">Reset to Defaults</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-mono text-white/20 uppercase tracking-[0.3em]">Visual Enhancements</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Dynamic Shadows', desc: 'Real-time shadows based on sun position', value: true },
                { name: 'Motion Blur', desc: 'Cinematic blur effect during movement', value: false },
                { name: 'Anti-Aliasing', desc: 'Smooth out jagged edges on blocks', value: '4x' },
                { name: 'Render Distance', desc: 'How many chunks are visible at once', value: '16 Chunks' },
                { name: 'GitHub Sync', desc: 'Automatically sync settings with GitHub Gist', value: true },
                { name: 'Rich Presence', desc: 'Show your GitHub status in-game', value: false },
              ].map((setting, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl flex items-center justify-between border border-transparent hover:border-white/5 transition-all">
                  <div>
                    <p className="font-bold">{setting.name}</p>
                    <p className="text-xs text-white/40">{setting.desc}</p>
                  </div>
                  {typeof setting.value === 'boolean' ? (
                    <button className={cn(
                      "w-12 h-6 rounded-full relative transition-colors",
                      setting.value ? "bg-banana" : "bg-white/10"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full transition-all",
                        setting.value ? "right-1 bg-black" : "left-1 bg-white/40"
                      )} />
                    </button>
                  ) : (
                    <button className="px-4 py-2 glass rounded-xl text-xs font-bold uppercase hover:bg-white/10 transition-all">
                      {setting.value}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
