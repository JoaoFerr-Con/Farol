import React from 'react';
import { ViewMode } from '../../types';

interface Props {
  viewMode: ViewMode;
}

const STATS = [
  { label: 'TOTAL DE ALERTAS', value: '12', icon: 'monitoring', color: '#45474B', bg: '#F0EDED' },
  { label: 'NÍVEL CRÍTICO', value: '3', icon: 'error', color: '#DC2626', bg: '#FEE2E2' },
  { label: 'ATENÇÃO REQUERIDA', value: '9', icon: 'warning', color: '#D97706', bg: '#FEF3C7' }
];

const ALERTS = [
  { ghe: 'GHE Logística - Turno C', local: 'Armazém Central', status: 'Crítico', color: '#DC2626', bg: '#FEE2E2', icon: 'psychology', fator: 'Fadiga Extrema (85% pico)', tempo: 'Aberto há 45 min', border: '#FCA5A5' },
  { ghe: 'GHE Manutenção - Turno A', local: 'Setor Externo Norte', status: 'Atenção', color: '#D97706', bg: '#FEF3C7', icon: 'person_off', fator: 'Isolamento Operacional', tempo: 'Aberto há 2h 15m', border: '#FCD34D' },
  { ghe: 'GHE Produção - Turno B', local: 'Linha de Montagem 3', status: 'Atenção', color: '#D97706', bg: '#FEF3C7', icon: 'thermostat', fator: 'Estresse Térmico', tempo: 'Aberto há 3h 05m', border: '#FCD34D' },
  { ghe: 'GHE Adm - Turno Geral', local: 'Escritório Central', status: 'Monitorando', color: '#7FD1AE', bg: '#E8F8F1', icon: 'monitor_heart', fator: 'Sedentarismo Leve', tempo: 'Atualizado há 10 min', border: '#7FD1AE', resolved: true }
];

export const GestaoAlertasScreen: React.FC<Props> = ({ viewMode }) => {
  const statCols = viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1';
  const alertCols = viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1';

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-extrabold text-[#181C23]">Gestão de Alertas Ativos</h1>

      <div className={`grid ${statCols} gap-4`}>
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-neutral-400 font-bold mb-1">{s.label}</p>
              <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: s.bg }}>
              <span className="material-symbols-outlined" style={{ color: s.color }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end mt-2">
        <h2 className="text-lg font-bold text-[#181C23]">Alertas Recentes</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-500">Filtrar</button>
          <button className="px-3 py-1.5 border border-neutral-200 rounded-full text-xs font-bold text-neutral-500">Ordenar</button>
        </div>
      </div>

      <div className={`grid ${alertCols} gap-4`}>
        {ALERTS.map((a) => (
          <div
            key={a.ghe}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 flex flex-col ${a.resolved ? 'opacity-70' : ''}`}
            style={{ borderLeftColor: a.border }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-[#181C23] leading-tight">{a.ghe}</h3>
                <p className="text-xs text-neutral-500 mt-1">{a.local}</p>
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: a.bg, color: a.color }}
              >
                <span className="material-symbols-outlined text-[12px]">circle</span>
                {a.status}
              </span>
            </div>
            <div className="mb-4 flex-1">
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="material-symbols-outlined text-neutral-400 text-sm">{a.icon}</span>
                <span><strong>Fator:</strong> {a.fator}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>{a.tempo}</span>
              </div>
            </div>
            <button
              className={`w-full rounded-full py-2.5 text-xs font-bold ${
                a.resolved ? 'bg-neutral-100 text-neutral-600 border border-neutral-200' : 'bg-[#14181F] text-white'
              }`}
            >
              {a.resolved ? 'Ver detalhes' : 'Atribuir responsável'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
