/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, NavTab, UserProfile } from './types';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { SideNavBar } from './components/SideNavBar';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { ImageLinksDrawer } from './components/ImageLinksDrawer';

// Screens
import { ConsentScreen } from './screens/ConsentScreen';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { CheckinScreen } from './screens/CheckinScreen';
import { CheckinSuccessScreen } from './screens/CheckinSuccessScreen';
import { SelfCareCatalogScreen } from './screens/SelfCareCatalogScreen';
import { BookingScreen } from './screens/BookingScreen';
import { MindfulnessSessionScreen } from './screens/MindfulnessSessionScreen';
import { HealthScreen } from './screens/HealthScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDeviceFrame, setIsDeviceFrame] = useState(false);
  const [isImageDrawerOpen, setIsImageDrawerOpen] = useState(false);

  const [user, setUser] = useState<UserProfile>({
    matricula: '84920',
    setor: 'producao',
    turno: 'manha',
    gotas: 1,
    score: 0,
    termAccepted: true
  });

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Alterna entre estado de "primeiro acesso" (zerado) e "uso contínuo"
  // (com histórico) — só para facilitar demonstração nesta ferramenta.
  const handleToggleDemoData = () => {
    setUser((prev) =>
      prev.score > 0
        ? { ...prev, gotas: 1, score: 0 }
        : { ...prev, gotas: 92, score: 85 }
    );
  };

  const handleNavigateScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);

    // Sync active tab
    if (screen === 'dashboard') setActiveTab('home');
    else if (screen === 'checkin' || screen === 'checkin-success') setActiveTab('checkin');
    else if (screen === 'health') setActiveTab('health');
    else if (screen === 'booking') setActiveTab('selfcare');
    else if (screen === 'selfcare' || screen === 'session') setActiveTab('selfcare');
  };

  // Render current screen component
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
      case 'dashboard':
        return (
          <DashboardScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
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
        return (
          <CheckinSuccessScreen
            user={user}
            onNavigateScreen={handleNavigateScreen}
          />
        );
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
        return (
          <HealthScreen
            user={user}
            onNavigateScreen={handleNavigateScreen}
          />
        );
      default:
        return (
          <DashboardScreen
            user={user}
            onUpdateUser={handleUpdateUser}
            onNavigateScreen={handleNavigateScreen}
            onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
          />
        );
    }
  };

  const showBottomNav =
    currentScreen !== 'consent' &&
    currentScreen !== 'login' &&
    currentScreen !== 'session';

  const showSideNav =
    !isDeviceFrame &&
    currentScreen !== 'consent' &&
    currentScreen !== 'login' &&
    currentScreen !== 'session';

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#1C1B1C] flex flex-col antialiased selection:bg-[#E9DDFF] selection:text-[#210F49]">
      {/* Top Switcher Bar */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={handleNavigateScreen}
        isDeviceFrame={isDeviceFrame}
        onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
        onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
        hasHistory={user.score > 0}
        onToggleDemoData={handleToggleDemoData}
      />

      {/* Main Content Layout */}
      {isDeviceFrame ? (
        /* Device Mockup Mode (Phone Frame) */
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-neutral-900/90 overflow-y-auto">
          <div className="w-full max-w-[420px] min-h-[850px] bg-[#FCF8F9] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[10px] border-neutral-800 overflow-hidden relative flex flex-col my-auto">
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-neutral-800 rounded-full z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-neutral-700 rounded-full" />
            </div>

            {/* Screen View */}
            <div className="flex-1 overflow-y-auto pt-6 flex flex-col">
              {renderScreen()}
            </div>

            {/* In-Frame Bottom Nav */}
            {showBottomNav && (
              <BottomNavBar
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                onNavigateScreen={handleNavigateScreen}
                gotas={user.gotas}
              />
            )}
          </div>
        </div>
      ) : (
        /* Full Responsive Layout */
        <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-45px)]">
          {/* SideNavBar on Desktop */}
          {showSideNav && (
            <SideNavBar
              currentScreen={currentScreen}
              onNavigateScreen={handleNavigateScreen}
            />
          )}

          {/* Main App Container */}
          <div className={`flex-1 flex flex-col transition-all ${showSideNav ? 'lg:ml-60' : ''}`}>
            {/* Top Header */}
            {currentScreen !== 'consent' && currentScreen !== 'login' && currentScreen !== 'session' && (
              <TopHeader
                onNavigateScreen={handleNavigateScreen}
                onOpenImageDrawer={() => setIsImageDrawerOpen(true)}
              />
            )}

            <div className="flex-1 flex flex-col">
              {renderScreen()}
            </div>

            {/* Bottom Nav on Mobile */}
            {showBottomNav && (
              <div className="lg:hidden">
                <BottomNavBar
                  activeTab={activeTab}
                  onSelectTab={setActiveTab}
                  onNavigateScreen={handleNavigateScreen}
                  gotas={user.gotas}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Direct Image Links Drawer Modal */}
      <ImageLinksDrawer
        isOpen={isImageDrawerOpen}
        onClose={() => setIsImageDrawerOpen(false)}
      />
    </div>
  );
}
