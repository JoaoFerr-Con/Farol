import React, { useState } from 'react';
import { ScreenType } from '../types';

interface SelfCareCatalogScreenProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
}

export const SelfCareCatalogScreen: React.FC<SelfCareCatalogScreenProps> = ({
  onNavigateScreen,
  onOpenImageDrawer
}) => {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const images = {
    therapy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRmG8ftUa9gEblR49oVRmdJiN7_NDXcL9uONJt8lbHyah3tFp-Wc5tP1yllov2mq0ERf3gFJhjeb5uR8CGh5Hz50Rg1JVnb-PnKXeAFX6Hy7qAtPBVRSCp29KdRqEuUyfyJbrUGMz1l2OTCmugctItRzAdoZfw3jayOdhpfnHoPfBlhe4-wpH_qxD9JztBcJ-VRidX6J-v7cWQkbrB8qG_BfhHE3sJny7EVIyZm-_We6YqNo7gOeMiJw',
    reading: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0LsZItzfYyejR7bCTyqSkvPzDD0YSOXsJge9iIWo9NX7tl4dxdCTnLMWkMfzarXFil74ChKNu5TyzLyJR6KuCJVN7C_YxV6dAVI3CyJ9iICCceiMs6eRFGoJo9mvSKMKjuLXIS5jO9jCKFNYNTvPMf4JRsFu8wYdLiDEdqs8FdmogCrnw504NrIKHF2colHpg28EJGn1HLmKvj89jxmiSesO2ipuJPpmJsNFJgkckIsrEeYLWkfhm5Q',
    mindfulness: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPRzFWRN8n2XaL9jsoE7CLPeWb6OF4TOqCnT6geGNfs7tVoB6ZTvfYXYP57P_ip_2ZE4yn7lTqZDhOmYdgsG5hcGZ00cFt_Ynqxeqx0ZpfdKHnF18xsN8W40msrn9AQtkChi94Y51Lg_VuHv_RkSEzPkS9d8V1YrDfKhiFWjiF067xpy9EtGSYKUXC1g7lOkeBO2p_OCkh4K1-jHCdBcSyq21haZH8k5EOrRWC1fNrusVUTqBwbEsFng'
  };

  return (
    <div className="w-full min-h-[calc(100vh-45px)] px-4 sm:px-6 md:px-8 py-6 md:py-10 max-w-6xl mx-auto flex flex-col gap-6 animate-fade-in pb-28">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181C23] tracking-tight">Autocuidado</h1>
          <p className="text-sm text-[#45474B] mt-0.5">Escolha como cuidar de você hoje</p>
        </div>

        <button
          onClick={onOpenImageDrawer}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9DDFF] text-[#210F49] hover:bg-[#ded1fa] text-xs font-semibold transition-colors border border-[#655590]/20"
        >
          <span className="material-symbols-outlined text-sm">photo_library</span>
          <span>Links Diretos das Capas</span>
        </button>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Psicoterapia Breve */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(31,41,55,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col border border-neutral-100 group">
          <div className="h-48 w-full relative overflow-hidden bg-neutral-100">
            <img
              src={images.therapy}
              alt="Psicoterapia breve"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#E9DDFF] text-[#210F49] shadow-sm">
                mín. 30 min
              </span>
            </div>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm">
              Catálogo de Autocuidado
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-[#181C23] mb-1">Psicoterapia breve</h2>
            <p className="text-xs text-[#45474B] mb-6 flex items-center gap-1.5">
              <span className="text-[#655590]">💧</span> 1 gota a cada 5 min
            </p>
            <div className="mt-auto">
              <button
                onClick={() => onNavigateScreen('booking')}
                className="w-full bg-[#181C23] hover:bg-black text-white rounded-full py-3.5 px-4 text-xs sm:text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Agendar sessão</span>
                <span className="material-symbols-outlined text-base">calendar_today</span>
              </button>
            </div>
          </div>
        </article>

        {/* Card 2: Leitura & Vídeos */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(31,41,55,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col border border-neutral-100 group">
          <div className="h-48 w-full relative overflow-hidden bg-neutral-100">
            <img
              src={images.reading}
              alt="Leitura e vídeos"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#E9DDFF] text-[#210F49] shadow-sm">
                15–30 min
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-[#181C23] mb-1">Leitura & vídeos</h2>
            <p className="text-xs text-[#45474B] mb-6 flex items-center gap-1.5">
              <span className="text-[#655590]">💧</span> 1 gota a cada 5 min
            </p>
            <div className="mt-auto">
              <button
                onClick={() => setSelectedContent('reading')}
                className="w-full bg-[#E9DDFF]/60 hover:bg-[#E9DDFF] text-[#210F49] rounded-full py-3.5 px-4 text-xs sm:text-sm font-bold flex justify-center items-center gap-2 transition-all active:scale-95 cursor-pointer border border-[#B9A6E8]/30"
              >
                <span>Explorar conteúdos</span>
                <span className="material-symbols-outlined text-base">menu_book</span>
              </button>
            </div>
          </div>
        </article>

        {/* Card 3: Mindfulness Guiada */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(31,41,55,0.04)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col border border-neutral-100 group">
          <div className="h-48 w-full relative overflow-hidden bg-neutral-100">
            <img
              src={images.mindfulness}
              alt="Mindfulness guiada"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#E9DDFF] text-[#210F49] shadow-sm">
                mín. 15 min
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-[#181C23] mb-1">Mindfulness guiada</h2>
            <p className="text-xs text-[#45474B] mb-6 flex items-center gap-1.5">
              <span className="text-[#655590]">💧</span> 1 gota a cada 5 min
            </p>
            <div className="mt-auto">
              <button
                onClick={() => onNavigateScreen('session')}
                className="w-full bg-[#181C23] hover:bg-black text-white rounded-full py-3.5 px-4 text-xs sm:text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Começar agora</span>
                <span className="material-symbols-outlined text-base">play_arrow</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Modal de Conteúdos de Leitura */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#655590]">menu_book</span>
                <h3 className="font-bold text-lg text-neutral-900">Biblioteca de Autocuidado</h3>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {[
                { title: 'Técnicas de Descompressão no Trabalho', time: '5 min de leitura', drops: '+3 gotas' },
                { title: 'Higiene do Sono e Reparação Neural', time: '8 min de leitura', drops: '+4 gotas' },
                { title: 'Comunicação Não-Violenta e Gestão de Estresse', time: '12 min de leitura', drops: '+6 gotas' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-[#B9A6E8] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">{item.title}</h4>
                    <p className="text-xs text-neutral-500">{item.time}</p>
                  </div>
                  <span className="text-xs font-bold text-[#2EA879] bg-[#E8F8F1] px-2.5 py-1 rounded-full">
                    {item.drops}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setSelectedContent(null)}
                className="px-6 py-2.5 rounded-full bg-[#181C23] text-white text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
