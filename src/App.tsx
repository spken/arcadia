import { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
const Dashboard = ({ onGameSelect }: GameActionProps) => {
  // Placeholder data
  const recentGames = [
    { id: 'game1', name: 'Cyberpunk 2077', lastPlayed: '2 hours ago', playtime: '45h' },
    { id: 'game2', name: 'Elden Ring', lastPlayed: 'yesterday', playtime: '120h' },
    { id: 'game3', name: 'Baldur\'s Gate 3', lastPlayed: '3 days ago', playtime: '80h' }
  ];
  
  const systemStats = {
    cpu: '45%',
    memory: '6.2 GB / 16 GB',
    gpu: '30%',
    storage: '450 GB free'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <Button variant="outline">Refresh Library</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGames.map(game => (
                <div key={game.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">{game.name}</h3>
                    <p className="text-sm text-muted-foreground">Last played: {game.lastPlayed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{game.playtime}</Badge>
                    <Button size="sm" onClick={() => onGameSelect(game.id)}>Play</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <p className="text-sm">CPU Usage:</p>
                <p className="text-sm font-medium text-right">{systemStats.cpu}</p>
                
                <p className="text-sm">Memory:</p>
                <p className="text-sm font-medium text-right">{systemStats.memory}</p>
                
                <p className="text-sm">GPU Usage:</p>
                <p className="text-sm font-medium text-right">{systemStats.gpu}</p>
                
                <p className="text-sm">Free Storage:</p>
                <p className="text-sm font-medium text-right">{systemStats.storage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Library Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Games</span>
                <span className="font-medium">24</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Installed</span>
                <span className="font-medium">12</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Available Updates</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onGameSelect('game1')} variant="outline" className="w-full">
              View Library
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Game Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-2xl font-bold">45h</p>
              <p className="text-sm text-muted-foreground">Total playtime this month</p>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="font-medium">12</p>
                <p className="text-xs text-muted-foreground">Games Played</p>
              </div>
              <div>
                <p className="font-medium">3</p>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
              <div>
                <p className="font-medium">8h</p>
                <p className="text-xs text-muted-foreground">Weekly Avg.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onGameSelect('game1')} variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const Library = ({ onGameSelect }: GameActionProps) => {
  // Placeholder game data
  const games = [
    { id: 'game1', name: 'Cyberpunk 2077', developer: 'CD Projekt Red', installed: true, size: '65.2 GB' },
    { id: 'game2', name: 'Elden Ring', developer: 'FromSoftware', installed: true, size: '44.7 GB' },
    { id: 'game3', name: 'Baldur\'s Gate 3', developer: 'Larian Studios', installed: true, size: '122.0 GB' },
    { id: 'game4', name: 'Red Dead Redemption 2', developer: 'Rockstar Games', installed: false, size: '112.5 GB' },
    { id: 'game5', name: 'The Witcher 3', developer: 'CD Projekt Red', installed: false, size: '50.0 GB' },
    { id: 'game6', name: 'Mass Effect Legendary', developer: 'BioWare', installed: false, size: '120.0 GB' },
  ];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Game Library</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Sort</Button>
          <Button variant="default" size="sm">Add Game</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <Card key={game.id} className="overflow-hidden">
            <div 
              className="h-36 bg-accent flex items-center justify-center cursor-pointer"
              onClick={() => onGameSelect(game.id)}
            >
              <div className="text-2xl font-bold text-muted-foreground">
                {game.name.substring(0, 1)}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{game.name}</h3>
                <Badge variant={game.installed ? "secondary" : "outline"}>
                  {game.installed ? "Installed" : "Not Installed"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{game.developer}</p>
              <p className="text-sm text-muted-foreground">{game.size}</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onGameSelect(game.id)}
                >
                  {game.installed ? "Play" : "Install"}
                </Button>
                <Button variant="outline" size="sm">•••</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Screenshots = () => {
  // Placeholder screenshot data
  const screenshots = [
    { id: 'ss1', game: 'Cyberpunk 2077', date: 'May 15, 2025', size: '4.2 MB' },
    { id: 'ss2', game: 'Elden Ring', date: 'May 10, 2025', size: '3.8 MB' },
    { id: 'ss3', game: 'Baldur\'s Gate 3', date: 'May 8, 2025', size: '5.1 MB' },
    { id: 'ss4', game: 'Cyberpunk 2077', date: 'May 7, 2025', size: '4.5 MB' },
    { id: 'ss5', game: 'Red Dead Redemption 2', date: 'May 5, 2025', size: '6.2 MB' },
    { id: 'ss6', game: 'Elden Ring', date: 'May 3, 2025', size: '3.5 MB' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Screenshots</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter by Game</Button>
          <Button variant="default" size="sm">Import</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map(screenshot => (
          <Card key={screenshot.id} className="overflow-hidden">
            <div className="h-48 bg-accent flex items-center justify-center">
              <div className="text-muted-foreground font-bold">
                Screenshot Preview
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{screenshot.game}</h3>
                <Badge variant="outline">{screenshot.size}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{screenshot.date}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">View</Button>
                <Button variant="outline" size="sm" className="flex-1">Share</Button>
                <Button variant="outline" size="sm" className="flex-1">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">This Week</Button>
          <Button variant="outline" size="sm">This Month</Button>
          <Button variant="outline" size="sm">All Time</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold">45h</h3>
              <p className="text-sm text-muted-foreground">Total Play Time</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Games Played</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold">24</h3>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold">8.5h</h3>
              <p className="text-sm text-muted-foreground">Weekly Average</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Most Played Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                    <span>E</span>
                  </div>
                  <div>
                    <p className="font-medium">Elden Ring</p>
                    <p className="text-xs text-muted-foreground">FromSoftware</p>
                  </div>
                </div>
                <p className="font-medium">120h 15m</p>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                    <span>W</span>
                  </div>
                  <div>
                    <p className="font-medium">The Witcher 3</p>
                    <p className="text-xs text-muted-foreground">CD Projekt Red</p>
                  </div>
                </div>
                <p className="font-medium">130h 55m</p>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                    <span>B</span>
                  </div>
                  <div>
                    <p className="font-medium">Baldur's Gate 3</p>
                    <p className="text-xs text-muted-foreground">Larian Studios</p>
                  </div>
                </div>
                <p className="font-medium">80h 42m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gaming Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Activity Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cyberpunk 2077</h3>
                <p className="text-sm text-muted-foreground">May 19, 2025 • 2h 15m</p>
              </div>
              <Badge>Today</Badge>
            </div>
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Elden Ring</h3>
                <p className="text-sm text-muted-foreground">May 18, 2025 • 3h 45m</p>
              </div>
              <Badge variant="outline">Yesterday</Badge>
            </div>
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Baldur's Gate 3</h3>
                <p className="text-sm text-muted-foreground">May 17, 2025 • 5h 10m</p>
              </div>
              <Badge variant="outline">3 days ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">Change the appearance of the application</p>
              </div>
              <Button variant="outline">Dark</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Language</h3>
                <p className="text-sm text-muted-foreground">Set your preferred language</p>
              </div>
              <Button variant="outline">English</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Start with Windows</h3>
                <p className="text-sm text-muted-foreground">Launch Arcadia when you log in</p>
              </div>
              <Button variant="outline">Off</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game Installation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Default Installation Path</h3>
                <p className="text-sm text-muted-foreground">Set where games are installed by default</p>
              </div>
              <Button variant="outline">C:\Games</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Auto-update Games</h3>
                <p className="text-sm text-muted-foreground">Automatically update games when available</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Performance Overlay</h3>
                <p className="text-sm text-muted-foreground">Show FPS and system stats in-game</p>
              </div>
              <Button variant="outline">Off</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Hardware Acceleration</h3>
                <p className="text-sm text-muted-foreground">Use GPU for UI rendering</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Share Play Statistics</h3>
                <p className="text-sm text-muted-foreground">Allow sharing of your play activity with friends</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Usage Data Collection</h3>
                <p className="text-sm text-muted-foreground">Help improve Arcadia by sending anonymous usage data</p>
              </div>
              <Button variant="outline">Off</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Arcadia Game Manager</h3>
              <p className="text-sm text-muted-foreground">Version 0.1.0 (Alpha)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Check for Updates</Button>
              <Button variant="outline">View Licenses</Button>
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
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack} size="sm">
            Back
          </Button>
          <h1 className="text-2xl font-bold">{gameDetails.name}</h1>
        </div>
        <div className="flex gap-2">
          {gameDetails.installed ? (
            <>
              <Button variant="default">Play</Button>
              <Button variant="outline">Update</Button>
            </>
          ) : (
            <Button variant="default">Install</Button>
          )}
          <Button variant="outline">•••</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="h-64 bg-accent flex items-center justify-center">
              <div className="text-4xl font-bold text-muted-foreground">
                {gameDetails.name.substring(0, 1)}
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{gameDetails.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium">Developer</h3>
                  <p className="text-sm">{gameDetails.developer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Publisher</h3>
                  <p className="text-sm">{gameDetails.publisher}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Release Date</h3>
                  <p className="text-sm">{gameDetails.releaseDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Install Size</h3>
                  <p className="text-sm">{gameDetails.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DLC & Add-ons</CardTitle>
            </CardHeader>
            <CardContent>
              {gameDetails.dlc.map((dlc, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-none">
                  <div>
                    <p className="font-medium">{dlc.name}</p>
                    <p className="text-sm text-muted-foreground">Expansion Pack</p>
                  </div>
                  <Badge variant={dlc.installed ? "secondary" : "outline"}>
                    {dlc.installed ? "Installed" : "Not Installed"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Play Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span>Total Playtime</span>
                    <span className="font-medium">{gameDetails.playtime}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span>Last Played</span>
                    <span className="font-medium">{gameDetails.lastPlayed}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Achievements</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold">
                        {gameDetails.achievements.unlocked}/{gameDetails.achievements.total}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        {Math.round((gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Minimum</h3>
                  <ul className="text-sm space-y-1">
                    <li><span className="text-muted-foreground">OS:</span> {gameDetails.systemRequirements.minimum.os}</li>
                    <li><span className="text-muted-foreground">CPU:</span> {gameDetails.systemRequirements.minimum.cpu}</li>
                    <li><span className="text-muted-foreground">GPU:</span> {gameDetails.systemRequirements.minimum.gpu}</li>
                    <li><span className="text-muted-foreground">RAM:</span> {gameDetails.systemRequirements.minimum.ram}</li>
                    <li><span className="text-muted-foreground">Storage:</span> {gameDetails.systemRequirements.minimum.storage}</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-1">Recommended</h3>
                  <ul className="text-sm space-y-1">
                    <li><span className="text-muted-foreground">OS:</span> {gameDetails.systemRequirements.recommended.os}</li>
                    <li><span className="text-muted-foreground">CPU:</span> {gameDetails.systemRequirements.recommended.cpu}</li>
                    <li><span className="text-muted-foreground">GPU:</span> {gameDetails.systemRequirements.recommended.gpu}</li>
                    <li><span className="text-muted-foreground">RAM:</span> {gameDetails.systemRequirements.recommended.ram}</li>
                    <li><span className="text-muted-foreground">Storage:</span> {gameDetails.systemRequirements.recommended.storage}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

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