import React, { useState } from 'react';
import { ViewMode } from '../../types';

interface Props {
  viewMode: ViewMode;
}

const GHES = [
  { id: 'GHE-01 Administrativo', vidas: 145, checked: true, color: '#7FD1AE', bg: '#E8F8F1' },
  { id: 'GHE-02 Operação Logística', vidas: 312, checked: true, color: '#93000A', bg: '#FFDAD6' },
  { id: 'GHE-03 Manutenção Externa', vidas: 89, checked: false, color: '#45474B', bg: '#F0EDED' },
  { id: 'GHE-04 Diretoria e Executivo', vidas: 12, checked: false, color: '#45474B', bg: '#F0EDED' }
];

export const GestaoRelatoriosScreen: React.FC<Props> = ({ viewMode }) => {
  const [selected, setSelected] = useState(GHES.filter((g) => g.checked).map((g) => g.id));
  const isDesktop = viewMode === 'desktop';

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#181C23]">Relatórios Gerenciais</h1>
          <p className="text-sm text-neutral-500 mt-1">Geração de documentos para conformidade e análise de saúde ocupacional.</p>
        </div>
        <button className="bg-[#14181F] text-white rounded-full px-5 py-2.5 text-xs font-bold flex items-center gap-2 self-start">
          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
          Exportar para o PGR (PDF)
        </button>
      </div>

      <div className={`grid ${isDesktop ? 'grid-cols-12' : 'grid-cols-1'} gap-5`}>
        <div className={`${isDesktop ? 'col-span-4' : ''} flex flex-col gap-5`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#655590]">calendar_month</span>
              <h3 className="font-bold text-[#181C23]">Período de Análise</h3>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-xs">
                <span className="text-neutral-400 font-semibold uppercase text-[10px]">Data Inicial</span>
                <input type="date" defaultValue="2026-01-01" className="border border-neutral-200 rounded-lg px-3 py-2 text-sm" />
              </label>
              <label className="flex flex-col gap-1 text-xs">
                <span className="text-neutral-400 font-semibold uppercase text-[10px]">Data Final</span>
                <input type="date" defaultValue="2026-08-28" className="border border-neutral-200 rounded-lg px-3 py-2 text-sm" />
              </label>
              <div className="flex gap-2 pt-1">
                <button className="px-3 py-1 rounded-full border border-neutral-200 text-xs text-neutral-500">Últimos 30 dias</button>
                <button className="px-3 py-1 rounded-full bg-[#E9DDFF] text-[#210F49] text-xs font-semibold">Ano Atual</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#655590]">groups_3</span>
              <h3 className="font-bold text-[#181C23]">Grupos Homogêneos (GHE)</h3>
            </div>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {GHES.map((g) => (
                <label
                  key={g.id}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-50 cursor-pointer border border-transparent hover:border-neutral-100"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(g.id)}
                      onChange={() => toggle(g.id)}
                      className="w-4 h-4 accent-[#655590]"
                    />
                    <span className="text-xs text-[#181C23]">{g.id}</span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: g.bg, color: g.color }}
                  >
                    {g.vidas} vidas
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={`${isDesktop ? 'col-span-8' : ''} bg-white rounded-2xl shadow-sm border border-neutral-100 p-5 min-h-[400px] flex flex-col`}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-[#181C23]">Visualização Prévia</h3>
              <p className="text-xs text-neutral-500">Relatório de Risco Psicossocial e Ergonomia Cognitiva</p>
            </div>
            <span className="material-symbols-outlined text-neutral-400">zoom_in</span>
          </div>

          <div className="flex-1 bg-neutral-50 rounded-xl border border-neutral-100 p-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-8 border-b-2 border-[#181C23] pb-3">
              <div className="w-12 h-12 bg-neutral-200 rounded flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-neutral-400">shield_person</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#181C23] text-sm uppercase">Programa de Gerenciamento de Riscos</p>
                <p className="text-xs text-neutral-500">Anexo II — Avaliação Psicossocial</p>
                <p className="text-xs text-neutral-400 mt-1">Data base: Agosto/2026</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-[#181C23] text-sm mb-2">1. Resumo Executivo</h5>
                <div className="h-3 bg-neutral-200 rounded w-full mb-1.5" />
                <div className="h-3 bg-neutral-200 rounded w-full mb-1.5" />
                <div className="h-3 bg-neutral-200 rounded w-4/5" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-neutral-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E8F8F1] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#7FD1AE] text-lg">check_circle</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-neutral-400 font-bold">GHE-01</span>
                    <span className="block text-sm font-bold text-[#181C23]">Risco Baixo</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-neutral-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFDAD6] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#93000A] text-lg">warning</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase text-neutral-400 font-bold">GHE-02</span>
                    <span className="block text-sm font-bold text-[#181C23]">Ação Necessária</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-[#181C23] text-sm mb-2">2. Distribuição de Fatores de Risco</h5>
                <div className="w-full h-32 bg-white rounded-lg border border-neutral-100 flex items-end justify-around p-3">
                  {[40, 70, 30, 85, 50].map((h, i) => (
                    <div key={i} className="w-8 bg-[#B9A6E8] rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <span className="text-4xl font-black -rotate-45 text-[#181C23] whitespace-nowrap">
                ANJO DA GUARDA FAROL
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-2 border-t border-neutral-200 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="material-symbols-outlined text-lg">policy</span>
          <p className="text-[11px]">
            Relatório gerado em conformidade com a NR-01 (PGR). Dados anonimizados respeitando as diretrizes da LGPD
            (Lei nº 13.709/2018).
          </p>
        </div>
        <div className="text-[11px] text-neutral-400">ID Documento: #AGF-2026-X99L</div>
      </footer>
    </div>
  );
};
