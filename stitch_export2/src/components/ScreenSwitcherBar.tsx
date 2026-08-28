import React from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onOpenImageDrawer: () => void;
  hasHistory: boolean;
  onToggleDemoData: () => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  isDeviceFrame,
  onToggleDeviceFrame,
  onOpenImageDrawer,
  hasHistory,
  onToggleDemoData
}) => {
  const screens: { id: ScreenType; label: string; icon: string; badge?: string }[] = [
    { id: 'consent', label: '1. Termos & LGPD', icon: 'security' },
    { id: 'login', label: '2. Login Colaborador', icon: 'login' },
    { id: 'dashboard', label: '3. Meu Painel (Jardim)', icon: 'potted_plant', badge: 'Shader WebGL' },
    { id: 'checkin', label: '4. Check-in NR-01', icon: 'fact_check' },
    { id: 'checkin-success', label: '5. Sucesso Check-in', icon: 'celebration', badge: 'Confetes' },
    { id: 'health', label: '6. Minha Saúde', icon: 'favorite' },
    { id: 'selfcare', label: '7. Catálogo Autocuidado', icon: 'spa' },
    { id: 'booking', label: '8. Agendar Psicoterapia', icon: 'calendar_month' },
    { id: 'session', label: '9. Sessão Mindfulness', icon: 'self_improvement', badge: 'Timer' }
  ];

  return (
    <div className="bg-[#14181F] text-white border-b border-neutral-800 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs sticky top-0 z-50 shadow-md">
      {/* Brand & Direct Links Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 font-bold tracking-wide text-white">
          <span className="material-symbols-outlined text-[#B9A6E8] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            flare
          </span>
          <span className="hidden sm:inline">Anjo da Guarda</span>
          <span className="text-[#B9A6E8] font-normal">| Farol</span>
        </div>

        {/* Highlighted Direct Image Links Button */}
        <button
          onClick={onOpenImageDrawer}
          className="flex items-center gap-1.5 bg-[#655590] hover:bg-[#7866a8] text-white px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all shadow-sm active:scale-95 border border-[#B9A6E8]/30"
          title="Ver e copiar todos os links diretos das imagens do HTML"
        >
          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
            photo_library
          </span>
          <span>Links das Imagens</span>
          <span className="bg-[#E9DDFF] text-[#210F49] px-1 rounded-full text-[9px] font-bold">9</span>
        </button>
      </div>

      {/* Screen selector buttons */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 scrollbar-none">
        {screens.map((sc) => {
          const isActive = currentScreen === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => onSelectScreen(sc.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#B9A6E8] text-[#181C23] font-bold shadow-sm'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xs">{sc.icon}</span>
              <span>{sc.label}</span>
              {sc.badge && !isActive && (
                <span className="hidden lg:inline text-[9px] px-1 rounded bg-neutral-800 text-neutral-400">
                  {sc.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Frame Mode switch */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onToggleDemoData}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] transition-colors border ${
            hasHistory
              ? 'bg-neutral-800 text-[#7FD1AE] border-[#7FD1AE]/40'
              : 'bg-neutral-800 text-[#B9A6E8] border-[#B9A6E8]/40'
          }`}
          title="Alternar entre estado de primeiro acesso (zerado) e uso contínuo (com histórico), para demonstração"
        >
          <span className="material-symbols-outlined text-xs">
            {hasHistory ? 'history' : 'new_releases'}
          </span>
          <span className="hidden sm:inline">
            {hasHistory ? 'Demo: uso contínuo' : 'Demo: primeiro acesso'}
          </span>
        </button>
        <button
          onClick={onToggleDeviceFrame}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] transition-colors border ${
            isDeviceFrame
              ? 'bg-neutral-800 text-[#B9A6E8] border-[#B9A6E8]/40'
              : 'bg-transparent text-neutral-400 border-neutral-700 hover:text-white'
          }`}
          title="Alternar entre visualização Mobile e Layout Responsivo Completo"
        >
          <span className="material-symbols-outlined text-xs">
            {isDeviceFrame ? 'smartphone' : 'laptop'}
          </span>
          <span className="hidden md:inline">{isDeviceFrame ? 'Modo Mobile' : 'Modo Desktop'}</span>
        </button>
      </div>
    </div>
  );
};
