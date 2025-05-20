import { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define types for props
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

interface SideNavProps {
  currentView: string;
  onChange: (view: string) => void;
  libraryStatus: LibraryStatus;
}

interface GameActionProps {
  onGameSelect: (gameId: string) => void;
}

interface GameDetailProps {
  gameId: string;
  onBack: () => void;
}

interface LibraryStatus {
  totalGames: number;
  scanning: boolean;
}

interface AppSettings {
  theme: string;
}

// Placeholder components - these would be implemented separately
const ThemeProvider = ({ children, defaultTheme = 'dark', storageKey = 'theme' }: ThemeProviderProps) => {
  return <>{children}</>; // Simple pass-through for now
};

const SideNav = ({ currentView, onChange, libraryStatus }: SideNavProps) => (
  <div className="w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
    <div className="p-4 space-y-1">
      {['dashboard', 'library', 'screenshots', 'analytics', 'settings'].map((item) => (
        <Button 
          key={item}
          variant={currentView === item ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => onChange(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  </div>
);

const TopBar = () => (
  <div className="h-14 border-b flex items-center px-4 bg-background">
    <h1 className="text-xl font-bold">Arcadia</h1>
    <div className="ml-auto">
      <Badge variant="outline">Alpha</Badge>
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Loading...</h2>
      <div className="animate-pulse">Please wait</div>
    </div>
  </div>
);

// Placeholder page components
const Dashboard = ({ onGameSelect }: GameActionProps) => (
  <div className="p-6">
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Dashboard content would go here</p>
        <Button onClick={() => onGameSelect('game1')}>View Game</Button>
      </CardContent>
    </Card>
  </div>
);

const Library = ({ onGameSelect }: GameActionProps) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Game Library</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {['game1', 'game2', 'game3'].map(gameId => (
        <Card key={gameId} className="cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => onGameSelect(gameId)}>
          <CardContent className="p-4">Game {gameId}</CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const Screenshots = () => <div className="p-6"><h1 className="text-2xl font-bold">Screenshots</h1></div>;
const Analytics = () => <div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>;
const GameDetail = ({ gameId, onBack }: GameDetailProps) => (
  <div className="p-6">
    <Button variant="outline" onClick={onBack} className="mb-4">Back to Library</Button>
    <h1 className="text-2xl font-bold">Game Details: {gameId}</h1>
  </div>
);

export default function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  
  // Placeholder for custom hooks
  const libraryStatus: LibraryStatus = { totalGames: 3, scanning: false };
  const settings: AppSettings = { theme: 'dark' };
  
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
  };
  
  return (
    <ThemeProvider defaultTheme={settings.theme} storageKey="ui-theme">
      <div className="h-screen flex flex-col bg-background text-foreground">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <SideNav 
            currentView={currentView} 
            onChange={setCurrentView}
            libraryStatus={libraryStatus}
          />
          <main className="flex-1 overflow-auto">
            {currentView === 'dashboard' && <Dashboard onGameSelect={handleGameSelect} />}
            {currentView === 'library' && <Library onGameSelect={handleGameSelect} />}
            {currentView === 'screenshots' && <Screenshots />}
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
    </ThemeProvider>
  );
}