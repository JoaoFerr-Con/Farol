import React, { useState } from 'react';
import { ScreenType } from '../types';

interface BookingScreenProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenImageDrawer: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  onNavigateScreen,
  onOpenImageDrawer
}) => {
  const [selectedDay, setSelectedDay] = useState('12');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const days = [
    { name: 'SEG', num: '12', month: 'Out' },
    { name: 'TER', num: '13', month: 'Out' },
    { name: 'QUA', num: '14', month: 'Out' },
    { name: 'QUI', num: '15', month: 'Out' },
    { name: 'SEX', num: '16', month: 'Out' }
  ];

  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'];

  const draAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvMOVaG5zmlhOpaPvS9yQ6PWiAeyQW5MrP65k9T9ksarTg1rOW6q0oI3Jr0ObuuTZCRlugpXTL6fHdD_-fokp2i3k0BtXJFtc_1uNlUxlpR96NnBFjFwEOB5V9VYLsLiRugREmQ4jPEyV9W26_wkG4ifTJ3NX_I6gpE3ijWvq4-o5GLXuZYEyoQy9quod0S73RK7X7FBWjM9HFgC-BVCBRG0O5XQLbE2gJbCsc8PSvmy0YtgK797K61A';

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="w-full min-h-[calc(100vh-45px)] p-4 sm:p-6 md:p-8 max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in pb-28 text-[#1C1B1C]">
      {/* Header */}
      <div>
        <button
          onClick={() => onNavigateScreen('selfcare')}
          className="mb-3 flex items-center text-xs font-bold text-[#45474B] hover:text-[#181C23] transition-colors"
        >
          <span className="material-symbols-outlined mr-1 text-base">arrow_back</span>
          <span>Voltar</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#181C23] tracking-tight">
            Agendar sessão de psicoterapia breve
          </h2>
          <button
            onClick={onOpenImageDrawer}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9DDFF] text-[#210F49] text-xs font-semibold hover:bg-[#ded1fa] transition-colors"
          >
            <span className="material-symbols-outlined text-xs">photo_library</span>
            <span>Link Foto Dra. Ana</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-[#45474B] mt-1">
          Selecione o melhor dia e horário para o seu atendimento.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Date Selector Card */}
        <div className="bg-white p-6 rounded-3xl shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 md:col-span-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#655590]" style={{ color: '#655590' }}>
              calendar_month
            </span>
            <h3 className="font-bold text-base text-[#1C1B1C]">Data da Sessão</h3>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {days.map((day) => {
              const isSelected = selectedDay === day.num;
              return (
                <button
                  key={day.num}
                  type="button"
                  onClick={() => setSelectedDay(day.num)}
                  className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#655590] bg-[#E9DDFF]/30 shadow-md scale-105'
                      : 'border border-[#C6C6CB]/60 bg-white hover:border-[#655590] hover:-translate-y-0.5'
                  }`}
                >
                  <span className={`text-[11px] font-bold mb-1 ${isSelected ? 'text-[#655590]' : 'text-neutral-500'}`}>
                    {day.name}
                  </span>
                  <span className="text-2xl font-extrabold text-[#181C23]">{day.num}</span>
                  <span className="text-[10px] text-neutral-400">{day.month}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selector Card */}
        <div className="bg-white p-6 rounded-3xl shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 md:col-span-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#655590]">schedule</span>
            <h3 className="font-bold text-base text-[#1C1B1C]">Horário (Fuso Horário: Brasília)</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {times.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#E9DDFF] border-2 border-[#655590] text-[#210F49] shadow-sm'
                      : 'border border-[#C6C6CB]/60 text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-[0px_4px_20px_rgba(31,41,55,0.04)] border border-neutral-100 md:col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E5E2E2] shrink-0 shadow-sm relative group">
              <img src={draAvatar} alt="Dra. Ana Silva" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1C1B1C]">Dra. Ana Silva</h4>
              <p className="text-xs text-[#45474B]">Psicóloga Clínica • CRP 00/00000</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Especialista em Terapia Breve e Fatores Psicossociais</p>
            </div>
          </div>

          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E8F8F1] text-[#2EA879] self-start sm:self-auto">
            Sessão Online Criptografada
          </span>
        </div>

        {/* Confidentiality Notice & Submit Button */}
        <div className="md:col-span-12 flex flex-col items-center gap-4 mt-2">
          <div className="flex items-center gap-2 max-w-xl text-center text-xs text-[#45474B]">
            <span className="material-symbols-outlined text-base text-[#655590]">lock</span>
            <p>
              Sua sessão é confidencial — a gestão <strong>não tem acesso</strong> a datas, horários ou conteúdo dos atendimentos.
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-10 py-4 bg-[#181C23] hover:bg-black text-white rounded-full font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Confirmar agendamento
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F8F1] text-[#2EA879] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#181C23] mb-1">Agendamento Confirmado!</h3>
            <p className="text-xs text-[#45474B] mb-5">
              Sua sessão com a <strong>Dra. Ana Silva</strong> foi reservada para o dia{' '}
              <strong>{selectedDay} de Outubro às {selectedTime}</strong>.
            </p>

            <div className="bg-neutral-50 rounded-2xl p-3.5 text-xs text-left space-y-1.5 mb-6 border border-neutral-200">
              <div className="flex justify-between text-neutral-600">
                <span>Modalidade:</span>
                <span className="font-semibold text-neutral-900">Videoconferência Segura</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Duração:</span>
                <span className="font-semibold text-neutral-900">45 minutos</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Recompensa:</span>
                <span className="font-semibold text-[#2EA879]">+9 gotas no Jardim</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onNavigateScreen('dashboard');
              }}
              className="w-full bg-[#181C23] hover:bg-black text-white font-bold py-3.5 rounded-full text-sm"
            >
              Ir para o Meu Painel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
