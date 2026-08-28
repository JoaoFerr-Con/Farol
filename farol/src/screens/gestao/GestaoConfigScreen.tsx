import React from 'react';
import { ViewMode } from '../../types';

interface Props {
  viewMode: ViewMode;
}

const GHES = [
  { grupo: 'GHE-01 Soldagem', setor: 'Manufatura', risco: 'Fumos Metálicos', status: 'Conforme' },
  { grupo: 'GHE-02 Pintura', setor: 'Acabamento', risco: 'Vapores Orgânicos', status: 'Revisão' },
  { grupo: 'GHE-03 Montagem', setor: 'Produção', risco: 'Ergonômico', status: 'Conforme' }
];

const LOGS = [
  { texto: 'Parâmetro M.A.I.A. alterado', autor: 'Por João Silva — Hoje, 14:30' },
  { texto: 'Novo GHE (Pintura) adicionado', autor: 'Por Sistema — Ontem, 09:15' },
  { texto: 'PGR exportado para PDF', autor: 'Por Maria Clara — 25/08/2026' }
];

export const GestaoConfigScreen: React.FC<Props> = ({ viewMode }) => {
  const isDesktop = viewMode === 'desktop';

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold text-[#181C23]">Configurações e Conformidade NR-01</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Gerencie os parâmetros de segurança, grupos de risco e auditoria do sistema.
        </p>
      </div>

      <div className={`grid ${isDesktop ? 'grid-cols-12' : 'grid-cols-1'} gap-5`}>
        {/* Gestão de GHEs */}
        <div className={`${isDesktop ? 'col-span-7' : ''} bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#655590] text-lg">diversity_3</span>
              </div>
              <h3 className="font-bold text-[#181C23]">Gestão de GHEs</h3>
            </div>
            <button className="text-[#655590]">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Grupos Homogêneos de Exposição definidos conforme NR-01. Mapeamento contínuo de riscos.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400">
                  <th className="pb-2 font-semibold">Grupo</th>
                  <th className="pb-2 font-semibold">Setor</th>
                  <th className="pb-2 font-semibold">Risco Predominante</th>
                  <th className="pb-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {GHES.map((g) => (
                  <tr key={g.grupo} className="border-b border-neutral-50">
                    <td className="py-2.5">{g.grupo}</td>
                    <td className="py-2.5 text-neutral-500">{g.setor}</td>
                    <td className="py-2.5 text-neutral-500">{g.risco}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
                          g.status === 'Conforme' ? 'bg-[#E8F8F1] text-[#7FD1AE]' : 'bg-[#FFDAD6] text-[#93000A]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {g.status === 'Conforme' ? 'check_circle' : 'warning'}
                        </span>
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 w-full py-2 bg-neutral-50 text-[#181C23] rounded-lg text-xs font-bold hover:bg-neutral-100 transition-colors">
            Ver todos os GHEs
          </button>
        </div>

        {/* Parâmetros IA M.A.I.A. */}
        <div className={`${isDesktop ? 'col-span-5' : ''} bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col justify-between`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#655590] text-lg">memory</span>
                </div>
                <h3 className="font-bold text-[#181C23]">IA M.A.I.A.</h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#7FD1AE] animate-pulse mt-1" />
            </div>
            <p className="text-xs text-neutral-500 mb-5">
              Sensibilidade de triagem preditiva secundária e limiares de alerta por GHE.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                  <span className="text-neutral-400">Sensibilidade Preditiva</span>
                  <span className="text-[#181C23]">Alta (85%)</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-1.5">
                  <div className="bg-[#655590] h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Alertas em Tempo Real</span>
                <div className="w-9 h-5 bg-[#655590] rounded-full relative">
                  <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <button className="mt-5 w-full py-2.5 bg-[#655590] text-white rounded-full text-xs font-bold">
            Ajustar Parâmetros
          </button>
        </div>

        {/* Documentação NR-01 */}
        <div className={`${isDesktop ? 'col-span-6' : ''} bg-white rounded-2xl p-5 shadow-sm border border-neutral-100`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#655590] text-lg">policy</span>
            </div>
            <h3 className="font-bold text-[#181C23]">Documentação NR-01</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-neutral-200 rounded-lg p-4 flex flex-col items-center text-center hover:bg-neutral-50 cursor-pointer">
              <span className="material-symbols-outlined text-2xl text-neutral-400 mb-1">assignment</span>
              <span className="text-xs font-bold text-[#181C23]">PGR Base</span>
              <span className="text-[10px] text-neutral-400 mt-0.5">Atualizado há 2 dias</span>
            </div>
            <div className="border border-neutral-200 rounded-lg p-4 flex flex-col items-center text-center hover:bg-neutral-50 cursor-pointer">
              <span className="material-symbols-outlined text-2xl text-neutral-400 mb-1">inventory</span>
              <span className="text-xs font-bold text-[#181C23]">Inventário de Riscos</span>
              <span className="text-[10px] text-neutral-400 mt-0.5">Revisão pendente</span>
            </div>
          </div>
        </div>

        {/* Logs de Auditoria */}
        <div className={`${isDesktop ? 'col-span-6' : ''} bg-white rounded-2xl p-5 shadow-sm border border-neutral-100`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#655590] text-lg">history</span>
              </div>
              <h3 className="font-bold text-[#181C23]">Logs de Auditoria</h3>
            </div>
            <button className="text-xs font-semibold text-neutral-400 hover:text-[#181C23]">Ver tudo</button>
          </div>
          <ul className="flex flex-col gap-3">
            {LOGS.map((log) => (
              <li key={log.texto} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-neutral-300 shrink-0" />
                <div>
                  <p className="text-xs text-[#181C23]">{log.texto}</p>
                  <p className="text-[10px] text-neutral-400">{log.autor}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
