import React from 'react';
import { ScreenType, UserProfile } from '../types';

interface HealthScreenProps {
  user: UserProfile;
  onNavigateScreen: (screen: ScreenType) => void;
}

// Fatores fictícios de exemplo — em produção viriam do último check-in real.
const SAMPLE_FACTORS = [
  { label: 'Sobrecarga de tarefas', weight: 'Alto impacto' },
  { label: 'Falta de autonomia', weight: 'Impacto moderado' }
];

export const HealthScreen: React.FC<HealthScreenProps> = ({ user, onNavigateScreen }) => {
  const hasScore = (user.score || 0) > 0;

  return (
    <div className="w-full min-h-[calc(100vh-45px)] p-4 sm:p-6 md:p-8 bg-[#F6F8FA] text-[#1C1B1C] flex flex-col items-center">
      <main className="w-full max-w-2xl flex flex-col gap-5 pb-24">
        {/* Header */}
        <div className="px-1">
          <h1 className="text-2xl font-extrabold text-[#181C23] tracking-tight">Minha Saúde</h1>
          <p className="text-xs sm:text-sm text-[#45474B]">
            Acompanhe sua pontuação preditiva ao longo do tempo.
          </p>
        </div>

        {/* Card 1: Score atual */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 flex flex-col items-center text-center">
          {hasScore ? (
            <>
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center relative shadow-inner mb-4"
                style={{ background: `conic-gradient(#7FD1AE ${user.score}%, #E8F8F1 0)` }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center font-extrabold text-2xl text-[#181C23] shadow-sm">
                  {user.score}
                </div>
              </div>
              <span className="bg-[#E8F8F1] text-[#2EA879] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase mb-2">
                Estável
              </span>
              <p className="text-xs text-[#45474B] max-w-xs">
                Seu score reflete a média dos seus últimos check-ins. Ele é visível só para você.
              </p>
            </>
          ) : (
            <>
              <div className="w-28 h-28 rounded-full flex items-center justify-center bg-[#F0EDED] mb-4">
                <span className="text-3xl font-extrabold text-neutral-400">—</span>
              </div>
              <span className="bg-[#F0EDED] text-neutral-500 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase mb-2">
                Aguardando dados
              </span>
              <p className="text-xs text-[#45474B] max-w-xs">
                Seu score preditivo aparece aqui depois de alguns check-ins semanais.
              </p>
            </>
          )}

          <button
            onClick={() => onNavigateScreen('checkin')}
            className="mt-4 text-xs text-[#655590] font-semibold hover:underline flex items-center gap-1"
          >
            {hasScore ? 'Fazer novo check-in' : 'Fazer meu primeiro check-in'}
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Card 2: Histórico expandido */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base text-[#181C23]">Histórico detalhado</h3>
            <span className="material-symbols-outlined text-neutral-400 text-sm">show_chart</span>
          </div>
          <p className="text-xs text-[#45474B] mb-3">Últimas 8 semanas, por check-in</p>

          {hasScore ? (
            <div className="w-full h-28 bg-[#F6F8FA] rounded-2xl overflow-hidden p-3 flex items-end gap-1.5 border border-neutral-100">
              {[40, 60, 50, 70, 65, 80, 75, 85].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#7FD1AE]/40 to-[#2EA879]"
                    style={{ height: `${v}%` }}
                  />
                  <span className="text-[9px] text-neutral-400">S{i + 1}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-28 bg-[#F6F8FA] rounded-2xl border border-dashed border-neutral-200 flex items-center justify-center">
              <p className="text-xs text-neutral-400 max-w-[220px] text-center">
                Seu histórico aparecerá aqui após alguns check-ins semanais.
              </p>
            </div>
          )}
        </div>

        {/* Card 3: Fatores de influência */}
        {hasScore && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100">
            <h3 className="font-bold text-base text-[#181C23] mb-3">Fatores identificados</h3>
            <div className="flex flex-col gap-2">
              {SAMPLE_FACTORS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between bg-[#F6F8FA] rounded-xl px-4 py-3 border border-neutral-100"
                >
                  <span className="text-sm text-[#181C23] font-medium">{f.label}</span>
                  <span className="text-[10px] text-[#655590] font-bold uppercase">{f.weight}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-3">
              Fatores identificados a partir das suas respostas — nunca a resposta literal.
            </p>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-[11px] text-neutral-400 text-center px-4">
          Essas informações são visíveis apenas para você. A gestão só recebe dados agregados por
          setor, conforme a NR-01 e a LGPD.
        </p>
      </main>
    </div>
  );
};
