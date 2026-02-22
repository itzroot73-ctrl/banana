import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { MainMenu } from './components/MainMenu';
import { Background } from './components/Background';
import { Shop } from './components/Shop';
import { Cosmetics } from './components/Cosmetics';
import { AccountChanger } from './components/AccountChanger';
import { Settings } from './components/Settings';
import { ModGUI } from './components/ModGUI';

type View = 'loading' | 'main' | 'shop' | 'cosmetics' | 'accounts' | 'settings' | 'mods';

export default function App() {
  const [view, setView] = useState<View>('loading');
  const [showModGUI, setShowModGUI] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Right Shift key code is usually 16, but we can check location
      if (e.key === 'Shift' && e.location === 2) {
        setShowModGUI(prev => !prev);
      }
      // Also allow Escape to close ModGUI
      if (e.key === 'Escape' && (showModGUI || view === 'mods')) {
        setShowModGUI(false);
        if (view === 'mods') setView('main');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModGUI, view]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      
      <AnimatePresence mode="wait">
        {view === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setView('main')} />
        )}
        
        {view === 'main' && (
          <MainMenu key="main" onNavigate={(v) => setView(v as View)} />
        )}
        
        {view === 'shop' && (
          <Shop key="shop" onBack={() => setView('main')} />
        )}
        
        {view === 'cosmetics' && (
          <Cosmetics key="cosmetics" onBack={() => setView('main')} />
        )}
        
        {view === 'accounts' && (
          <AccountChanger key="accounts" onBack={() => setView('main')} />
        )}
        
        {view === 'settings' && (
          <Settings key="settings" onBack={() => setView('main')} />
        )}

        {view === 'mods' && (
          <ModGUI key="mods" onClose={() => setView('main')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModGUI && view !== 'mods' && (
          <ModGUI onClose={() => setShowModGUI(false)} />
        )}
      </AnimatePresence>

      {/* Global Overlay for custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(253, 224, 71, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(253, 224, 71, 0.5);
        }
      `}} />
    </div>
  );
}
