import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, UserProfile } from '../types';

interface MindfulnessSessionScreenProps {
  user: UserProfile;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const MindfulnessSessionScreen: React.FC<MindfulnessSessionScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateScreen
}) => {
  // Timer in seconds: default 12:45 = 765 seconds out of 15:00 (900 seconds)
  const [secondsLeft, setSecondsLeft] = useState(765);
  const [isPlaying, setIsPlaying] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'Inspire profundamente...' | 'Segure o ar...' | 'Expire suavemente...'>('Inspire profundamente...');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, secondsLeft]);

  // Breathing guidance phase interval
  useEffect(() => {
    const phases: ('Inspire profundamente...' | 'Segure o ar...' | 'Expire suavemente...')[] = [
      'Inspire profundamente...',
      'Segure o ar...',
      'Expire suavemente...'
    ];
    let idx = 0;
    const breathInterval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathPhase(phases[idx]);
    }, 4000);

    return () => clearInterval(breathInterval);
  }, []);

  // Ambient chime/sound synthesis
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz calming tuning
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
        }
      } catch {
        // Safe fallback
      }
      setSoundEnabled(true);
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setSoundEnabled(false);
    }
  };

  const handleFinish = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    const bonus = 3;
    onUpdateUser({
      gotas: user.gotas + bonus
    });
    alert(`Prática concluída com sucesso! +${bonus} gotas adicionadas ao seu Jardim.`);
    onNavigateScreen('dashboard');
  };

  const handleSeek = (delta: number) => {
    setSecondsLeft((prev) => Math.max(0, Math.min(900, prev + delta)));
  };

  return (
    <div className="min-h-[calc(100vh-45px)] w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-[#FCF8F9] text-[#1C1B1C] animate-fade-in relative overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-2xl flex items-center justify-between py-2 z-10">
        <button
          onClick={() => {
            if (audioContextRef.current) audioContextRef.current.close();
            onNavigateScreen('selfcare');
          }}
          className="w-10 h-10 rounded-full bg-[#F0EDED] hover:bg-[#E5E2E2] flex items-center justify-center text-neutral-700 transition-colors"
          title="Fechar sessão"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center">
          <h1 className="text-base sm:text-lg font-bold text-[#181C23]">Mindfulness guiada</h1>
          <p className="text-xs text-[#45474B]">Respiração para foco</p>
        </div>

        <button
          onClick={toggleSound}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            soundEnabled ? 'bg-[#E9DDFF] text-[#210F49]' : 'bg-[#F0EDED] text-neutral-500'
          }`}
          title={soundEnabled ? 'Desativar som ambiente' : 'Ativar som ambiente 432Hz'}
        >
          <span className="material-symbols-outlined text-base">
            {soundEnabled ? 'volume_up' : 'volume_off'}
          </span>
        </button>
      </header>

      {/* Main Breathing Circle & Timer Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center w-full my-auto py-6 z-10">
        {/* Breathing Circle Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Pulsing Aura Rings */}
          <div
            className="absolute inset-0 rounded-full bg-[#B9A6E8]/20 animate-breathe"
            style={{ animationDelay: '-4s' }}
          />
          <div className="absolute inset-0 rounded-full bg-[#B9A6E8]/30 animate-breathe" />

          {/* Central Static Circle */}
          <div className="relative z-10 w-32 h-32 rounded-full bg-white shadow-[0_4px_25px_rgba(31,41,55,0.08)] flex flex-col items-center justify-center border border-neutral-100">
            <span
              className="material-symbols-outlined text-4xl text-[#655590]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              self_improvement
            </span>
          </div>
        </div>

        {/* Breathing Phase Label */}
        <div className="mt-4 text-xs font-semibold text-[#655590] uppercase tracking-wider h-5 transition-all">
          {breathPhase}
        </div>

        {/* Numeric Timer */}
        <div className="mt-8 text-center">
          <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#181C23]">
            {formatTime(secondsLeft)}
          </div>
          <div className="font-mono text-xs text-neutral-400 mt-1">/ 15:00</div>
        </div>

        {/* Player Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => handleSeek(-10)}
            className="p-3.5 rounded-full bg-[#F0EDED] hover:bg-[#E5E2E2] text-neutral-700 transition-transform active:scale-90"
            title="Voltar 10 segundos"
          >
            <span className="material-symbols-outlined text-xl">replay_10</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#181C23] hover:bg-black text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pausar' : 'Continuar'}
          >
            <span
              className="material-symbols-outlined text-3xl sm:text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => handleSeek(10)}
            className="p-3.5 rounded-full bg-[#F0EDED] hover:bg-[#E5E2E2] text-neutral-700 transition-transform active:scale-90"
            title="Avançar 10 segundos"
          >
            <span className="material-symbols-outlined text-xl">forward_10</span>
          </button>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="w-full max-w-md mx-auto flex flex-col items-center gap-4 pb-6 z-10">
        {/* Reward Badge */}
        <div className="inline-flex items-center gap-2 bg-[#E8F8F1] px-4 py-1.5 rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[#2EA879] text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            water_drop
          </span>
          <span className="text-xs font-bold text-[#2EA879]">+3 gotas ao concluir</span>
        </div>

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          className="w-full py-4 rounded-full bg-[#181C23] hover:bg-black text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Concluir Prática
        </button>
      </footer>
    </div>
  );
};
