import React from 'react';
import { ScreenType } from '../types';

interface SideNavBarProps {
  currentScreen: ScreenType;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ currentScreen, onNavigateScreen }) => {
  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuF9zIu2nOuzTgqcgVuaXa7Z-k3Q0PSb1CFKy8GXXlZvWxhzf0bcK7M-Qi9ldpQUj81J3eQosOIFocckZ8GPpCGpw4itWoJry2s1YjMoMMdej48BJqmky5kPn1sWo_OdU0HJYTJnH8HgtQN3WAI8OP5GWhrh-WPEW67tAPbC1Xs8ZsFxK9PjpCSSWt90WyP59kYOZP7y32a2Dpqjmgiwobs86EjnSkHuK5XRS8K20F4AKa_oxVpldjzQ';

  const menuItems: { id: string; label: string; icon: string; targetScreen?: ScreenType }[] = [
    { id: 'dashboard', label: 'Painel por Setor', icon: 'dashboard', targetScreen: 'dashboard' },
    { id: 'checkin', label: 'Check-in Psicossocial', icon: 'fact_check', targetScreen: 'checkin' },
    { id: 'selfcare', label: 'Autocuidado & Jardim', icon: 'spa', targetScreen: 'selfcare' },
    { id: 'therapy', label: 'Psicoterapia Breve', icon: 'calendar_month', targetScreen: 'booking' },
    { id: 'engagement', label: 'Engajamento', icon: 'groups' },
    { id: 'alerts', label: 'Alertas NR-01', icon: 'warning' },
    { id: 'reports', label: 'Relatórios Ocupacionais', icon: 'description' }
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-10 h-[calc(100vh-40px)] w-60 bg-[#181C23] text-white flex-col p-4 z-30 shadow-xl border-r border-neutral-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-6 px-2 pt-2">
        <div className="w-10 h-10 rounded-full bg-[#E9DDFF] flex items-center justify-center overflow-hidden shrink-0 border border-white/20">
          <img src={logoUrl} alt="Ícone Farol" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-white tracking-tight leading-tight">Anjo da Guarda</h1>
          <p className="text-xs text-[#B9A6E8] font-medium">Programa Farol</p>
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const isActive = item.targetScreen && currentScreen === item.targetScreen;
          return (
            <button
              key={item.id}
              onClick={() => item.targetScreen && onNavigateScreen(item.targetScreen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#B9A6E8] text-[#181C23] font-bold shadow-md'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer CTA & Settings */}
      <div className="pt-4 border-t border-neutral-800 space-y-2">
        <button
          onClick={() => onNavigateScreen('booking')}
          className="w-full bg-[#655590] hover:bg-[#7866a8] text-white rounded-xl py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">calendar_add_on</span>
          <span>Agendar Sessão</span>
        </button>

        <button
          onClick={() => onNavigateScreen('consent')}
          className="w-full flex items-center gap-3 text-neutral-400 hover:text-white px-3 py-2 rounded-xl text-xs transition-colors hover:bg-neutral-800"
        >
          <span className="material-symbols-outlined text-lg">verified_user</span>
          <span>Termos & LGPD</span>
        </button>
      </div>
    </aside>
  );
};
