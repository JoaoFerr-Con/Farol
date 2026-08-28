import React, { useState } from 'react';
import { ScreenType } from '../types';

interface Props {
  onNavigateScreen: (screen: ScreenType) => void;
}

const SLIDES = [
  {
    icon: '🛡️',
    title: 'Sua Segurança em Primeiro Lugar',
    text: 'Um porto seguro para sua saúde mental no ambiente industrial.'
  },
  {
    icon: '🌱',
    title: 'Crescimento e Bem-estar',
    text: 'Acompanhe sua evolução através do Jardim de Autocuidado e ganhe recompensas.'
  },
  {
    icon: '🔒',
    title: 'Privacidade Garantida',
    text: 'Seus dados estão protegidos sob a LGPD e as diretrizes da NR-01.'
  }
];

export const WelcomeScreen: React.FC<Props> = ({ onNavigateScreen }) => {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="min-h-screen w-full bg-[#F6F8FA] flex flex-col items-center justify-between p-6 text-center">
      <div className="w-full flex justify-between items-center pt-2">
        <span />
        <span className="font-bold text-[#181C23]">Anjo da Guarda | Farol</span>
        <button
          onClick={() => onNavigateScreen('consent')}
          className="text-xs text-neutral-400 font-semibold hover:text-neutral-700"
        >
          Pular
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
        <div className="w-full bg-white rounded-3xl shadow-sm border border-neutral-100 p-8 flex flex-col items-center">
          <span className="text-7xl mb-6" aria-hidden="true">
            {SLIDES[slide].icon}
          </span>
          <h2 className="text-xl font-extrabold text-[#181C23] mb-3">{SLIDES[slide].title}</h2>
          <p className="text-sm text-neutral-500">{SLIDES[slide].text}</p>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-6 pb-2">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === slide ? 'w-7 bg-[#655590]' : 'w-2 bg-neutral-200'
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={() => onNavigateScreen('consent')}
            className="w-full bg-[#14181F] text-white font-bold py-4 rounded-full active:scale-95 transition-transform"
          >
            Começar
          </button>
        ) : (
          <button
            onClick={() => setSlide(slide + 1)}
            className="w-full bg-[#14181F] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Próximo
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
