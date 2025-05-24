import { useState, useEffect, useCallback, ReactNode, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart3, 
  Settings as SettingsIcon, 
  Cpu, 
  HardDrive, 
  Activity, 
  Gamepad, 
  Play, 
  RefreshCw,
  Sparkles,
  Filter,
  ArrowUpDown,
  Plus,
  CheckCircle,
  Download,
  Star,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Users,
  Zap,
  Monitor,
  Palette,
  Globe,
  Shield,
  Info,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';

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
  systemMetricsEnabled: boolean;
}

type SettingsContextType = {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Placeholder components - these would be implemented separately
const ThemeProvider = ({ children, defaultTheme = 'dark', storageKey = 'theme' }: ThemeProviderProps) => {
  return <>{children}</>; // Simple pass-through for now
};

const SideNav = ({ currentView, onChange, libraryStatus }: SideNavProps) => (
  <div className="w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
    <div className="p-4 space-y-1">
      {['dashboard', 'library', 'analytics', 'settings'].map((item) => (
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
const Dashboard = ({ onGameSelect }: GameActionProps) => {
  const recentGames = [
    { id: 'game1', name: 'Cyberpunk 2077', lastPlayed: '2 hours ago' },
    { id: 'game2', name: 'Elden Ring', lastPlayed: 'yesterday' },
    { id: 'game3', name: 'Baldur\'s Gate 3', lastPlayed: '3 days ago' }
  ];

  const [systemStats, setSystemStats] = useState({
    cpu: '0%',
    memory: '0 GB / 0 GB',
    gpu: '0%',
    storage: '0 GB free'
  });
  
  const [loading, setLoading] = useState({
    cpu: true,
    memory: true,
    gpu: true,
    storage: true
  });

  const handleSystemInfoUpdate = useCallback((_event: any, info: any) => {
    setSystemStats(prevStats => {
      if (
        prevStats.cpu !== info.cpu ||
        prevStats.memory !== info.memory ||
        prevStats.gpu !== info.gpu ||
        prevStats.storage !== info.storage
      ) {
        return info;
      }
      return prevStats;
    });
    setLoading({cpu: false, memory: false, gpu: false, storage: false});
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    setLoading({cpu: true, memory: true, gpu: true, storage: true});
    
    window.ipcRenderer.getSystemInfo().then((info) => {
      if (isMounted) {
        setSystemStats(info);
        setLoading({cpu: false, memory: false, gpu: false, storage: false});
      }
    }).catch(err => {
      console.error('Failed to get system info:', err);
      if (isMounted) {
        setLoading({cpu: false, memory: false, gpu: false, storage: false});
      }
    });

    window.ipcRenderer.on('system-info-update', handleSystemInfoUpdate);

    return () => {
      isMounted = false;
      window.ipcRenderer.off('system-info-update', handleSystemInfoUpdate);
    };
  }, [handleSystemInfoUpdate]);

  return (
    <div className="p-6 space-y-6">
      {/* Header with gradient title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, Player
          </h1>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Library
        </Button>
      </div>

      {/* Recent Games */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gamepad className="h-5 w-5" />
            <CardTitle>Recent Games</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentGames.map((game) => (
              <div 
                key={game.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onGameSelect(game.id)}
              >
                <div>
                  <h3 className="font-medium">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last played: {game.lastPlayed}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gamepad className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Games in Library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Installed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45h</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>System Metrics</CardTitle>
            {loading.cpu || loading.memory || loading.gpu || loading.storage ? (
              <Badge variant="outline" className="ml-auto">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Loading...
              </Badge>
            ) : (
              <Badge variant="success" className="ml-auto">
                Live
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* CPU Usage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">CPU</span>
              </div>
              <div className="text-lg font-bold text-blue-600">
                {loading.cpu ? (
                  <div className="w-12 h-5 bg-muted rounded animate-pulse"></div>
                ) : (
                  systemStats.cpu
                )}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                {loading.cpu ? (
                  <div className="h-full w-full bg-blue-500/30 animate-pulse"></div>
                ) : (
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${systemStats.cpu !== 'Error' ? parseInt(systemStats.cpu) : 0}%` }}
                  ></div>
                )}
              </div>
            </div>

            {/* Memory Usage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Memory</span>
              </div>
              <div className="text-lg font-bold text-purple-600">
                {loading.memory ? (
                  <div className="w-16 h-5 bg-muted rounded animate-pulse"></div>
                ) : (
                  systemStats.memory.split(' / ')[0]
                )}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                {loading.memory ? (
                  <div className="h-full w-full bg-purple-500/30 animate-pulse"></div>
                ) : (
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: systemStats.memory !== 'Error'
                        ? `${(parseFloat(systemStats.memory.split(' ')[0]) / parseFloat(systemStats.memory.split(' ')[3])) * 100}%`
                        : '0%'
                    }}
                  ></div>
                )}
              </div>
            </div>

            {/* GPU Usage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">GPU</span>
              </div>
              <div className="text-lg font-bold text-yellow-600">
                {loading.gpu ? (
                  <div className="w-12 h-5 bg-muted rounded animate-pulse"></div>
                ) : (
                  systemStats.gpu
                )}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                {loading.gpu ? (
                  <div className="h-full w-full bg-yellow-500/30 animate-pulse"></div>
                ) : (
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${systemStats.gpu !== 'Error' && systemStats.gpu !== 'N/A' ? parseInt(systemStats.gpu) : 0}%` }}
                  ></div>
                )}
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Storage</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {loading.storage ? (
                  <div className="w-16 h-5 bg-muted rounded animate-pulse"></div>
                ) : (
                  systemStats.storage.split(' ')[0] + ' GB Free'
                )}
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                {loading.storage ? (
                  <div className="h-full w-full bg-green-500/30 animate-pulse"></div>
                ) : (
                  systemStats.storage !== 'Error' && (
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${100 - (parseFloat(systemStats.storage.split(' ')[0]) / parseFloat(systemStats.storage.split(' ')[4])) * 100}%`
                      }}
                    ></div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => onGameSelect('game1')} 
          variant="outline" 
          className="h-16 text-left justify-start gap-3"
        >
          <Activity className="h-5 w-5" />
          <div>
            <div className="font-medium">View Library</div>
            <div className="text-sm text-muted-foreground">Browse all your games</div>
          </div>
        </Button>

        <Button 
          onClick={() => onGameSelect('game1')} 
          variant="outline" 
          className="h-16 text-left justify-start gap-3"
        >
          <BarChart3 className="h-5 w-5" />
          <div>
            <div className="font-medium">View Analytics</div>
            <div className="text-sm text-muted-foreground">See your gaming stats</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

const Library = ({ onGameSelect }: GameActionProps) => {
  // Enhanced game data with additional properties
  const games = [
    { 
      id: 'game1', 
      name: 'Cyberpunk 2077', 
      developer: 'CD Projekt Red', 
      installed: true, 
      size: '65.2 GB',
      playtime: '45h',
      lastPlayed: '2 hours ago',
      rating: 4.2,
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      id: 'game2', 
      name: 'Elden Ring', 
      developer: 'FromSoftware', 
      installed: true, 
      size: '44.7 GB',
      playtime: '120h',
      lastPlayed: 'yesterday',
      rating: 4.8,
      color: 'from-amber-500 to-yellow-600'
    },
    { 
      id: 'game3', 
      name: 'Baldur\'s Gate 3', 
      developer: 'Larian Studios', 
      installed: true, 
      size: '122.0 GB',
      playtime: '80h',
      lastPlayed: '3 days ago',
      rating: 4.7,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'game4', 
      name: 'Red Dead Redemption 2', 
      developer: 'Rockstar Games', 
      installed: false, 
      size: '112.5 GB',
      playtime: '0h',
      lastPlayed: 'never',
      rating: 4.5,
      color: 'from-red-500 to-orange-600'
    },
    { 
      id: 'game5', 
      name: 'The Witcher 3', 
      developer: 'CD Projekt Red', 
      installed: false, 
      size: '50.0 GB',
      playtime: '0h',
      lastPlayed: 'never',
      rating: 4.6,
      color: 'from-gray-500 to-slate-600'
    },
    { 
      id: 'game6', 
      name: 'Mass Effect Legendary', 
      developer: 'BioWare', 
      installed: false, 
      size: '120.0 GB',
      playtime: '0h',
      lastPlayed: 'never',
      rating: 4.4,
      color: 'from-blue-500 to-indigo-600'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Game Library
          </h1>
          <p className="text-muted-foreground mt-1">
            {games.filter(g => g.installed).length} of {games.length} games installed
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Game
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <Card 
            key={game.id} 
            className="overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`relative h-40 bg-gradient-to-br ${game.color} flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-105`}
              onClick={() => onGameSelect(game.id)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="relative">
                <div className="text-4xl font-bold text-white drop-shadow-lg">
                  {game.name.substring(0, 1)}
                </div>
                {game.installed && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Play overlay */}
              {game.installed && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-tight mb-1">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.developer}</p>
                </div>
                <Badge 
                  variant={game.installed ? "default" : "outline"}
                  className={game.installed ? "bg-green-500/20 text-green-700 border-green-500/30" : ""}
                >
                  {game.installed ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Installed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      Not Installed
                    </div>
                  )}
                </Badge>
              </div>
              
              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Size</div>
                  <div className="text-sm font-medium">{game.size}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Playtime</div>
                  <div className="text-sm font-medium">{game.playtime}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <div className="text-xs text-muted-foreground">Rating</div>
                  <div className="text-sm font-medium flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {game.rating}
                  </div>
                </div>
              </div>
              
              {game.installed && game.lastPlayed !== 'never' && (
                <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last played: {game.lastPlayed}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant={game.installed ? "default" : "secondary"}
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => onGameSelect(game.id)}
                >
                  {game.installed ? (
                    <>
                      <Play className="h-4 w-4" />
                      Play
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Install
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  
  const analyticsData = {
    totalPlayTime: selectedPeriod === 'This Week' ? '45h' : selectedPeriod === 'This Month' ? '180h' : '2,400h',
    gamesPlayed: selectedPeriod === 'This Week' ? 12 : selectedPeriod === 'This Month' ? 35 : 150,
    achievements: selectedPeriod === 'This Week' ? 24 : selectedPeriod === 'This Month' ? 95 : 1240,
    weeklyAverage: selectedPeriod === 'This Week' ? '8.5h' : selectedPeriod === 'This Month' ? '7.2h' : '6.8h',
  };

  const topGames = [
    { 
      name: 'Elden Ring', 
      developer: 'FromSoftware', 
      playtime: '120h 15m', 
      sessions: 45,
      color: 'from-amber-500 to-yellow-600',
      percentage: 95
    },
    { 
      name: 'The Witcher 3', 
      developer: 'CD Projekt Red', 
      playtime: '130h 55m', 
      sessions: 38,
      color: 'from-gray-500 to-slate-600',
      percentage: 85
    },
    { 
      name: 'Baldur\'s Gate 3', 
      developer: 'Larian Studios', 
      playtime: '80h 42m', 
      sessions: 22,
      color: 'from-purple-500 to-pink-600',
      percentage: 65
    },
    { 
      name: 'Cyberpunk 2077', 
      developer: 'CD Projekt Red', 
      playtime: '45h 23m', 
      sessions: 18,
      color: 'from-yellow-500 to-orange-600',
      percentage: 40
    },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 6.1 },
    { day: 'Fri', hours: 3.7 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: 5.3 },
  ];

  const recentSessions = [
    { 
      game: 'Cyberpunk 2077', 
      date: 'May 24, 2025', 
      duration: '2h 15m', 
      badge: 'Today',
      badgeVariant: 'default' as const,
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      game: 'Elden Ring', 
      date: 'May 23, 2025', 
      duration: '3h 45m', 
      badge: 'Yesterday',
      badgeVariant: 'outline' as const,
      color: 'from-amber-500 to-yellow-600'
    },
    { 
      game: 'Baldur\'s Gate 3', 
      date: 'May 22, 2025', 
      duration: '5h 10m', 
      badge: '2 days ago',
      badgeVariant: 'outline' as const,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      game: 'The Witcher 3', 
      date: 'May 21, 2025', 
      duration: '4h 30m', 
      badge: '3 days ago',
      badgeVariant: 'outline' as const,
      color: 'from-gray-500 to-slate-600'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Gaming Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your gaming habits and performance
          </p>
        </div>
        <div className="flex gap-2">
          {['This Week', 'This Month', 'All Time'].map((period) => (
            <Button 
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-scale animate-fade-in">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600">{analyticsData.totalPlayTime}</h3>
              <p className="text-sm text-muted-foreground">Total Play Time</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover-scale animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Gamepad className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-green-600">{analyticsData.gamesPlayed}</h3>
              <p className="text-sm text-muted-foreground">Games Played</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover-scale animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-yellow-600">{analyticsData.achievements}</h3>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover-scale animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600">{analyticsData.weeklyAverage}</h3>
              <p className="text-sm text-muted-foreground">Weekly Average</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Most Played Games */}
        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Most Played Games</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topGames.map((game, index) => (
                <div key={game.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center text-white font-bold shadow-md`}>
                        {game.name.substring(0, 1)}
                      </div>
                      <div>
                        <p className="font-medium">{game.name}</p>
                        <p className="text-xs text-muted-foreground">{game.developer}</p>
                        <p className="text-xs text-muted-foreground">{game.sessions} sessions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{game.playtime}</p>
                      <p className="text-xs text-muted-foreground">{game.percentage}% of total</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${game.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${game.percentage}%`,
                        animationDelay: `${500 + index * 200}ms`
                      }}
                    ></div>
                  </div>
                  {index < topGames.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gaming Activity Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Weekly Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center flex-1">
                  <div className="relative w-full h-48 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-1000 ease-out hover:from-primary/80 hover:to-primary/40 cursor-pointer"
                      style={{ 
                        height: `${(day.hours / 10) * 100}%`,
                        minHeight: '8px',
                        animationDelay: `${600 + index * 100}ms`
                      }}
                      title={`${day.hours}h on ${day.day}`}
                    ></div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium">{day.day}</p>
                    <p className="text-xs text-muted-foreground">{day.hours}h</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Peak Gaming Day:</span>
                <span className="text-sm text-muted-foreground">Saturday with 8.5 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Recent Gaming Sessions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <div key={`${session.game}-${session.date}`} className="group">
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${session.color} rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform duration-200`}>
                      {session.game.substring(0, 1)}
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors duration-200">{session.game}</h3>
                      <p className="text-sm text-muted-foreground">{session.date} • {session.duration}</p>
                    </div>
                  </div>
                  <Badge variant={session.badgeVariant} className="group-hover:scale-105 transition-transform duration-200">
                    {session.badge}
                  </Badge>
                </div>
                {index < recentSessions.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="p-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your Arcadia experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* General Settings */}
        <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 hover-scale animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-blue-600" />
              <CardTitle>General</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-muted-foreground">Change the appearance of the application</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Monitor className="h-4 w-4" />
                Dark
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-muted-foreground">Set your preferred language</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" />
                English
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Start with Windows</h3>
                  <p className="text-sm text-muted-foreground">Launch Arcadia when you log in</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Game Installation Settings */}
        <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 hover-scale animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-green-600" />
              <CardTitle>Game Installation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <HardDrive className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Default Installation Path</h3>
                  <p className="text-sm text-muted-foreground">Set where games are installed by default</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <HardDrive className="h-4 w-4" />
                C:\Games
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Auto-update Games</h3>
                  <p className="text-sm text-muted-foreground">Automatically update games when available</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Performance Settings */}
        <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20 hover-scale animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <CardTitle>Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Performance Overlay</h3>
                  <p className="text-sm text-muted-foreground">Show FPS and system stats in-game</p>
                </div>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Hardware Acceleration</h3>
                  <p className="text-sm text-muted-foreground">Use GPU for UI rendering</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">System Metrics</h3>
                  <p className="text-sm text-muted-foreground">Show live system metrics in dashboard</p>
                </div>
              </div>
              <Switch
                checked={settings.systemMetricsEnabled}
                onCheckedChange={(checked) => updateSettings({ systemMetricsEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="bg-gradient-to-br from-orange-500/5 to-yellow-500/5 border-orange-500/20 hover-scale animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <CardTitle>Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Share Play Statistics</h3>
                  <p className="text-sm text-muted-foreground">Allow sharing of your play activity with friends</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Usage Data Collection</h3>
                  <p className="text-sm text-muted-foreground">Help improve Arcadia by sending anonymous usage data</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border-indigo-500/20 hover-scale animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-indigo-600" />
              <CardTitle>About</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                <Gamepad className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">Arcadia Game Manager</h3>
                <p className="text-sm text-muted-foreground">Version 0.1.0 (Alpha)</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                    <Activity className="h-3 w-3 mr-1" />
                    Active Development
                  </Badge>
                  <Badge variant="outline">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Early Access
                  </Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Check for Updates
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Licenses
              </Button>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Join Community
              </Button>
              <Button variant="outline" className="gap-2">
                <Info className="h-4 w-4" />
                Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
const GameDetail = ({ gameId, onBack }: GameDetailProps) => {
  // Placeholder game data - in a real app, this would be fetched based on the gameId
  const gameDetails = {
    id: gameId,
    name: gameId === 'game1' ? 'Cyberpunk 2077' :
      gameId === 'game2' ? 'Elden Ring' :
        gameId === 'game3' ? 'Baldur\'s Gate 3' :
          gameId === 'game4' ? 'Red Dead Redemption 2' :
            gameId === 'game5' ? 'The Witcher 3' :
              gameId === 'game6' ? 'Mass Effect Legendary' : `Game ${gameId}`,
    developer: gameId === 'game1' || gameId === 'game5' ? 'CD Projekt Red' :
      gameId === 'game2' ? 'FromSoftware' :
        gameId === 'game3' ? 'Larian Studios' :
          gameId === 'game4' ? 'Rockstar Games' :
            gameId === 'game6' ? 'BioWare' : 'Unknown Developer',
    publisher: gameId === 'game1' || gameId === 'game5' ? 'CD Projekt' :
      gameId === 'game2' ? 'Bandai Namco' :
        gameId === 'game3' ? 'Larian Studios' :
          gameId === 'game4' ? 'Rockstar Games' :
            gameId === 'game6' ? 'Electronic Arts' : 'Unknown Publisher',
    releaseDate: gameId === 'game1' ? 'December 10, 2020' :
      gameId === 'game2' ? 'February 25, 2022' :
        gameId === 'game3' ? 'August 3, 2023' :
          gameId === 'game4' ? 'October 26, 2018' :
            gameId === 'game5' ? 'May 19, 2015' :
              gameId === 'game6' ? 'May 14, 2021' : 'Unknown',
    installed: ['game1', 'game2', 'game3'].includes(gameId),
    size: gameId === 'game1' ? '65.2 GB' :
      gameId === 'game2' ? '44.7 GB' :
        gameId === 'game3' ? '122.0 GB' :
          gameId === 'game4' ? '112.5 GB' :
            gameId === 'game5' ? '50.0 GB' :
              gameId === 'game6' ? '120.0 GB' : 'Unknown',
    playtime: gameId === 'game1' ? '45h 23m' :
      gameId === 'game2' ? '120h 15m' :
        gameId === 'game3' ? '80h 42m' :
          gameId === 'game4' ? '60h 10m' :
            gameId === 'game5' ? '130h 55m' :
              gameId === 'game6' ? '95h 30m' : '0h',
    lastPlayed: gameId === 'game1' ? '2 hours ago' :
      gameId === 'game2' ? 'yesterday' :
        gameId === 'game3' ? '3 days ago' :
          'Never',
    description: 'This is a placeholder description for the game. In a real application, this would contain a detailed description of the game, its features, storyline, and other relevant information.',
    achievements: {
      total: 50,
      unlocked: gameId === 'game1' ? 25 :
        gameId === 'game2' ? 30 :
          gameId === 'game3' ? 15 : 0,
    },
    dlc: [
      { name: 'Expansion 1', installed: true },
      { name: 'Expansion 2', installed: false },
    ],
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-4460 or AMD Ryzen 3 1200',
        gpu: 'NVIDIA GeForce GTX 960 or AMD Radeon R9 280',
        ram: '8 GB RAM',
        storage: '70 GB available space'
      },
      recommended: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i7-4790 or AMD Ryzen 5 1500X',
        gpu: 'NVIDIA GeForce GTX 1060 or AMD Radeon RX 580',
        ram: '12 GB RAM',
        storage: '70 GB SSD'
      }
    },
    color: gameId === 'game1' ? 'from-yellow-500 to-orange-600' :
      gameId === 'game2' ? 'from-purple-500 to-indigo-600' :
        gameId === 'game3' ? 'from-green-500 to-teal-600' :
          gameId === 'game4' ? 'from-red-500 to-orange-600' :
            gameId === 'game5' ? 'from-gray-500 to-slate-600' :
              gameId === 'game6' ? 'from-blue-500 to-indigo-600' : 'from-gray-400 to-gray-600',
    rating: gameId === 'game1' ? 4.2 :
      gameId === 'game2' ? 4.8 :
        gameId === 'game3' ? 4.6 :
          gameId === 'game4' ? 4.4 :
            gameId === 'game5' ? 4.6 :
              gameId === 'game6' ? 4.4 : 4.0
  };

  return (
    <div className="p-6">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack} size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {gameDetails.name}
            </h1>
            <p className="text-muted-foreground">by {gameDetails.developer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {gameDetails.installed ? (
            <>
              <Button variant="default" className="gap-2">
                <Play className="h-4 w-4" />
                Play
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Update
              </Button>
            </>
          ) : (
            <Button variant="default" className="gap-2">
              <Download className="h-4 w-4" />
              Install
            </Button>
          )}
          <Button variant="outline" className="gap-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Hero Card */}
          <Card className="overflow-hidden hover-scale animate-fade-in">
            <div className={`relative h-64 bg-gradient-to-br ${gameDetails.color} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 text-center">
                <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">
                  {gameDetails.name.substring(0, 1)}
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">{gameDetails.rating}</span>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={gameDetails.installed ? "default" : "outline"}
                  className={gameDetails.installed ? "bg-green-500/90 text-white border-green-400" : "bg-black/40 backdrop-blur-sm text-white border-white/20"}
                >
                  <div className="flex items-center gap-1">
                    {gameDetails.installed ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Download className="h-3 w-3" />
                    )}
                    {gameDetails.installed ? 'Installed' : 'Not Installed'}
                  </div>
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{gameDetails.description}</p>

              {/* Enhanced Game Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-medium">Developer</h3>
                  </div>
                  <p className="text-sm font-medium">{gameDetails.developer}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-green-600" />
                    <h3 className="text-sm font-medium">Publisher</h3>
                  </div>
                  <p className="text-sm font-medium">{gameDetails.publisher}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <h3 className="text-sm font-medium">Release Date</h3>
                  </div>
                  <p className="text-sm font-medium">{gameDetails.releaseDate}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive className="h-4 w-4 text-orange-600" />
                    <h3 className="text-sm font-medium">Install Size</h3>
                  </div>
                  <p className="text-sm font-medium">{gameDetails.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DLC & Add-ons */}
          <Card className="hover-scale animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <CardTitle>DLC & Add-ons</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gameDetails.dlc.map((dlc, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${dlc.installed ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-slate-600'} rounded-lg flex items-center justify-center`}>
                        {dlc.installed ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Download className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{dlc.name}</p>
                        <p className="text-sm text-muted-foreground">Expansion Pack</p>
                      </div>
                    </div>
                    <Badge variant={dlc.installed ? "default" : "outline"} className={dlc.installed ? "bg-green-500/20 text-green-700 border-green-500/30" : ""}>
                      {dlc.installed ? "Installed" : "Not Installed"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Play Statistics */}
          <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 hover-scale animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <CardTitle>Play Statistics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">Total Playtime</span>
                    </div>
                    <span className="font-bold text-lg">{gameDetails.playtime}</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Last Played</span>
                    </div>
                    <span className="font-medium">{gameDetails.lastPlayed}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium">Achievements</h3>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        {gameDetails.achievements.unlocked}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        /{gameDetails.achievements.total}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {Math.round((gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card className="bg-gradient-to-br from-green-500/5 to-teal-500/5 border-green-500/20 hover-scale animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-green-600" />
                <CardTitle>System Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-orange-600" />
                    Minimum
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS:</span>
                      <span className="font-medium">{gameDetails.systemRequirements.minimum.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPU:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.minimum.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPU:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.minimum.gpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RAM:</span>
                      <span className="font-medium">{gameDetails.systemRequirements.minimum.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.minimum.storage}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    Recommended
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS:</span>
                      <span className="font-medium">{gameDetails.systemRequirements.recommended.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPU:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.recommended.cpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPU:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.recommended.gpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RAM:</span>
                      <span className="font-medium">{gameDetails.systemRequirements.recommended.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium text-xs">{gameDetails.systemRequirements.recommended.storage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'dark',
    systemMetricsEnabled: true
  });

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default function App(): JSX.Element {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  // Placeholder for custom hooks
  const libraryStatus: LibraryStatus = { totalGames: 3, scanning: false };

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
      <SettingsContext.Consumer>
        {(context) => (
          <ThemeProvider defaultTheme={context?.settings.theme || 'dark'} storageKey="ui-theme">
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
        )}
      </SettingsContext.Consumer>
    </SettingsProvider>
  );
}