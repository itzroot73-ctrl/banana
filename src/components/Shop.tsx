import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';

interface ShopProps {
  onBack: () => void;
}

const SHOP_ITEMS = [
  { id: 1, name: 'Banana Cape', price: '$4.99', type: 'Cape', color: 'bg-yellow-500', icon: <Zap size={24} /> },
  { id: 2, name: 'Golden Wings', price: '$9.99', type: 'Wings', color: 'bg-amber-400', icon: <Star size={24} /> },
  { id: 3, name: 'Neon Aura', price: '$7.49', type: 'Effect', color: 'bg-cyan-400', icon: <Sparkles size={24} /> },
  { id: 4, name: 'Elite Rank', price: '$14.99', type: 'Rank', color: 'bg-purple-500', icon: <ShieldCheck size={24} /> },
  { id: 5, name: 'Banana Hat', price: '$2.99', type: 'Hat', color: 'bg-yellow-300', icon: <Banana size={24} /> },
  { id: 6, name: 'Shadow Trail', price: '$5.99', type: 'Trail', color: 'bg-zinc-800', icon: <Zap size={24} /> },
];

import { Banana, Sparkles } from 'lucide-react';

export const Shop: React.FC<ShopProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-screen flex flex-col p-8 max-w-6xl mx-auto w-full"
    >
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-4xl font-display font-bold uppercase italic tracking-tighter">
              Client <span className="text-banana">Shop</span>
            </h1>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Support the development</p>
          </div>
        </div>
        
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-mono text-white/40 uppercase">Balance</p>
            <p className="text-lg font-bold text-banana">$24.50</p>
          </div>
          <div className="w-10 h-10 bg-banana/20 rounded-xl flex items-center justify-center text-banana">
            <ShoppingBag size={20} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-4 custom-scrollbar">
        {SHOP_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-6 flex flex-col gap-4 group cursor-pointer border-white/5 hover:border-banana/30 transition-all"
          >
            <div className={`w-full aspect-video rounded-2xl ${item.color} flex items-center justify-center text-black/80 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {item.icon}
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{item.type}</span>
                <h3 className="text-xl font-bold">{item.name}</h3>
              </div>
              <p className="text-lg font-display font-bold text-banana">{item.price}</p>
            </div>
            
            <button className="w-full py-3 bg-white/5 hover:bg-banana hover:text-black rounded-xl font-bold text-sm transition-all uppercase tracking-wider">
              Purchase Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
