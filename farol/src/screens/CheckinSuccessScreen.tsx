import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ScreenType, UserProfile } from '../types';

interface CheckinSuccessScreenProps {
  user: UserProfile;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const CheckinSuccessScreen: React.FC<CheckinSuccessScreenProps> = ({
  user,
  onNavigateScreen
}) => {
  useEffect(() => {
    // Launch confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B9A6E8', '#7FD1AE', '#655590', '#F2DFCE']
      });

      const timeout = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#B9A6E8', '#7FD1AE']
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#B9A6E8', '#7FD1AE']
        });
      }, 400);

      return () => clearTimeout(timeout);
    } catch {
      // Fallback safe
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-45px)] w-full flex items-center justify-center p-4 sm:p-6 bg-[#F6F8FA] relative overflow-hidden animate-fade-in">
      <main className="w-full max-w-md mx-auto relative z-10 flex flex-col items-center justify-center">
        {/* Celebration Bento Card */}
        <div className="w-full bg-white rounded-[28px] shadow-[0px_4px_25px_rgba(31,41,55,0.06)] p-8 sm:p-10 flex flex-col items-center text-center border border-neutral-100 transition-transform duration-300 hover:-translate-y-1">
          {/* Icon/Illustration Area */}
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            {/* Glowing background ring */}
            <div className="absolute inset-0 bg-[#7FD1AE]/25 rounded-full animate-ping opacity-70" />
            <div className="absolute inset-1 bg-[#E8F8F1] rounded-full" />

            {/* Inner Circle */}
            <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center text-4xl">
              🌱
            </div>

            {/* Decorative Sparkles */}
            <span
              className="material-symbols-outlined absolute top-1 right-2 text-[#B9A6E8] text-xl z-20 animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sparkles
            </span>
            <span
              className="material-symbols-outlined absolute bottom-3 left-1 text-[#7FD1AE] text-xl z-20 animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sparkles
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181C23] mb-2 tracking-tight">
            Primeiro check-in concluído!
          </h1>

          {/* Subtext */}
          <p className="text-sm text-[#45474B] mb-6 max-w-[300px] leading-relaxed">
            Sua semente virou muda 🌿 — você ganhou <strong>19 gotas</strong> por concluir seu primeiro check-in.
          </p>

          {/* Counter Card (Bank Style) */}
          <div className="w-full bg-[#F0FDF4] rounded-2xl p-4 border border-[#DCFCE7] mb-6 relative overflow-hidden flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#7FD1AE]/20 flex items-center justify-center text-[#2EA879]">
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  SALDO ATUAL
                </div>
                <div className="text-xl font-black text-[#181C23]">
                  {user.gotas} gotas
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#2EA879] text-2xl">trending_up</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onNavigateScreen('dashboard')}
            className="w-full bg-[#14181F] hover:bg-black text-white font-bold text-sm sm:text-base py-4 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>Ver meu Jardim</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => onNavigateScreen('dashboard')}
            className="mt-3.5 text-xs text-[#655590] hover:text-black font-semibold transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </main>
    </div>
  );
};
