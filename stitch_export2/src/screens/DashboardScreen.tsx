import React, { useState, useEffect } from 'react';
import { ScreenType, UserProfile } from '../types';
import { AuraShaderCanvas } from '../components/AuraShaderCanvas';
import { getTreeStage } from '../utils/treeStage';

interface DashboardScreenProps {
  user: UserProfile;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateScreen,
  onOpenImageDrawer
}) => {
  const [drops, setDrops] = useState(user.gotas ?? 0);
  const [isTreeSwayingIntense, setIsTreeSwayingIntense] = useState(false);
  const [isTreeGrowing, setIsTreeGrowing] = useState(false);
  const [isWateringActive, setIsWateringActive] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);

  // Tour spotlight state
  const [tourStep, setTourStep] = useState<number | null>(null);

  // Momento de plantio — só na primeiríssima vez que o colaborador chega ao Jardim,
  // antes mesmo do primeiro check-in. Depois do plantio, o tour de navegação começa.
  const [showPlanting, setShowPlanting] = useState<boolean>(
    () => typeof window !== 'undefined' && !window.localStorage.getItem('anjo_seed_planted')
  );

  // Reveal real da árvore (semente → árvore) sincronizado com o fim do
  // overlay de plantio — só na primeira visita.
  const [treeGrown, setTreeGrown] = useState<boolean>(() => !showPlanting);

  useEffect(() => {
    if (!showPlanting) return;
    const dismissTimer = setTimeout(() => {
      setShowPlanting(false);
      window.localStorage.setItem('anjo_seed_planted', 'true');
      setTreeGrown(true);
      setTourStep(0);
    }, 2200);
    return () => clearTimeout(dismissTimer);
  }, [showPlanting]);

  const treeImgUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmbij1cHidNXy_KQtTRJRFIJ3uabV8l4axTjcZawRRuGp_kPImLy8-75xx75-RVw-RPZD3abcIaMc_wZLOr1e1H4_0UlyxxOLsL6hM_THPiLfj8LOtJMnWTc252pzxCORcwABgYOfHt-bAbsbggeTCuUQBHrFNl9RAM_6Z4ZNV0nOBjUJFLiORvy8GlK1FLToA4fP_W9kPsYyh1KksR1ZDuFLaVctdx3ClKZhgIEOeso8hFQVQMko_8Q';
  const zenStonesUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOTofnDg3JsEjFw5k2ES9q-7YxlYsoKl_vcB1fPphUQcnb0XhI1Lfd6_UBDsG9QSBtyd-zAEZOgJ1uDh13Ooit54dmJDoAAiRvZIp4sRXQtID68wPTqvzMF72_mDwCaTgnU_xv8MBHNz4NcA1DOG7I7B_8ymLziVwcNGJXAiXVvd90gIx9yZCFUo9bekJKFQ_1avz8JLbBe-yugpJXfFi_8PX7G4bDnKTW-OLKU7FG4Ie47wzsQQn-tg';
  const userAvatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCf0d5dyv49oD6HvLOsvNTxlwHyL5vebxMQ5C_QWipyIPUaEE6KH6ce6GKQMv272dF76KnibY_5e3gtDumTXs8OebOZeMNA3jQz4L0qwP4-Z_moKdkg3pPZ6Ea_NdjTIJRy7XQcJVMQ3FiSX3G6rqVWPIC_JbNO5PpdoJQJ-DUOVbFRVrga9syHPIx6MetSc7JhGyDG6Adt7m0RFPqhfc7xZpMSTa5qQqyJ1IGbu_403qTsYfHVf6Tg';

  const tourMessages = [
    { title: 'Jardim de Autocuidado', text: 'Esta é sua árvore. Ela cresce e se desenvolve a cada prática de autocuidado que você completa.' },
    { title: 'Banco de Gotas', text: 'Toque para regar sua árvore! Cada gota representa minutos dedicados à sua saúde mental.' },
    { title: 'Atividades Recomendadas', text: 'Meditações guiadas, leituras e pausas ativas para acumular mais gotas.' },
    { title: 'Score Preditivo de Bem-estar', text: 'Métricas agregadas em total sigilo para acompanhar sua estabilidade emocional.' }
  ];

  // Watering action handler
  const handleWaterTree = () => {
    setIsWateringActive(true);
    setIsTreeSwayingIntense(true);
    const newDrops = drops + 1;
    setDrops(newDrops);
    onUpdateUser({ gotas: newDrops });

    if (newDrops % 5 === 0) {
      setIsTreeGrowing(true);
      setTimeout(() => setIsTreeGrowing(false), 1500);
    }

    setTimeout(() => {
      setIsWateringActive(false);
      setIsTreeSwayingIntense(false);
    }, 900);
  };

  const stage = getTreeStage(drops);

  const handlePlayMeditation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    setAudioFeedback('Iniciando reprodução da Meditação para Foco...');
    setTimeout(() => {
      onNavigateScreen('session');
    }, 700);
  };

  return (
    <div className="w-full min-h-[calc(100vh-45px)] p-4 sm:p-6 md:p-8 bg-[#F6F8FA] text-[#1C1B1C] flex flex-col items-center">
      {/* Momento de Plantio — primeiríssimo acesso ao Jardim */}
      {showPlanting && (
        <div className="fixed inset-0 z-[60] bg-[#F6F8FA] flex flex-col items-center justify-center p-4 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-[#655590] mb-6">
            Bem-vindo(a) ao seu Jardim
          </p>
          <div className="relative w-40 h-40 flex items-end justify-center mb-6">
            <span className="text-6xl animate-plant-pop" aria-hidden="true">🌱</span>
          </div>
          <div className="w-32 h-2 rounded-full bg-[#DCEFE0] animate-soil-settle" aria-hidden="true" />
          <p className="mt-6 text-sm text-neutral-600 text-center max-w-xs">
            Sua semente acabou de ser plantada. Cada prática de autocuidado vai regá-la.
          </p>
        </div>
      )}

      {/* Tour Spotlight Modal */}
      {tourStep !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200">
            <div className="flex items-center gap-2 text-[#655590] mb-2 font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">help</span>
              <span>Passo {tourStep + 1} de {tourMessages.length}</span>
            </div>
            <h3 className="font-bold text-lg text-neutral-900 mb-2">
              {tourMessages[tourStep].title}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-6">
              {tourMessages[tourStep].text}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setTourStep(null)}
                className="text-xs text-neutral-500 font-semibold hover:text-neutral-900"
              >
                Pular tour
              </button>
              <button
                onClick={() => {
                  if (tourStep < tourMessages.length - 1) {
                    setTourStep(tourStep + 1);
                  } else {
                    setTourStep(null);
                  }
                }}
                className="bg-[#181C23] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-black transition-colors"
              >
                {tourStep === tourMessages.length - 1 ? 'Concluir' : 'Próximo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas Container */}
      <main className="w-full max-w-2xl flex flex-col gap-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-2xl font-extrabold text-[#181C23] tracking-tight">Meu Painel</h1>
            <p className="text-xs sm:text-sm text-[#45474B]">Olá! Como você está hoje?</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTourStep(0)}
              className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-600 shadow-sm border border-neutral-200 text-xs"
              title="Tour explicativo"
            >
              <span className="material-symbols-outlined text-base">info</span>
            </button>

            <div
              onClick={() => onNavigateScreen('login')}
              className="w-10 h-10 rounded-full bg-[#E9DDFF] flex items-center justify-center overflow-hidden border border-neutral-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#B9A6E8] transition-all"
              title="Meu perfil"
            >
              <img src={userAvatarUrl} alt="Foto do meu perfil" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Árvore do Jardim de Autocuidado (Full Width) */}
          <div
            id="card-tree"
            className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="bg-[#E8F8F1] text-[#2EA879] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {stage.icon} {stage.label}
              </span>
              <button
                onClick={onOpenImageDrawer}
                className="text-[11px] text-[#655590] hover:underline font-semibold flex items-center gap-1"
                title="Copiar link da ilustração da árvore"
              >
                <span className="material-symbols-outlined text-xs">link</span>
                Link da Imagem
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#181C23] mt-2 mb-1">
              Jardim de Autocuidado
            </h2>
            <p className="text-xs sm:text-sm text-[#45474B] max-w-sm mb-6">
              Continue regando sua saúde mental para vê-la crescer.
            </p>

            {/* Tree Center Container with WebGL Shader Aura */}
            <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-[#E5E2E2]/60 flex items-center justify-center overflow-hidden relative mb-6 shadow-sm border-4 border-white">
              {/* WebGL Aura Shader */}
              <AuraShaderCanvas className="w-full h-full absolute inset-0 pointer-events-none" intensity={1.2} />

              {/* Semente — visível só até a árvore nascer de verdade (primeira visita) */}
              {!treeGrown && (
                <span className="text-5xl relative z-10 transition-opacity duration-500">🌱</span>
              )}

              {/* Tree Image — nasce da semente com scale + bounce na primeira visita */}
              <img
                src={treeImgUrl}
                alt="Árvore do Jardim de Autocuidado"
                className={`w-full h-full object-cover absolute inset-0 mix-blend-multiply transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  !treeGrown
                    ? 'scale-0 opacity-0'
                    : `scale-100 opacity-100 ${
                        isTreeGrowing ? 'tree-grow' : isTreeSwayingIntense ? 'tree-sway intense' : 'tree-sway'
                      }`
                }`}
              />

              {/* Water Splash Ring Animation */}
              {isWateringActive && (
                <div className="absolute inset-0 rounded-full border-4 border-[#7FD1AE] animate-ping pointer-events-none opacity-70" />
              )}
            </div>

            {/* Interactive Drops Counter Pill (Watering Action) */}
            <button
              id="card-drops"
              onClick={handleWaterTree}
              className="flex items-center gap-2 bg-[#F0EDED] hover:bg-[#e4e0e0] active:scale-95 py-3 px-6 rounded-full shadow-sm cursor-pointer transition-all duration-200 border border-neutral-200"
              title="Clique para regar sua árvore (+1 gota)"
            >
              <span
                className="material-symbols-outlined text-[#655590] text-2xl transition-transform group-hover:scale-110"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water_drop
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#181C23]">
                {drops}
              </span>
              <span className="text-xs sm:text-sm text-[#45474B] font-medium">gotas acumuladas</span>
              <span className="ml-1 text-[10px] bg-[#E9DDFF] text-[#210F49] px-2 py-0.5 rounded-full font-bold">
                + Regar
              </span>
            </button>
          </div>

          {/* Guia de navegação interativo — sugestões clicáveis que levam a outras telas */}
          <div className="md:col-span-2 flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <button
              onClick={() => onNavigateScreen('selfcare')}
              className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-[#F6F8FA] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm transition-colors active:scale-95"
            >
              <span className="text-base">📖</span>
              <span className="text-xs font-semibold text-[#181C23] whitespace-nowrap">
                Leia um artigo e ganhe gotas
              </span>
            </button>
            <button
              onClick={() => onNavigateScreen('session')}
              className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-[#F6F8FA] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm transition-colors active:scale-95"
            >
              <span className="text-base">🧘</span>
              <span className="text-xs font-semibold text-[#181C23] whitespace-nowrap">
                Faça uma pausa guiada
              </span>
            </button>
            <button
              onClick={() => onNavigateScreen('checkin')}
              className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-[#F6F8FA] border border-neutral-200 rounded-full px-4 py-2.5 shadow-sm transition-colors active:scale-95"
            >
              <span className="text-base">✅</span>
              <span className="text-xs font-semibold text-[#181C23] whitespace-nowrap">
                Responda seu check-in
              </span>
            </button>
          </div>

          {/* Card 2: Sugestão de Meditação (CTA - Full Width) */}
          <div
            id="card-meditation"
            onClick={() => onNavigateScreen('session')}
            className="md:col-span-2 bg-[#181C23] hover:bg-[#12151b] text-white rounded-3xl p-5 sm:p-6 flex items-center justify-between gap-4 shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border border-neutral-800 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-sm relative">
                <img
                  src={zenStonesUrl}
                  alt="Meditação para foco"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#B9A6E8] uppercase tracking-wider block mb-0.5">
                  GANHE MAIS +10 GOTAS
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white truncate">
                  Meditação para foco
                </h3>
                <p className="text-xs text-neutral-400">5 min • Áudio guiado de respiração</p>
              </div>
            </div>

            <button
              onClick={handlePlayMeditation}
              className="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#181C23] flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-90"
              title="Iniciar meditação"
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </button>
          </div>

          {/* Card 3: Score de Bem-estar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 flex flex-col justify-between">
            <h3 className="font-bold text-base text-[#181C23] mb-2">Bem-estar Atual</h3>

            {user.score > 0 ? (
              <div className="flex items-center gap-4 my-2">
                {/* Conic Gradient Donut */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center relative flex-shrink-0 shadow-inner"
                  style={{
                    background: `conic-gradient(#7FD1AE ${user.score}%, #E8F8F1 0)`
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center font-extrabold text-xl text-[#181C23] shadow-sm">
                    {user.score}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="bg-[#E8F8F1] text-[#2EA879] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                    ESTÁVEL
                  </span>
                  <span className="text-xs text-[#45474B] leading-tight">
                    Sua pontuação preditiva
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 my-2">
                <div className="w-20 h-20 rounded-full flex items-center justify-center relative flex-shrink-0 bg-[#F0EDED]">
                  <span className="text-2xl font-extrabold text-neutral-400">—</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="bg-[#F0EDED] text-neutral-500 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                    Aguardando dados
                  </span>
                  <span className="text-xs text-[#45474B] leading-tight">
                    Aparece após seu próximo check-in
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => onNavigateScreen('checkin')}
              className="text-xs text-[#655590] font-semibold hover:underline flex items-center gap-1 mt-2"
            >
              {user.score > 0 ? 'Fazer novo check-in' : 'Fazer meu primeiro check-in'}
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Card 4: Histórico de 8 semanas */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-[#181C23]">Histórico</h3>
              <span className="material-symbols-outlined text-neutral-400 text-sm">show_chart</span>
            </div>
            <p className="text-xs text-[#45474B] mb-3">Últimas 8 semanas</p>

            {user.score > 0 ? (
              <>
                {/* Custom SVG Wave Sparkline Chart */}
                <div className="w-full h-16 bg-[#F6F8FA] rounded-2xl overflow-hidden p-2 flex items-end border border-neutral-100 relative">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7FD1AE" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7FD1AE" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,20 Q15,10 30,15 T60,8 T85,12 T100,6 L100,30 L0,30 Z"
                      fill="url(#waveGrad)"
                    />
                    <path
                      d="M0,20 Q15,10 30,15 T60,8 T85,12 T100,6"
                      fill="none"
                      stroke="#2EA879"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                  <span>Sem 1</span>
                  <span>Sem 4</span>
                  <span>Hoje (Sem 8)</span>
                </div>
              </>
            ) : (
              <div className="w-full h-16 bg-[#F6F8FA] rounded-2xl border border-dashed border-neutral-200 flex items-center justify-center">
                <p className="text-[11px] text-neutral-400 text-center px-3">
                  Seu histórico aparece após alguns check-ins
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
