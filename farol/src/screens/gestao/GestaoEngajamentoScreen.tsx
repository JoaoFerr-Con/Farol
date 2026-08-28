import React, { useState } from 'react';
import { ViewMode } from '../../types';

interface Props {
  viewMode: ViewMode;
}

const SETORES = ['Todos os Setores', 'Produção', 'Manutenção', 'Logística'];

const ROWS = [
  { mat: '45892', setor: 'Produção B', estagio: 'Árvore frondosa', icon: '🌲', gotas: 142, modalidade: 'Psicoterapia breve', reg: 'Alta consistência', regColor: '#7FD1AE' },
  { mat: '31094', setor: 'Manutenção', estagio: 'Árvore jovem', icon: '🌳', gotas: 87, modalidade: 'Mindfulness guiada', reg: 'Média', regColor: '#9E9E9E' },
  { mat: '67210', setor: 'Logística', estagio: 'Muda', icon: '🌿', gotas: 24, modalidade: 'Leitura & vídeos', reg: 'Atenção', regColor: '#E4572E' },
  { mat: '52988', setor: 'Produção A', estagio: 'Árvore florida e com frutos', icon: '🌸', gotas: 210, modalidade: 'Psicoterapia breve', reg: 'Alta consistência', regColor: '#7FD1AE' }
];

export const GestaoEngajamentoScreen: React.FC<Props> = ({ viewMode }) => {
  const [filtro, setFiltro] = useState('Todos os Setores');
  const isDesktop = viewMode === 'desktop';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#181C23]">Engajamento</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Acompanhe a evolução do bem-estar e engajamento da equipe nas trilhas terapêuticas.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full bg-neutral-100 text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Últimos 30 dias
          </button>
          <button className="px-4 py-2 rounded-full bg-[#14181F] text-white text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar
          </button>
        </div>
      </div>

      <div className="bg-[#F9F7FC] border-l-4 border-[#B9A6E8] rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#655590] mt-0.5">verified_user</span>
        <div>
          <h3 className="font-bold text-sm text-[#181C23] mb-1">Privacidade Garantida</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            A gestão vê apenas o estágio da árvore de desenvolvimento e métricas agregadas. Detalhes das sessões de
            psicoterapia e conteúdos consumidos nas trilhas são estritamente confidenciais entre o colaborador e os
            profissionais de saúde mental.
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {SETORES.map((s) => (
          <button
            key={s}
            onClick={() => setFiltro(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
              filtro === s ? 'bg-[#14181F] text-white border-[#14181F]' : 'bg-white text-neutral-500 border-neutral-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-neutral-100">
        <h2 className="font-bold text-[#181C23] mb-4">Indicadores Individuais de Engajamento</h2>

        {isDesktop ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-[10px] uppercase text-neutral-400 border-b border-neutral-100">
                  <th className="pb-3 px-2 font-semibold">Matrícula</th>
                  <th className="pb-3 px-2 font-semibold">Setor</th>
                  <th className="pb-3 px-2 font-semibold">Estágio da Árvore</th>
                  <th className="pb-3 px-2 font-semibold text-center">Gotas (30d)</th>
                  <th className="pb-3 px-2 font-semibold">Modalidade</th>
                  <th className="pb-3 px-2 font-semibold">Regularidade</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.mat} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3 px-2 font-semibold text-[#181C23]">#{r.mat}</td>
                    <td className="py-3 px-2 text-neutral-500">{r.setor}</td>
                    <td className="py-3 px-2">
                      <span className="mr-1">{r.icon}</span>
                      {r.estagio}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold text-[#181C23]">💧 {r.gotas}</td>
                    <td className="py-3 px-2 text-neutral-500">{r.modalidade}</td>
                    <td className="py-3 px-2">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase"
                        style={{ backgroundColor: `${r.regColor}22`, color: r.regColor }}
                      >
                        {r.reg}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {ROWS.map((r) => (
              <div key={r.mat} className="border border-neutral-100 rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#181C23]">#{r.mat} · {r.setor}</span>
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{ backgroundColor: `${r.regColor}22`, color: r.regColor }}
                  >
                    {r.reg}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>{r.icon} {r.estagio}</span>
                  <span className="font-semibold text-[#181C23]">💧 {r.gotas}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">{r.modalidade}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Mostrando 1 a 4 de 248 registros</span>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded flex items-center justify-center bg-[#14181F] text-white font-bold">1</button>
            <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-neutral-100">2</button>
            <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-neutral-100">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};
