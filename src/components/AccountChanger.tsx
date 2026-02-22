import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, UserPlus, Trash2, Shield, AlertCircle, Github } from 'lucide-react';

interface AccountChangerProps {
  onBack: () => void;
}

const ACCOUNTS = [
  { id: '1', name: 'Steve', type: 'Microsoft', active: true, uuid: 'steve' },
  { id: '2', name: 'BananaLover', type: 'Mojang', active: false, uuid: 'alex' },
  { id: '3', name: 'GitHub_Dev', type: 'GitHub', active: false, uuid: '6833345' }, // Using a numeric ID for GitHub avatar simulation
];

export const AccountChanger: React.FC<AccountChangerProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-screen flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl glass rounded-[40px] p-10 flex flex-col gap-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-3xl font-display font-bold uppercase italic">Account <span className="text-banana">Manager</span></h1>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 glass text-white rounded-xl font-bold uppercase text-[10px] hover:bg-white/10 transition-all">
              <Github size={14} />
              Link GitHub
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-banana text-black rounded-xl font-bold uppercase text-[10px] hover:bg-banana-dark transition-all">
              <UserPlus size={14} />
              Add Account
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {ACCOUNTS.map((acc) => (
            <div 
              key={acc.id}
              className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${
                acc.active ? 'bg-banana/5 border-banana/30' : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                   <img 
                    src={acc.type === 'GitHub' ? `https://avatars.githubusercontent.com/u/${acc.uuid}?v=4` : `https://api.mineatar.io/face/${acc.uuid}?scale=8`} 
                    alt={acc.name} 
                    className="w-full h-full object-cover" 
                   />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{acc.name}</h3>
                    {acc.active && <span className="px-2 py-0.5 bg-banana text-black text-[8px] font-black uppercase rounded-full">Active</span>}
                  </div>
                  <p className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                    {acc.type === 'GitHub' ? <Github size={10} /> : <Shield size={10} />} {acc.type} Authentication
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!acc.active && (
                  <button className="px-6 py-2 glass rounded-xl text-xs font-bold uppercase hover:bg-white/10 transition-all">
                    Switch
                  </button>
                )}
                <button className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="bg-white/5 p-6 rounded-3xl flex items-start gap-4">
          <AlertCircle className="text-banana shrink-0" size={20} />
          <p className="text-xs text-white/40 leading-relaxed">
            Your login credentials are encrypted and stored locally. We never share your data with third parties. 
            Make sure you are using a secure connection when adding new accounts.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};
