import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Plus, CheckCircle, Download, Play } from 'lucide-react';
import { GameActionProps } from '@/types';

export const Library = ({ onGameSelect }: GameActionProps) => {
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
          <Button variant="default" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Game
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onGameSelect(game.id)}
          >
            <div className={`h-32 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
              <div className="text-2xl font-bold text-white">
                {game.name.substring(0, 1)}
              </div>
              {game.installed && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium leading-tight">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.developer}</p>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size: {game.size}</span>
                  {game.installed && (
                    <span className="text-muted-foreground">{game.playtime}</span>
                  )}
                </div>
                
                <Button
                  variant={game.installed ? "default" : "secondary"}
                  size="sm"
                  className="w-full gap-2"
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
