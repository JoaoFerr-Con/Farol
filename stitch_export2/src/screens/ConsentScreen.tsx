import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ConsentScreenProps {
  onAccept: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({
  onAccept,
  onNavigateScreen,
  onOpenImageDrawer
}) => {
  const [agreed, setAgreed] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      onAccept();
      onNavigateScreen('login');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-45px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-[#FCF8F9] text-[#1C1B1C] animate-fade-in">
      <main className="w-full max-w-4xl flex flex-col gap-8 my-auto">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-[#E9DDFF] flex items-center justify-center mb-1 shadow-sm border border-[#B9A6E8]/40">
            <span
              className="material-symbols-outlined text-4xl text-[#655590]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1B1C] tracking-tight">
            Antes de começar, seus dados com você.
          </h1>
          <p className="text-sm sm:text-base text-[#45474B] max-w-2xl leading-relaxed">
            O <strong>Anjo da Guarda | Farol</strong> foi construído para ser o seu porto seguro. Acreditamos na
            transparência total sobre como suas informações são tratadas.
          </p>
        </header>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: O que a gestão VÊ */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE7E8] transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFE2EC] flex items-center justify-center text-[#43474F]">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h2 className="text-lg font-bold text-[#1C1B1C]">O que a gestão VÊ</h2>
            </div>
            <p className="text-sm text-[#45474B] leading-relaxed">
              Dados agregados por setor ou turno (nunca informações individuais) e o estágio da sua árvore, utilizado
              exclusivamente para fins de reconhecimento e gamificação.
            </p>
          </div>

          {/* Card 2: O que a gestão NUNCA VÊ */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE7E8] transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFDAD6] flex items-center justify-center text-[#93000A]">
                <span className="material-symbols-outlined">visibility_off</span>
              </div>
              <h2 className="text-lg font-bold text-[#1C1B1C]">O que a gestão NUNCA VÊ</h2>
            </div>
            <p className="text-sm text-[#45474B] leading-relaxed">
              Suas respostas pessoais do check-in diário e o histórico específico do conteúdo que você consome na
              plataforma (qual leitura, vídeo ou tema de sessão).
            </p>
          </div>

          {/* Card 3: Base legal e Conformidade */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE7E8] transition-transform duration-300 hover:-translate-y-1 flex flex-col md:flex-row items-start md:items-center gap-4 md:col-span-2">
            <div className="w-12 h-12 rounded-full bg-[#E9DDFF] shrink-0 flex items-center justify-center text-[#210F49]">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-[#1C1B1C]">Base legal e Conformidade</h2>
              <p className="text-sm text-[#45474B] leading-relaxed">
                Nossa plataforma atua em estrita conformidade com a <strong>NR-01</strong> (gestão de riscos psicossociais) e garante a proteção integral da sua privacidade de acordo com a <strong>LGPD (Lei nº 13.709/2018)</strong>. Seus dados de saúde e bem-estar são tratados como informações sensíveis.
              </p>
            </div>
          </div>
        </section>

        {/* Action Area */}
        <footer className="flex flex-col items-center gap-5 mt-2">
          {/* Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[#76777C] text-[#655590] focus:ring-[#B9A6E8] cursor-pointer"
            />
            <span className="text-sm sm:text-base font-medium text-[#1C1B1C] group-hover:text-black transition-colors">
              Li e concordo com os termos acima
            </span>
          </label>

          {/* Button */}
          <button
            id="continue-button"
            disabled={!agreed}
            onClick={handleContinue}
            className={`w-full sm:w-auto px-12 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md ${
              agreed
                ? 'bg-[#181C23] hover:bg-black text-white cursor-pointer hover:shadow-lg active:scale-95'
                : 'bg-neutral-400 text-white opacity-50 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>

          {/* Secondary Link */}
          <button
            type="button"
            onClick={() => setShowFullTerms(true)}
            className="text-xs text-[#655590] hover:underline font-semibold"
          >
            Ler termo completo de privacidade
          </button>
        </footer>
      </main>

      {/* Modal Termo Completo */}
      {showFullTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg text-neutral-900">Termos de Uso e Política de Privacidade</h3>
              <button
                onClick={() => setShowFullTerms(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 text-xs text-neutral-600 space-y-3 leading-relaxed">
              <p>
                <strong>1. Anonimização e Agregação de Dados:</strong> Em conformidade com as diretrizes da NR-01 para gestão de fatores psicossociais no ambiente de trabalho e com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), os dados individuais de respostas de check-in e consumo de conteúdos de saúde mental são estritamente sigilosos e criptografados.
              </p>
              <p>
                <strong>2. Atendimentos de Psicoterapia Breve:</strong> Todas as sessões realizadas com profissionais de psicologia credenciados são confidenciais, resguardadas pelo Código de Ética Profissional do Psicólogo (CFP).
              </p>
              <p>
                <strong>3. Gamificação Saudável:</strong> O acúmulo de gotas e o crescimento do Jardim de Autocuidado visam exclusivamente incentivar hábitos de autocuidado preventivo.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => {
                  setAgreed(true);
                  setShowFullTerms(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#181C23] text-white text-xs font-bold"
              >
                Concordar e Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
