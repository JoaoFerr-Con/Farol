import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../types';

interface LoginScreenProps {
  user: UserProfile;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  user,
  onUpdateUser,
  onNavigateScreen
}) => {
  const [matricula, setMatricula] = useState(user.matricula || '84920');
  const [setor, setSetor] = useState(user.setor || 'producao');
  const [turno, setTurno] = useState(user.turno || 'manha');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdateUser({ matricula, setor, turno });

    const alreadyOnboarded =
      typeof window !== 'undefined' && window.localStorage.getItem('anjo_onboarded');

    setTimeout(() => {
      setIsLoading(false);
      // Colaborador recorrente vai direto pro Jardim; no primeiro acesso,
      // o próximo passo é sempre o consentimento LGPD.
      onNavigateScreen(alreadyOnboarded ? 'dashboard' : 'consent');
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-45px)] w-full flex flex-col items-center justify-center p-4 bg-[#F6F8FA] relative overflow-hidden text-[#1C1B1C]">
      {/* Decorative floating background blurs */}
      <div className="absolute top-[15%] left-[12%] w-36 h-36 rounded-full bg-[#B9A6E8]/10 blur-2xl animate-float-1 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-52 h-52 rounded-[40%] bg-[#7FD1AE]/10 blur-2xl animate-float-2 pointer-events-none" />
      <div className="absolute top-[60%] left-[10%] w-28 h-28 rounded-full bg-[#DFE2EC]/30 blur-xl animate-float-3 pointer-events-none" />

      <main className="w-full max-w-[440px] z-10 relative my-auto">
        {/* Brand Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-extrabold text-[#181C23] tracking-tight">
            Anjo da Guarda <span className="text-[#655590] font-normal opacity-90">| Farol</span>
          </h1>
          <p className="text-sm text-[#45474B] mt-1 font-medium">Acesso do Colaborador</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(31,41,55,0.06)] p-7 sm:p-9 border border-neutral-100 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Matrícula */}
            <div>
              <label htmlFor="matricula" className="block text-xs font-semibold text-[#45474B] uppercase tracking-wider mb-2">
                Matrícula
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-symbols-outlined text-lg">badge</span>
                </div>
                <input
                  id="matricula"
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Digite sua matrícula"
                  className="w-full pl-11 pr-4 py-3 bg-[#FCF8F9] border border-[#C6C6CB] rounded-xl text-sm text-[#1C1B1C] focus:outline-none focus:ring-2 focus:ring-[#B9A6E8] focus:border-[#B9A6E8] transition-all"
                />
              </div>
            </div>

            {/* Setor */}
            <div>
              <label htmlFor="setor" className="block text-xs font-semibold text-[#45474B] uppercase tracking-wider mb-2">
                Setor
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-symbols-outlined text-lg">corporate_fare</span>
                </div>
                <select
                  id="setor"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-[#FCF8F9] border border-[#C6C6CB] rounded-xl text-sm text-[#1C1B1C] appearance-none focus:outline-none focus:ring-2 focus:ring-[#B9A6E8] focus:border-[#B9A6E8] transition-all cursor-pointer"
                >
                  <option value="" disabled>Selecione o setor</option>
                  <option value="producao">Produção</option>
                  <option value="logistica">Logística</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="administracao">Administração</option>
                  <option value="qualidade">Controle de Qualidade</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
              </div>
            </div>

            {/* Turno */}
            <div>
              <label htmlFor="turno" className="block text-xs font-semibold text-[#45474B] uppercase tracking-wider mb-2">
                Turno
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </div>
                <select
                  id="turno"
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-[#FCF8F9] border border-[#C6C6CB] rounded-xl text-sm text-[#1C1B1C] appearance-none focus:outline-none focus:ring-2 focus:ring-[#B9A6E8] focus:border-[#B9A6E8] transition-all cursor-pointer"
                >
                  <option value="" disabled>Selecione o turno</option>
                  <option value="manha">Manhã (06:00 - 14:00)</option>
                  <option value="tarde">Tarde (14:00 - 22:00)</option>
                  <option value="noite">Noite (22:00 - 06:00)</option>
                  <option value="administrativo">Comercial (08:00 - 17:00)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </div>
              </div>
            </div>

            {/* Botão Entrar */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#181C23] hover:bg-black text-white font-bold text-sm tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center relative cursor-pointer"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin text-xl">
                    progress_activity
                  </span>
                ) : (
                  <span>ENTRAR</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center px-2">
          <p className="text-xs text-[#45474B]/80 leading-relaxed">
            Sistema em conformidade com as diretrizes da <strong>NR-01</strong> para gestão de riscos ocupacionais e protegido pelas normativas da <strong>LGPD</strong>. Seus dados estão seguros.
          </p>
        </div>
      </main>
    </div>
  );
};
