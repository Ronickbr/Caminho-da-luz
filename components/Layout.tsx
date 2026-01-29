
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
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-xl relative">
      <header className="bg-stone-50 border-b border-stone-200 p-6 text-center sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Caminho da Luz</h1>
        <p className="text-stone-500 text-sm mt-1 uppercase tracking-widest font-medium">9 Semanas de Transformação</p>
      </header>

      <main className="flex-1 p-6 pb-24 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t border-stone-200 flex justify-around p-2 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? 'text-stone-900 bg-stone-100' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] mt-1 font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
