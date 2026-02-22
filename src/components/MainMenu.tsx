import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ShoppingBag, 
  User, 
  Settings, 
  LogOut, 
  Globe, 
  Shield,
  Banana,
  Sparkles,
  Github,
  Layout
} from 'lucide-react';
import { cn } from '../lib/utils';

import { BananaLogo } from './BananaLogo';

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center p-8">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <BananaLogo size={48} />
          <div>
            <h2 className="text-xl font-display font-black leading-tight tracking-tight">BANANA CLIENT</h2>
            <p className="text-[10px] font-mono text-banana uppercase tracking-widest font-bold">PREMIUM EDITION</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('accounts')}
            className="flex items-center gap-3 px-5 py-2.5 glass rounded-2xl hover:bg-white/10 transition-all group border-white/5"
          >
            <div className="text-right">
              <p className="text-sm font-bold">Steve</p>
              <p className="text-[10px] text-white/40 font-mono">CONNECTED</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-xl overflow-hidden border border-white/10 group-hover:border-banana/50 transition-colors shadow-inner">
               <img src="https://api.mineatar.io/face/steve?scale=8" alt="Avatar" className="w-full h-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Center Logo */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="relative mb-4">
          <BananaLogo size={160} />
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 text-banana drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]"
          >
            <Sparkles size={48} />
          </motion.div>
        </div>
        <h1 className="text-9xl font-display font-black italic tracking-tighter uppercase text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          BANANA
        </h1>
        <p className="text-sm font-mono text-banana uppercase tracking-[0.8em] mt-[-15px] font-bold opacity-90">
          THE ULTIMATE CLIENT
        </p>
      </motion.div>

      {/* Main Buttons */}
      <div className="grid grid-cols-1 gap-3 w-full max-w-md">
        <button className="minecraft-btn minecraft-btn-primary group">
          <Play size={18} className="group-hover:scale-110 transition-transform" />
          Launch Minecraft
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('shop')}
            className="minecraft-btn group"
          >
            <ShoppingBag size={18} className="text-banana group-hover:scale-110 transition-transform" />
            Shop
          </button>
          <button 
            onClick={() => onNavigate('cosmetics')}
            className="minecraft-btn group"
          >
            <Sparkles size={18} className="text-banana group-hover:scale-110 transition-transform" />
            Cosmetics
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => onNavigate('settings')}
            className="minecraft-btn p-3"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          <button 
            onClick={() => onNavigate('mods')}
            className="minecraft-btn p-3" 
            title="Mod Settings"
          >
            <Layout size={18} className="text-banana" />
          </button>
          <button className="minecraft-btn p-3" title="Multiplayer">
            <Globe size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-mono text-white/20 uppercase">Connected to</p>
          <p className="text-xs font-bold text-white/60">Banana Network (Global)</p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-white/20 hover:text-banana transition-colors uppercase tracking-widest flex items-center gap-1">
            <Github size={10} /> GitHub
          </a>
          <a href="#" className="text-[10px] font-mono text-white/20 hover:text-banana transition-colors uppercase tracking-widest">Discord</a>
          <a href="#" className="text-[10px] font-mono text-white/20 hover:text-banana transition-colors uppercase tracking-widest">Twitter</a>
          <a href="#" className="text-[10px] font-mono text-white/20 hover:text-banana transition-colors uppercase tracking-widest">Support</a>
        </div>

        <button className="flex items-center gap-2 text-[10px] font-mono text-white/20 hover:text-red-400 transition-colors uppercase tracking-widest">
          <LogOut size={12} />
          Exit Client
        </button>
      </div>
    </div>
  );
};
