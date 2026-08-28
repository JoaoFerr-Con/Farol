import React from 'react';
import { ScreenType } from '../types';

interface TopHeaderProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onSwitchPersona?: () => void;
  title?: string;
  subtitle?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onNavigateScreen,
  onSwitchPersona,
  title = 'Anjo da Guarda | Farol',
  subtitle = 'Saúde Mental & Gestão Ocupacional'
}) => {
  const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCf0d5dyv49oD6HvLOsvNTxlwHyL5vebxMQ5C_QWipyIPUaEE6KH6ce6GKQMv272dF76KnibY_5e3gtDumTXs8OebOZeMNA3jQz4L0qwP4-Z_moKdkg3pPZ6Ea_NdjTIJRy7XQcJVMQ3FiSX3G6rqVWPIC_JbNO5PpdoJQJ-DUOVbFRVrga9syHPIx6MetSc7JhGyDG6Adt7m0RFPqhfc7xZpMSTa5qQqyJ1IGbu_403qTsYfHVf6Tg';

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-20 transition-all">
      <div>
        <h1 className="text-base sm:text-lg font-bold text-[#181C23] tracking-tight">{title}</h1>
        <p className="text-xs text-neutral-500 hidden sm:block">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {onSwitchPersona && (
          <button
            onClick={onSwitchPersona}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9DDFF] text-[#210F49] hover:bg-[#d5c2fc] text-xs font-semibold transition-colors"
            title="Alternar para a visão de Gestão"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            <span>Ver como Gestão</span>
          </button>
        )}

        <button
          onClick={() => alert('Você tem 1 sessão agendada esta semana.')}
          className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          title="Notificações"
        >
          <span className="material-symbols-outlined text-lg">notifications</span>
        </button>

        <button
          onClick={() => onNavigateScreen('login')}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-neutral-100 transition-colors"
          title="Meu perfil"
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
