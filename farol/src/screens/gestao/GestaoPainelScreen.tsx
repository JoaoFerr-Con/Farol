import React from 'react';
import { ViewMode } from '../../types';

interface Props {
  viewMode: ViewMode;
}

const KPIS = [
  { label: 'Score Médio da Planta', value: '78', suffix: '/100', pct: 78, color: '#655590' },
  { label: 'Setores em Alerta', value: '3', suffix: 'GHEs críticos', pct: null, color: '#BA1A1A', delta: '▲ +1 desde ontem' },
  { label: 'Adesão ao Check-in', value: '92%', suffix: '', pct: 92, color: '#655590' },
  { label: 'Autocuidado Ativado', value: '65%', suffix: '', pct: 65, color: '#B9A6E8' }
];

const GHES = [
  { setor: 'Usinagem - Turno A', pessoas: 45, score: 88, status: 'Crítico', color: '#BA1A1A', ofensor: 'Principal ofensor: Fadiga' },
  { setor: 'Montagem - Turno B', pessoas: 80, score: 34, status: 'Baixo', color: '#7FD1AE', ofensor: 'Ambiente Seguro' }
];

function RiskRing({ score, color }: { score: number; color: string }) {
  const circumference = 100;
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#E5E2E2"
          strokeWidth="3.2"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={`${score}, ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#181C23]">{score}</span>
        <span className="text-[9px] uppercase text-neutral-400 font-semibold">Risco SST</span>
      </div>
    </div>
  );
}

export const GestaoPainelScreen: React.FC<Props> = ({ viewMode }) => {
  const kpiCols = viewMode === 'desktop' ? 'grid-cols-4' : 'grid-cols-1';
  const gheCols = viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1';

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-neutral-100 shadow-sm">
        <span className="material-symbols-outlined text-neutral-400">lock</span>
        <p className="text-xs text-neutral-500">
          Dados agregados por GHE, alinhados à NR-01. Informações individuais preservadas garantindo sigilo e
          segurança psicológica.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#181C23]">Visão Geral da Planta</h1>
          <p className="text-sm text-neutral-500 mt-1">Monitoramento em tempo real dos Grupos Homogêneos de Exposição.</p>
        </div>
        <button className="bg-[#14181F] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 self-start sm:self-auto">
          <span className="material-symbols-outlined text-sm">download</span>
          Exportar Relatório
        </button>
      </div>

      <div className={`grid ${kpiCols} gap-4`}>
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex flex-col justify-between">
            <span className="text-sm font-bold text-[#181C23] mb-3">{k.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold" style={{ color: k.color }}>{k.value}</span>
              <span className="text-xs text-neutral-400">{k.suffix}</span>
            </div>
            {k.pct !== null ? (
              <div className="mt-2 w-full bg-neutral-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: `${k.pct}%`, backgroundColor: k.color }} />
              </div>
            ) : (
              <p className="text-[11px] text-[#BA1A1A] font-semibold mt-2">{k.delta}</p>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-[#181C23] mt-2">Monitoramento Detalhado por GHE</h2>
      <div className={`grid ${gheCols} gap-4`}>
        {GHES.map((g) => (
          <div key={g.setor} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-[#181C23]">{g.setor}</h3>
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {g.pessoas} colaboradores
                </p>
              </div>
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full uppercase"
                style={{ backgroundColor: `${g.color}22`, color: g.color }}
              >
                {g.status}
              </span>
            </div>
            <div className="flex justify-center py-2">
              <RiskRing score={g.score} color={g.color} />
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-xs text-neutral-500">{g.ofensor}</span>
              <button className="text-[#655590] text-xs font-bold flex items-center gap-1">
                Ver Ações <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
        <div className="bg-white rounded-2xl p-5 border border-dashed border-neutral-200 flex flex-col items-center justify-center min-h-[220px] opacity-70">
          <span className="material-symbols-outlined text-3xl text-neutral-400 mb-2">add_circle</span>
          <span className="text-sm text-neutral-500 text-center font-medium">
            Adicionar GHE
            <br />
            ao Monitoramento
          </span>
        </div>
      </div>
    </div>
  );
};
