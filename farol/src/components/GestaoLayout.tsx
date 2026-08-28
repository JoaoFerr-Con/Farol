import React from 'react';
import { ScreenType, ViewMode } from '../types';

interface GestaoLayoutProps {
  currentScreen: ScreenType;
  onNavigateScreen: (screen: ScreenType) => void;
  viewMode: ViewMode;
  onSwitchPersona: () => void;
  children: React.ReactNode;
}

const NAV_ITEMS: { id: ScreenType; label: string; icon: string }[] = [
  { id: 'gestao-painel', label: 'Painel por Setor', icon: 'dashboard' },
  { id: 'gestao-engajamento', label: 'Engajamento', icon: 'groups' },
  { id: 'gestao-alertas', label: 'Alertas', icon: 'warning' },
  { id: 'gestao-relatorios', label: 'Relatórios', icon: 'description' },
  { id: 'gestao-config', label: 'Configurações', icon: 'settings' }
];

// Itens visíveis na barra inferior (mobile) — versão enxuta dos 5 acima.
const MOBILE_NAV_ITEMS: { id: ScreenType; label: string; icon: string }[] = [
  { id: 'gestao-painel', label: 'Painel', icon: 'dashboard' },
  { id: 'gestao-engajamento', label: 'Engaj.', icon: 'groups' },
  { id: 'gestao-alertas', label: 'Alertas', icon: 'warning' },
  { id: 'gestao-relatorios', label: 'Relat.', icon: 'description' }
];

export const GestaoLayout: React.FC<GestaoLayoutProps> = ({
  currentScreen,
  onNavigateScreen,
  viewMode,
  onSwitchPersona,
  children
}) => {
  const isDesktop = viewMode === 'desktop';

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#1C1B1C] flex">
      {/* Sidebar — só no modo desktop, controlado manualmente pelo viewMode */}
      {isDesktop && (
        <aside className="group fixed left-0 top-0 h-full z-40 flex flex-col bg-[#14181F] w-16 hover:w-60 transition-all duration-300 ease-in-out overflow-hidden shadow-xl">
          <div className="flex items-center h-16 min-h-[64px] px-4 w-full gap-3">
            <span
              className="material-symbols-outlined text-white text-2xl shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monitor_heart
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="text-sm font-bold text-white leading-tight">Anjo da Guarda</p>
              <p className="text-[10px] text-[#B9A6E8] uppercase tracking-wider">Gestão Industrial</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto mt-2 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateScreen(item.id)}
                  className={`w-full flex items-center gap-4 h-12 rounded-xl mb-1 transition-colors px-3 ${
                    isActive
                      ? 'bg-[#E9DDFF] text-[#210F49] font-bold'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.label}
                >
                  <span
                    className="material-symbols-outlined shrink-0"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mb-4 px-2">
            <button
              onClick={() => onNavigateScreen('dashboard')}
              className="w-full flex items-center gap-4 h-12 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors px-3"
              title="Sair do modo Gestão"
            >
              <span className="material-symbols-outlined shrink-0">logout</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs font-semibold">
                Sair
              </span>
            </button>
          </div>
        </aside>
      )}

      {/* Conteúdo principal */}
      <div className={`flex-1 flex flex-col min-w-0 ${isDesktop ? 'ml-16' : ''}`}>
        <header className="bg-white/80 backdrop-blur-md flex justify-between items-center w-full h-16 px-4 sm:px-8 shadow-sm sticky top-0 z-30">
          <span className="font-black text-[#181C23] text-sm sm:text-base">Anjo da Guarda | Farol</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchPersona}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9DDFF] text-[#210F49] hover:bg-[#d5c2fc] text-xs font-semibold transition-colors"
              title="Alternar para a visão do Colaborador"
            >
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
              <span>Ver como Colaborador</span>
            </button>
            <button className="text-neutral-500 hover:text-[#181C23] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#E9DDFF] flex items-center justify-center overflow-hidden border border-neutral-200">
              <span className="material-symbols-outlined text-[#210F49] text-lg">account_circle</span>
            </div>
          </div>
        </header>

        <main className={`flex-1 w-full max-w-[1440px] mx-auto p-4 sm:p-6 ${!isDesktop ? 'pb-28' : 'pb-10'}`}>
          {children}
        </main>
      </div>

      {/* Bottom nav — só no modo mobile, controlado manualmente pelo viewMode */}
      {!isDesktop && (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#14181F] text-white rounded-full px-3 py-2 shadow-2xl flex items-center gap-1 border border-neutral-700/50 backdrop-blur-md">
          {MOBILE_NAV_ITEMS.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateScreen(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#E9DDFF] text-[#210F49] font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="text-[9px] uppercase tracking-wide font-medium mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};
