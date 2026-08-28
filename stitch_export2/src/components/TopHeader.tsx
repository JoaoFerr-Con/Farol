import React from 'react';
import { ScreenType } from '../types';

interface TopHeaderProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
  title?: string;
  subtitle?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onNavigateScreen,
  onOpenImageDrawer,
  title = 'Anjo da Guarda | Farol',
  subtitle = 'Saúde Mental & Gestão Ocupacional'
}) => {
  const managerAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kql5o1-deREIj9at3_hnpL1wX3FzJTXZgu1j2qOaMmEqu2BJ5uLmSptA9ki0V29pDNBPgpmOzy9-z0flfUM0Ev-pur1UdMxqOGLCsNAFevtX1iNYfBA7o0sZ4EOvIzuthXqHIG1mmL7ZqD58bDcypBiPxk9GMGp15CYX1Neyos27DWc8jVyAGVw-3ROoizyeW1j2RG8fFT6aHwuT6Ci7GKa-kKn95YfqDHdTeCQB7sLr296Bzp53ZQ';
  const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCf0d5dyv49oD6HvLOsvNTxlwHyL5vebxMQ5C_QWipyIPUaEE6KH6ce6GKQMv272dF76KnibY_5e3gtDumTXs8OebOZeMNA3jQz4L0qwP4-Z_moKdkg3pPZ6Ea_NdjTIJRy7XQcJVMQ3FiSX3G6rqVWPIC_JbNO5PpdoJQJ-DUOVbFRVrga9syHPIx6MetSc7JhGyDG6Adt7m0RFPqhfc7xZpMSTa5qQqyJ1IGbu_403qTsYfHVf6Tg';

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-10 z-20 transition-all">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#181C23] tracking-tight">{title}</h1>
          <p className="text-xs text-neutral-500 hidden sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Links Button */}
        <button
          onClick={onOpenImageDrawer}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9DDFF] text-[#210F49] hover:bg-[#d5c2fc] text-xs font-semibold transition-colors border border-[#655590]/20"
        >
          <span className="material-symbols-outlined text-sm">photo_library</span>
          <span>Links Imagens HTML</span>
        </button>

        <button
          onClick={() => alert('Notificações: Você tem 1 sessão agendada e 92 gotas acumuladas!')}
          className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          title="Notificações"
        >
          <span className="material-symbols-outlined text-lg">notifications</span>
        </button>

        <button
          onClick={() => onNavigateScreen('login')}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-neutral-100 transition-colors"
          title="Perfil do Colaborador"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-300 ring-2 ring-[#B9A6E8]/30">
            <img src={userAvatar} alt="Minha foto de perfil" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-semibold text-neutral-800 hidden md:inline">Colaborador</span>
        </button>
      </div>
    </header>
  );
};
