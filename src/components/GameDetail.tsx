import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  Play,
  Download,
  BarChart3,
  Star,
  Monitor,
  Plus,
  CheckCircle
} from 'lucide-react';
import { GameDetailProps } from '@/types';

export const GameDetail = ({ gameId, onBack }: GameDetailProps) => {
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
      {/* Header */}
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
            <Button variant="default" className="gap-2">
              <Play className="h-4 w-4" />
              Play
            </Button>
          ) : (
            <Button variant="default" className="gap-2">
              <Download className="h-4 w-4" />
              Install
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Hero */}
          <Card>
            <div className={`h-48 bg-gradient-to-br ${gameDetails.color} flex items-center justify-center relative`}>
              <div className="text-4xl font-bold text-white">
                {gameDetails.name.substring(0, 1)}
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant={gameDetails.installed ? "default" : "outline"}>
                  {gameDetails.installed ? 'Installed' : 'Not Installed'}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              <p className="text-muted-foreground mb-4">{gameDetails.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Developer</h3>
                  <p className="font-medium">{gameDetails.developer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Publisher</h3>
                  <p className="font-medium">{gameDetails.publisher}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Release Date</h3>
                  <p className="font-medium">{gameDetails.releaseDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Size</h3>
                  <p className="font-medium">{gameDetails.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DLC & Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                DLC & Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gameDetails.dlc.map((dlc, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${dlc.installed ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-slate-600'} rounded flex items-center justify-center`}>
                        {dlc.installed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Download className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{dlc.name}</p>
                        <p className="text-sm text-muted-foreground">Expansion Pack</p>
                      </div>
                    </div>
                    <Badge variant={dlc.installed ? "default" : "outline"}>
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
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Playtime</span>
                <span className="font-medium">{gameDetails.playtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Played</span>
                <span className="font-medium">{gameDetails.lastPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{gameDetails.rating}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Achievements</span>
                  <span className="text-sm font-medium">
                    {gameDetails.achievements.unlocked}/{gameDetails.achievements.total}
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((gameDetails.achievements.unlocked / gameDetails.achievements.total) * 100)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Minimum</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">OS:</span>
                    <span>Windows 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span>{gameDetails.systemRequirements.minimum.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span>70 GB</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Recommended</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">OS:</span>
                    <span>Windows 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span>{gameDetails.systemRequirements.recommended.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span>70 GB SSD</span>
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
