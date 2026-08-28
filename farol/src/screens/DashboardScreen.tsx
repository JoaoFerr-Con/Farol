import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ScreenType, UserProfile } from '../types';
import { AuraShaderCanvas } from '../components/AuraShaderCanvas';
import { getTreeStage } from '../utils/treeStage';

interface DashboardScreenProps {
  user: UserProfile;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
  onLogout?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateScreen,
  onOpenImageDrawer,
  onLogout
}) => {
  const [drops, setDrops] = useState(user.gotas ?? 0);
  const [isTreeSwayingIntense, setIsTreeSwayingIntense] = useState(false);
  const [isTreeGrowing, setIsTreeGrowing] = useState(false);
  const [isWateringActive, setIsWateringActive] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);
  // Gotas d'água caindo visualmente a cada toque em "Regar" — cada uma é um
  // id único só pra poder remover a própria do array quando a queda termina.
  const [fallingDroplets, setFallingDroplets] = useState<number[]>([]);
  // Aviso de subida de estágio (Plantio → Muda → Árvore jovem → ...), mostrado
  // por alguns segundos junto com um confete leve — mais expressivo que o
  // antigo "balanço" sozinho a cada 5 gotas.
  const [stageUpMessage, setStageUpMessage] = useState<string | null>(null);

  const isFirstVisit = typeof window !== 'undefined' && !window.localStorage.getItem('anjo_onboarded');

  // Tutorial guiado — na primeira visita, começa sozinho (a árvore nasce e
  // cresce em sincronia com cada passo, terminando com flores/frutos).
  const [tourStep, setTourStep] = useState<number | null>(isFirstVisit ? 0 : null);

  const finishTutorial = () => {
    setTourStep(null);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('anjo_onboarded', 'true');
    }
  };

  const zenStonesUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOTofnDg3JsEjFw5k2ES9q-7YxlYsoKl_vcB1fPphUQcnb0XhI1Lfd6_UBDsG9QSBtyd-zAEZOgJ1uDh13Ooit54dmJDoAAiRvZIp4sRXQtID68wPTqvzMF72_mDwCaTgnU_xv8MBHNz4NcA1DOG7I7B_8ymLziVwcNGJXAiXVvd90gIx9yZCFUo9bekJKFQ_1avz8JLbBe-yugpJXfFi_8PX7G4bDnKTW-OLKU7FG4Ie47wzsQQn-tg';
  const userAvatarUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQCf0d5dyv49oD6HvLOsvNTxlwHyL5vebxMQ5C_QWipyIPUaEE6KH6ce6GKQMv272dF76KnibY_5e3gtDumTXs8OebOZeMNA3jQz4L0qwP4-Z_moKdkg3pPZ6Ea_NdjTIJRy7XQcJVMQ3FiSX3G6rqVWPIC_JbNO5PpdoJQJ-DUOVbFRVrga9syHPIx6MetSc7JhGyDG6Adt7m0RFPqhfc7xZpMSTa5qQqyJ1IGbu_403qTsYfHVf6Tg';

  // Tamanho do emoji por estágio — reforça a progressão visual de crescimento
  // sem depender de "transform: scale" (que colidiria com as animações de
  // balanço/pop, que também usam transform). Tamanho de fonte não colide.
  const HERO_SIZE_CLASS: Record<string, string> = {
    Plantio: 'text-6xl sm:text-7xl',
    Muda: 'text-7xl sm:text-8xl',
    'Árvore jovem': 'text-8xl sm:text-8xl',
    'Árvore frondosa': 'text-8xl sm:text-9xl',
    'Em flor': 'text-8xl sm:text-9xl',
    'Árvore florida e com frutos': 'text-8xl sm:text-9xl'
  };

  // Cada passo do tutorial corresponde a um estágio visual de crescimento —
  // a árvore nasce e evolui conforme o colaborador avança no guia. O ícone
  // de cada passo é o MESMO emoji usado no estágio real (getTreeStage), então
  // a simulação do tutorial e o crescimento de verdade ficam visualmente
  // consistentes.
  const TUTORIAL_STAGES = [
    { icon: '🌱', label: 'Plantio', title: 'Sua semente foi plantada', text: 'Esta é a sua Árvore da Saúde Mental. Ela nasce agora e cresce a cada prática de autocuidado que você completa.' },
    { icon: '🌿', label: 'Muda', title: 'Banco de Gotas', text: 'Toque para regar sua árvore! Cada gota representa minutos dedicados à sua saúde mental.' },
    { icon: '🌳', label: 'Árvore jovem', title: 'Atividades Recomendadas', text: 'Meditações guiadas, leituras e pausas ativas para acumular mais gotas e ver sua árvore crescer.' },
    { icon: '🌸', label: 'Em flor', title: 'Score Preditivo de Bem-estar', text: 'Métricas agregadas em total sigilo para acompanhar sua estabilidade emocional ao longo do tempo.' }
  ];

  const inTutorial = tourStep !== null;

  // Watering action handler — solta uma chuvinha de gotas caindo sobre a
  // árvore, um respingo na base, e brilho nas folhas; se a rega faz o
  // colaborador cruzar pra um novo estágio, comemora com confete e um aviso.
  const handleWaterTree = () => {
    setIsWateringActive(true);
    setIsTreeSwayingIntense(true);

    const batchId = Date.now();
    const newDroplets = [batchId, batchId + 1, batchId + 2, batchId + 3];
    setFallingDroplets((prev) => [...prev, ...newDroplets]);
    setTimeout(() => {
      setFallingDroplets((prev) => prev.filter((id) => !newDroplets.includes(id)));
    }, 800);

    const prevStage = getTreeStage(drops);
    const newDrops = drops + 1;
    setDrops(newDrops);
    onUpdateUser({ gotas: newDrops });
    const newStage = getTreeStage(newDrops);

    if (newStage.label !== prevStage.label) {
      setIsTreeGrowing(true);
      setStageUpMessage(`${newStage.icon} Sua árvore virou ${newStage.label}!`);
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.55 },
          colors: ['#7FD1AE', '#B9A6E8', '#655590']
        });
      } catch {
        // Fallback seguro — comemoração visual segue via CSS mesmo sem confete
      }
      setTimeout(() => setIsTreeGrowing(false), 1500);
      setTimeout(() => setStageUpMessage(null), 2600);
    }

    setTimeout(() => {
      setIsWateringActive(false);
      setIsTreeSwayingIntense(false);
    }, 900);
  };

  const stage = getTreeStage(drops);
  const heroIcon = inTutorial ? TUTORIAL_STAGES[tourStep!].icon : stage.icon;
  const heroLabel = inTutorial ? TUTORIAL_STAGES[tourStep!].label : stage.label;
  const heroSizeClass = HERO_SIZE_CLASS[heroLabel] || 'text-8xl';
  const showFruits = inTutorial ? tourStep === 3 : drops >= 110;

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
      {/* Tutorial guiado — nasce e cresce em sincronia com o passo atual */}
      {inTutorial && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200">
            <div className="flex items-center gap-2 text-[#655590] mb-2 font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">help</span>
              <span>Passo {tourStep! + 1} de {TUTORIAL_STAGES.length}</span>
            </div>
            <h3 className="font-bold text-lg text-neutral-900 mb-2">
              {TUTORIAL_STAGES[tourStep!].title}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-6">
              {TUTORIAL_STAGES[tourStep!].text}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={finishTutorial}
                className="text-xs text-neutral-500 font-semibold hover:text-neutral-900"
              >
                Pular tutorial
              </button>
              <button
                onClick={() => {
                  if (tourStep! < TUTORIAL_STAGES.length - 1) {
                    setTourStep(tourStep! + 1);
                  } else {
                    // Tutorial concluído — induz o colaborador a fazer
                    // o primeiro check-in psicossocial na sequência.
                    finishTutorial();
                    onNavigateScreen('checkin');
                  }
                }}
                className="bg-[#181C23] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-black transition-colors"
              >
                {tourStep === TUTORIAL_STAGES.length - 1 ? 'Fazer meu primeiro check-in' : 'Próximo'}
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
              className="w-10 h-10 rounded-full bg-[#E9DDFF] flex items-center justify-center overflow-hidden border border-neutral-200 shadow-sm"
              title="Meu perfil"
            >
              <img src={userAvatarUrl} alt="Foto do meu perfil" className="w-full h-full object-cover" />
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#FFDAD6] hover:text-[#93000A] flex items-center justify-center text-neutral-600 shadow-sm border border-neutral-200 text-xs transition-colors"
                title="Sair (reinicia como se fosse o primeiro acesso)"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Árvore do Jardim de Autocuidado (Full Width) */}
          <div
            id="card-tree"
            className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 relative overflow-hidden group"
          >
            {/* Aviso de subida de estágio — some sozinho após alguns segundos */}
            {stageUpMessage && (
              <div className="absolute top-3 left-1/2 z-30 bg-[#181C23] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-stage-badge whitespace-nowrap">
                {stageUpMessage}
              </div>
            )}

            <div className="flex items-center justify-between w-full mb-1">
              <span className="bg-[#E8F8F1] text-[#2EA879] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-all">
                {heroIcon} {heroLabel}
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
              {inTutorial ? TUTORIAL_STAGES[tourStep!].text : 'Continue regando sua saúde mental para vê-la crescer.'}
            </p>

            {/* Tree Center Container with WebGL Shader Aura */}
            <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-[#E5E2E2]/60 flex items-center justify-center overflow-hidden relative mb-6 shadow-sm border-4 border-white">
              {/* WebGL Aura Shader */}
              <AuraShaderCanvas className="w-full h-full absolute inset-0 pointer-events-none" intensity={1.2} />

              {/* Árvore — visual muda de fato a cada estágio (semente → muda →
                  árvore jovem → frondosa → florida): é o emoji do estágio
                  (heroIcon), não uma foto única só reduzida de tamanho.
                  Dois "spans" aninhados de propósito: o de fora só cuida do
                  "pop" quando o estágio muda (key={heroIcon} remonta e
                  replay a animação); o de dentro cuida do balanço/crescimento
                  contínuo. Assim as duas animações não brigam pela mesma
                  propriedade CSS no mesmo elemento. */}
              <span key={heroIcon} className="relative z-10 inline-block animate-plant-pop">
                <span
                  className={`inline-block leading-none select-none ${heroSizeClass} ${
                    isTreeGrowing ? 'tree-grow' : isTreeSwayingIntense ? 'tree-sway intense' : 'tree-sway'
                  }`}
                  aria-hidden="true"
                >
                  {heroIcon}
                </span>
              </span>

              {/* Terrinha — só aparece nos primeiros estágios, reforça a ideia de "recém-plantada" */}
              {!showFruits && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-2.5 rounded-full bg-[#B08968]/30 z-0" aria-hidden="true" />
              )}

              {/* Chuvinha de gotas caindo — dispara a cada toque em "Regar" */}
              {fallingDroplets.map((id, i) => (
                <span
                  key={id}
                  className="absolute text-lg pointer-events-none animate-water-fall z-20"
                  style={{ left: `${28 + (i % 4) * 14}%`, top: 0, animationDelay: `${(i % 4) * 60}ms` }}
                  aria-hidden="true"
                >
                  💧
                </span>
              ))}

              {/* Respingo na base do vaso, sincronizado com a queda das gotas */}
              {isWateringActive && (
                <span
                  className="absolute bottom-3 left-1/2 w-16 h-4 rounded-full bg-[#7FD1AE]/40 animate-splash-ripple pointer-events-none z-10"
                  aria-hidden="true"
                />
              )}

              {/* Flores/frutos — passo final do tutorial ou árvore madura de verdade */}
              {showFruits && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  <span className="absolute top-6 left-10 text-lg animate-fade-in">🌸</span>
                  <span className="absolute top-10 right-8 text-base animate-fade-in">🌸</span>
                  <span className="absolute bottom-10 left-8 text-base animate-fade-in">🍎</span>
                </div>
              )}

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
