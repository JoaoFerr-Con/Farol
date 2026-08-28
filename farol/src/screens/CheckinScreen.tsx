import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../types';
import { CHECKIN_QUESTIONS } from '../data/assets';

interface CheckinScreenProps {
  user: UserProfile;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
}

export const CheckinScreen: React.FC<CheckinScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateScreen,
  onOpenImageDrawer
}) => {
  // Questionário real começa vazio, da primeira pergunta — nada de respostas
  // pré-selecionadas (isso era um atalho de demo que pulava a pergunta 1).
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const question = CHECKIN_QUESTIONS[currentStep] || CHECKIN_QUESTIONS[0];
  const selectedOptionValue = selectedAnswers[question.id];

  const handleSelectOption = (value: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < CHECKIN_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed Check-in!
      const isFirstCheckin = user.score === 0;
      const bonusDrops = isFirstCheckin ? 19 : 0;
      onUpdateUser({
        gotas: user.gotas + bonusDrops,
        score: isFirstCheckin ? 72 : Math.min(95, user.score + 3)
      });
      onNavigateScreen('checkin-success');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigateScreen('dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-45px)] w-full flex flex-col items-center justify-between p-4 sm:p-6 pb-28 bg-[#FCF8F9] text-[#1C1B1C] animate-fade-in relative">
      {/* Top Header */}
      <header className="w-full max-w-lg flex items-center justify-between py-2 z-10">
        <button
          onClick={() => onNavigateScreen('dashboard')}
          className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-200 transition-colors"
          title="Fechar check-in"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h1 className="text-base font-bold text-[#181C23]">Anjo da Guarda | Farol</h1>

        <div className="w-10 flex justify-end">
          <button
            onClick={onOpenImageDrawer}
            className="w-8 h-8 rounded-full bg-[#E9DDFF] text-[#210F49] flex items-center justify-center text-xs"
            title="Links diretos das imagens"
          >
            <span className="material-symbols-outlined text-sm">photo_library</span>
          </button>
        </div>
      </header>

      {/* Main Wizard Canvas */}
      <main className="w-full max-w-lg flex-1 flex flex-col justify-center my-auto py-4">
        {/* Progress Bar (Dots) */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {CHECKIN_QUESTIONS.map((q, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <div
                key={q.id}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 h-2.5 bg-[#655590] ring-4 ring-[#E9DDFF]'
                    : isCompleted
                    ? 'w-2.5 h-2.5 bg-[#655590]'
                    : 'w-2.5 h-2.5 bg-[#EBE7E8]'
                }`}
              />
            );
          })}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 mb-6 text-center">
          <span className="bg-[#E9DDFF] text-[#210F49] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider inline-block mb-3">
            Pergunta {currentStep + 1} de {CHECKIN_QUESTIONS.length}
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-[#181C23] leading-snug mb-2">
            {question.question}
          </h2>

          <p className="text-xs sm:text-sm text-[#45474B]">{question.subtitle}</p>
        </div>

        {/* Likert Scale Options */}
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt) => {
            const isSelected = selectedOptionValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelectOption(opt.value)}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all text-sm font-semibold cursor-pointer ${
                  isSelected
                    ? 'bg-[#E9DDFF] border-2 border-[#655590] text-[#210F49] shadow-md scale-[1.01]'
                    : 'bg-white border border-[#EBE7E8] text-[#1C1B1C] hover:bg-[#F6F3F3] hover:border-neutral-300'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected ? (
                  <span
                    className="material-symbols-outlined text-[#655590] text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-300" />
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full max-w-lg flex items-center justify-between pt-4 pb-16 z-20">
        <button
          onClick={handlePrev}
          className="text-xs sm:text-sm font-bold text-neutral-600 hover:text-black px-4 py-2 flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedOptionValue}
          className={`px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
            selectedOptionValue
              ? 'bg-[#181C23] hover:bg-black text-white cursor-pointer'
              : 'bg-neutral-300 text-neutral-500 opacity-60 cursor-not-allowed'
          }`}
        >
          <span>{currentStep === CHECKIN_QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima'}</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};
