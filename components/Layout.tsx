
import React from 'react';
import { Home, ClipboardList, Star, BookOpen, PenLine } from 'lucide-react';
import { TabType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'opening', icon: Home, label: 'Início' },
    { id: 'guidelines', icon: ClipboardList, label: 'Guia' },
    { id: 'affirmations', icon: Star, label: 'Afirmações' },
    { id: 'prayers', icon: BookOpen, label: 'Orações' },
    { id: 'journal', icon: PenLine, label: 'Diário' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-[#FDFBF7] relative selection:bg-[#B7C9B1]/30">
      <header className="bg-[#FDFBF7]/80 backdrop-blur-md border-b border-stone-100 p-8 text-center sticky top-0 z-50">
        <h1 className="text-4xl font-bold text-stone-900 tracking-tight serif italic">Caminho da Luz</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-[1px] w-8 bg-stone-200"></div>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold outfit">9 Semanas de Despertar</p>
          <div className="h-[1px] w-8 bg-stone-200"></div>
        </div>
      </header>

      <main className="flex-1 p-6 pb-32">
        {children}
      </main>

      <div className="fixed bottom-6 left-0 right-0 max-w-[90%] sm:max-w-md mx-auto z-50">
        <nav className="glass border border-white/20 rounded-[32px] shadow-2xl flex justify-around p-3 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center p-2.5 rounded-2xl transition-all duration-300 relative ${isActive ? 'text-stone-900 bg-white shadow-sm scale-110' : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[8px] mt-1.5 font-bold uppercase tracking-widest outfit ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-stone-800 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
