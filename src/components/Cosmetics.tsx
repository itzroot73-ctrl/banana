import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Sparkles, Zap, Star, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface CosmeticsProps {
  onBack: () => void;
}

const COSMETICS = [
  { id: 'c1', name: 'Classic Cape', type: 'Cape', rarity: 'Common', icon: <Shield size={20} /> },
  { id: 'c2', name: 'Banana Wings', type: 'Wings', rarity: 'Legendary', icon: <Sparkles size={20} /> },
  { id: 'c3', name: 'Star Trail', type: 'Trail', rarity: 'Rare', icon: <Star size={20} /> },
  { id: 'c4', name: 'Neon Crown', type: 'Hat', rarity: 'Epic', icon: <Zap size={20} /> },
];

export const Cosmetics: React.FC<CosmeticsProps> = ({ onBack }) => {
  const [equipped, setEquipped] = useState<string[]>(['c1']);

  const toggleEquip = (id: string) => {
    setEquipped(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-screen flex p-8 gap-8 max-w-7xl mx-auto w-full"
    >
      {/* Left Side: Preview */}
      <div className="flex-1 glass rounded-[40px] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-banana/5 to-transparent" />
        
        {/* Character Preview Placeholder */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-80 bg-white/10 rounded-2xl border border-white/20 flex flex-col items-center p-6"
          >
             <div className="w-24 h-24 bg-white/10 rounded-xl mb-4 overflow-hidden">
                <img src="https://api.mineatar.io/body/full/steve?scale=8" alt="Preview" className="w-full h-full object-contain" />
             </div>
             <div className="w-full h-4 bg-white/10 rounded-full mb-2" />
             <div className="w-2/3 h-4 bg-white/10 rounded-full" />
             
             {/* Visualizing equipped items */}
             <div className="mt-auto flex gap-2">
               {equipped.map(id => (
                 <div key={id} className="w-8 h-8 bg-banana/20 rounded-lg flex items-center justify-center text-banana">
                   {COSMETICS.find(c => c.id === id)?.icon}
                 </div>
               ))}
             </div>
          </motion.div>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-display font-bold uppercase italic">Steve</h2>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Previewing changes</p>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <button className="px-6 py-2 glass rounded-full text-xs font-bold uppercase hover:bg-white/10 transition-all">Rotate</button>
          <button className="px-6 py-2 glass rounded-full text-xs font-bold uppercase hover:bg-white/10 transition-all">Zoom</button>
        </div>
      </div>

      {/* Right Side: Inventory */}
      <div className="w-[400px] flex flex-col gap-6">
        <header className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-display font-bold uppercase italic">Cosmetics</h1>
        </header>

        <div className="flex-1 glass rounded-[32px] p-6 flex flex-col gap-4 overflow-hidden">
          <div className="flex gap-2 mb-2">
            {['All', 'Capes', 'Wings', 'Hats'].map(tab => (
              <button key={tab} className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                tab === 'All' ? "bg-banana text-black" : "bg-white/5 hover:bg-white/10 text-white/60"
              )}>
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
            {COSMETICS.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleEquip(item.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex items-center justify-between group",
                  equipped.includes(item.id) 
                    ? "bg-banana/10 border-banana/50" 
                    : "bg-white/5 border-transparent hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    equipped.includes(item.id) ? "bg-banana text-black" : "bg-white/10 text-white/60 group-hover:text-white"
                  )}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className={cn(
                      "text-[10px] font-mono uppercase tracking-widest",
                      item.rarity === 'Legendary' ? "text-amber-400" : "text-white/40"
                    )}>{item.rarity}</p>
                  </div>
                </div>
                {equipped.includes(item.id) && (
                  <div className="w-6 h-6 bg-banana rounded-full flex items-center justify-center text-black">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <button className="w-full py-4 bg-banana text-black rounded-2xl font-bold uppercase tracking-widest hover:bg-banana-dark transition-all mt-4">
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};
