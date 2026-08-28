/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, NavTab, UserProfile, Persona, ViewMode } from './types';
import { SideNavBar } from './components/SideNavBar';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { GestaoLayout } from './components/GestaoLayout';
import { ImageLinksDrawer } from './components/ImageLinksDrawer';

// Screens — Colaborador
import { ConsentScreen } from './screens/ConsentScreen';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { CheckinScreen } from './screens/CheckinScreen';
import { CheckinSuccessScreen } from './screens/CheckinSuccessScreen';
import { SelfCareCatalogScreen } from './screens/SelfCareCatalogScreen';
import { BookingScreen } from './screens/BookingScreen';
import { MindfulnessSessionScreen } from './screens/MindfulnessSessionScreen';
import { HealthScreen } from './screens/HealthScreen';

// Screens — Gestão
import { GestaoPainelScreen } from './screens/gestao/GestaoPainelScreen';
import { GestaoEngajamentoScreen } from './screens/gestao/GestaoEngajamentoScreen';
import { GestaoAlertasScreen } from './screens/gestao/GestaoAlertasScreen';
import { GestaoRelatoriosScreen } from './screens/gestao/GestaoRelatoriosScreen';
import { GestaoConfigScreen } from './screens/gestao/GestaoConfigScreen';

const ONBOARDED_KEY = 'anjo_onboarded';

function getInitialScreen(): ScreenType {
  if (typeof window === 'undefined') return 'login' as ScreenType;
  // Colaborador já onboardado (concluiu o primeiro check-in em algum momento)
  // pula direto pro Jardim; senão, o acesso (login) é sempre a primeira tela.
  return window.localStorage.getItem(ONBOARDED_KEY) ? 'dashboard' : 'login';
}

function getInitialViewMode(): ViewMode {
  if (typeof window === 'undefined') return 'desktop';
  return window.innerWidth < 900 ? 'mobile' : 'desktop';
}

export default function App() {
  const [persona, setPersona] = useState<Persona>('colaborador');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(getInitialScreen);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);

  const DEFAULT_USER: UserProfile = {
    matricula: '84920',
    setor: 'producao',
    turno: 'manha',
    gotas: 1,
    score: 0,
    termAccepted: false
  };

  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Logout "de demonstração" — limpa o marcador de onboarding e os dados do
  // colaborador, e volta pro login como se fosse literalmente a primeira
  // visita (tutorial, plantio, tudo do zero de novo).
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ONBOARDED_KEY);
    }
    setUser(DEFAULT_USER);
    setPersona('colaborador');
    setActiveTab('home');
    setCurrentScreen('login');
  };

  const handleNavigateScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);

    // O onboarding só é marcado como concluído dentro do próprio tutorial
    // (DashboardScreen.finishTutorial), depois que o colaborador o percorre —
    // marcar aqui, só por chegar na tela, impedia o tutorial de aparecer.

    if (screen === 'dashboard') setActiveTab('home');
    else if (screen === 'checkin' || screen === 'checkin-success') setActiveTab('checkin');
    else if (screen === 'health') setActiveTab('health');
    else if (screen === 'booking') setActiveTab('selfcare');
    else if (screen === 'selfcare' || screen === 'session') setActiveTab('selfcare');
  };

  const handleSwitchPersona = () => {
    if (persona === 'colaborador') {
      setPersona('gestao');
      setCurrentScreen('gestao-painel');
    } else {
      setPersona('colaborador');
      setCurrentScreen('dashboard');
    }
  };

  // ---------------- Persona Gestão ----------------
  if (persona === 'gestao') {
    const renderGestaoScreen = () => {
      switch (currentScreen) {
        case 'gestao-engajamento':
          return <GestaoEngajamentoScreen viewMode={viewMode} />;
        case 'gestao-alertas':
          return <GestaoAlertasScreen viewMode={viewMode} />;
        case 'gestao-relatorios':
          return <GestaoRelatoriosScreen viewMode={viewMode} />;
        case 'gestao-config':
          return <GestaoConfigScreen viewMode={viewMode} />;
        case 'gestao-painel':
        default:
          return <GestaoPainelScreen viewMode={viewMode} />;
      }
    };

    return (
      <>
        <GestaoLayout
          currentScreen={currentScreen}
          onNavigateScreen={handleNavigateScreen}
          viewMode={viewMode}
          onSwitchPersona={handleSwitchPersona}
        >
          {renderGestaoScreen()}
        </GestaoLayout>
        <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
      </>
    );
  }

  // ---------------- Persona Colaborador ----------------

  // Telas de onboarding / fluxo sem navegação (tela cheia, sem sidebar/bottom nav)
  const isFullBleed =
    currentScreen === 'consent' ||
    currentScreen === 'login' ||
    currentScreen === 'checkin' ||
    currentScreen === 'checkin-success' ||
    currentScreen === 'session';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'consent':
        return (
          <ConsentScreen
            onAccept={() => handleUpdateUser({ termAccepted: true })}
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
          />
        );
      case 'login':
        return (
          <LoginScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
          />
        );
      case 'checkin':
        return (
          <CheckinScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
          />
        );
      case 'checkin-success':
        return <CheckinSuccessScreen user={user} onNavigateScreen={handleNavigateScreen} />;
      case 'selfcare':
        return (
          <SelfCareCatalogScreen
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
          />
        );
      case 'booking':
        return (
          <BookingScreen
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
          />
        );
      case 'session':
        return (
          <MindfulnessSessionScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
          />
        );
      case 'health':
        return <HealthScreen user={user} onNavigateScreen={handleNavigateScreen} />;
      case 'dashboard':
      default:
        return (
          <DashboardScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
            onLogout={handleLogout}
          />
        );
    }
  };

  if (isFullBleed) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] text-[#1C1B1C] antialiased selection:bg-[#E9DDFF] selection:text-[#210F49]">
        {renderScreen()}
        <ImageLinksDrawer isOpen={isImageDrawerOpen} onClose={() => setIsImageDrawerOpen(false)} />
      </div>
    );
  }

  const isDesktop = viewMode === 'desktop';

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#1C1B1C] flex antialiased selection:bg-[#E9DDFF] selection:text-[#210F49]">
      {isDesktop && <SideNavBar currentScreen={currentScreen} onNavigateScreen={handleNavigateScreen} onSwitchPersona={handleSwitchPersona} />}

      <div className={`flex-1 flex flex-col min-w-0 ${isDesktop ? 'lg:ml-60' : ''}`}>
        <TopHeader onNavigateScreen={handleNavigateScreen} onSwitchPersona={isDesktop ? undefined : handleSwitchPersona} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col">{renderScreen()}</div>
        {!isDesktop && (
          <BottomNavBar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onNavigateScreen={handleNavigateScreen}
            gotas={user.gotas}
          />
        )}
      </div>

      <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
      <ImageLinksDrawer isOpen={isImageDrawerOpen} onClose={() => setIsImageDrawerOpen(false)} />
    </div>
  );
}

// Controle discreto e flutuante para forçar modo mobile/desktop manualmente,
// independente da largura real da janela — útil para demonstração.
function ViewModeToggle({ viewMode, onChange }: { viewMode: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="fixed bottom-3 right-3 z-50 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-full shadow-lg flex items-center p-1 gap-0.5">
      <button
        onClick={() => onChange('mobile')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          viewMode === 'mobile' ? 'bg-[#14181F] text-white' : 'text-neutral-400 hover:text-neutral-700'
        }`}
        title="Modo mobile"
      >
        <span className="material-symbols-outlined text-base">smartphone</span>
      </button>
      <button
        onClick={() => onChange('desktop')}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          viewMode === 'desktop' ? 'bg-[#14181F] text-white' : 'text-neutral-400 hover:text-neutral-700'
        }`}
        title="Modo desktop"
      >
        <span className="material-symbols-outlined text-base">laptop</span>
      </button>
    </div>
  );
}
