import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BananaLogo } from './BananaLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <BananaLogo size={120} />
        
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase italic text-white">
            BANANA <span className="text-banana drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]">CLIENT</span>
          </h1>
          <p className="text-xs font-mono text-white/40 tracking-[0.4em] uppercase">
            Preparing your experience
          </p>
        </div>

        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mt-8">
          <motion.div
            className="h-full bg-banana shadow-[0_0_15px_rgba(253,224,71,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-[10px] font-mono text-white/20 mt-2">
          {Math.round(progress)}%
        </div>
      </motion.div>
    </motion.div>
  );
};
