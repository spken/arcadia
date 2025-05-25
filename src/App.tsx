import { useState, useEffect } from 'react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastContextProvider } from '@/components/ui/toast';
import { SideNav } from '@/components/SideNav';
import { TopBar } from '@/components/TopBar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Dashboard } from '@/components/Dashboard';
import { Library } from '@/components/Library';
import { Analytics } from '@/components/Analytics';
import { Settings } from '@/components/Settings';
import { GameDetail } from '@/components/GameDetail';

export default function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleGameSelect = (gameId: string): void => {
    setSelectedGameId(gameId);
    setCurrentView('game-detail');
  };  return (
    <SettingsProvider>
      <ThemeProvider>
        <ToastContextProvider>
          <div className="h-screen flex flex-col bg-background text-foreground">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
              <SideNav
                currentView={currentView}
                onChange={setCurrentView}
              />
              <main className="flex-1 overflow-auto">
                {currentView === 'dashboard' && <Dashboard onGameSelect={handleGameSelect} onChangeView={setCurrentView} />}
                {currentView === 'library' && <Library onGameSelect={handleGameSelect} />}
                {currentView === 'analytics' && <Analytics />}
                {currentView === 'settings' && <Settings />}
                {currentView === 'game-detail' && selectedGameId && (
                  <GameDetail
                    gameId={selectedGameId}
                    onBack={() => setCurrentView('library')}
                  />
                )}
              </main>
            </div>
          </div>
        </ToastContextProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}