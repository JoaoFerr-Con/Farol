import React, { useEffect, useRef, useState } from 'react';
import { NavTab, ScreenType } from '../types';
import { getTreeStage } from '../utils/treeStage';

interface BottomNavBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNavigateScreen?: (screen: ScreenType) => void;
  gotas?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  onNavigateScreen,
  gotas = 0
}) => {
  const [justGrew, setJustGrew] = useState(false);
  const prevGotasRef = useRef(gotas);

  // Dispara um "pop" no ícone da árvore sempre que as gotas aumentam,
  // dando um preview vivo do crescimento direto na navegação.
  useEffect(() => {
    if (gotas > prevGotasRef.current) {
      setJustGrew(true);
      const t = setTimeout(() => setJustGrew(false), 620);
      prevGotasRef.current = gotas;
      return () => clearTimeout(t);
    }
    prevGotasRef.current = gotas;
  }, [gotas]);

  const tabs: { id: NavTab; label: string; icon: string; targetScreen: ScreenType }[] = [
    { id: 'home', label: 'Início', icon: 'home', targetScreen: 'dashboard' },
    { id: 'checkin', label: 'Check-in', icon: 'fact_check', targetScreen: 'checkin' },
    { id: 'health', label: 'Saúde', icon: 'favorite', targetScreen: 'health' },
    { id: 'selfcare', label: 'Autocuidado', icon: 'spa', targetScreen: 'selfcare' }
  ];

  const handleClick = (tabId: NavTab, targetScreen: ScreenType) => {
    onSelectTab(tabId);
    if (onNavigateScreen) {
      onNavigateScreen(targetScreen);
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#14181F] text-white rounded-full px-4 py-2 shadow-2xl flex items-center gap-2 sm:gap-6 border border-neutral-700/50 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHome = tab.id === 'home';
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id, tab.targetScreen)}
            title={isHome ? `Sua árvore: ${gotas} gotas acumuladas` : undefined}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-[#E9DDFF] text-[#210F49] font-bold shadow-md scale-105 px-4'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            {isHome ? (
              <span
                className={`text-xl leading-none inline-block ${justGrew ? 'animate-nav-pop' : ''}`}
                aria-hidden="true"
              >
                {getTreeStage(gotas).icon}
              </span>
            ) : (
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wide font-medium mt-0.5 whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
