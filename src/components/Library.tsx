import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  CheckCircle,
  Download,
  Play,
  Grid3X3,
  List,
  Search,
  Star,
  Clock,
  HardDrive,
  MoreHorizontal
} from 'lucide-react';
import { GameActionProps } from '@/types';

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'lastPlayed' | 'size' | 'rating' | 'playtime';
type FilterBy = 'all' | 'installed' | 'notInstalled';

export const Library = ({ onGameSelect }: GameActionProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
      lastPlayedDate: new Date('2024-05-25T20:00:00'),
      rating: 4.2,
      tags: ['RPG', 'Open World', 'Sci-Fi'],
      releaseDate: '2020-12-10',
      image: 'from-yellow-500 to-orange-600',
      hidden: false
    },
    {
      id: 'game2',
      name: 'Elden Ring',
      developer: 'FromSoftware',
      installed: true,
      size: '44.7 GB',
      playtime: '120h',
      lastPlayed: 'yesterday',
      lastPlayedDate: new Date('2024-05-24T18:00:00'),
      rating: 4.8,
      tags: ['Action RPG', 'Dark Fantasy', 'Souls-like'],
      releaseDate: '2022-02-25',
      image: 'from-amber-500 to-yellow-600',
      hidden: false
    },
    {
      id: 'game3',
      name: 'Baldur\'s Gate 3',
      developer: 'Larian Studios',
      installed: true,
      size: '122.0 GB',
      playtime: '80h',
      lastPlayed: '3 days ago',
      lastPlayedDate: new Date('2024-05-22T15:00:00'),
      rating: 4.7,
      tags: ['RPG', 'Turn-Based', 'Fantasy'],
      releaseDate: '2023-08-03',
      image: 'from-purple-500 to-pink-600',
      hidden: false
    },
    {
      id: 'game4',
      name: 'Red Dead Redemption 2',
      developer: 'Rockstar Games',
      installed: false,
      size: '112.5 GB',
      playtime: '0h',
      lastPlayed: 'never',
      lastPlayedDate: null,
      rating: 4.5,
      tags: ['Action', 'Open World', 'Western'],
      releaseDate: '2018-10-26',
      image: 'from-red-500 to-orange-600',
      hidden: false
    },
    {
      id: 'game5',
      name: 'The Witcher 3: Wild Hunt',
      developer: 'CD Projekt Red',
      installed: false,
      size: '50.0 GB',
      playtime: '0h',
      lastPlayed: 'never',
      lastPlayedDate: null,
      rating: 4.6,
      tags: ['RPG', 'Open World', 'Fantasy'],
      releaseDate: '2015-05-19',
      image: 'from-gray-500 to-slate-600',
      hidden: false
    },
    {
      id: 'game6',
      name: 'Mass Effect Legendary Edition',
      developer: 'BioWare',
      installed: false,
      size: '120.0 GB',
      playtime: '0h',
      lastPlayed: 'never',
      lastPlayedDate: null,
      rating: 4.4,
      tags: ['RPG', 'Sci-Fi', 'Space Opera'],
      releaseDate: '2021-05-14',
      image: 'from-blue-500 to-indigo-600',
      hidden: true
    },
  ];
  // Filter and sort games
  const filteredGames = games
    .filter(game => {
      // Search filter
      if (searchQuery && !game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !game.developer.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Installation filter
      if (filterBy === 'installed' && !game.installed) return false;
      if (filterBy === 'notInstalled' && game.installed) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastPlayed':
          if (!a.lastPlayedDate && !b.lastPlayedDate) return 0;
          if (!a.lastPlayedDate) return 1;
          if (!b.lastPlayedDate) return -1;
          return b.lastPlayedDate.getTime() - a.lastPlayedDate.getTime();
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        case 'rating':
          return b.rating - a.rating;
        case 'playtime':
          return parseInt(b.playtime) - parseInt(a.playtime);
        default:
          return 0;
      }
    });

  const installedCount = games.filter(g => g.installed).length;

  const GridCard = ({ game }: { game: any }) => (
    <Card
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-border/50"
      onClick={() => onGameSelect(game.id)}
    >
      <div className="relative">
        {/* Game Image/Thumbnail */}
        <div className={`h-48 bg-gradient-to-br ${game.image} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
          <div className="text-4xl font-bold text-white drop-shadow-lg relative z-10">
            {game.name.substring(0, 1)}
          </div>

          {/* Status badges */}
          <div className="absolute top-3 left-3">
            {game.installed && (
              <Badge className="bg-green-500/90 text-white border-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                Installed
              </Badge>
            )}
          </div>
          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">            <div className="flex gap-2 relative z-30">
            <Button
              size="sm"
              className="shadow-lg backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle play/install action here
              }}
            >
              {game.installed ? (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-1" />
                  Install
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shadow-lg backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle more options here
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          </div>
        </div>

        {/* Game Info */}
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {game.name}
              </h3>
              <p className="text-sm text-muted-foreground">{game.developer}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-muted/60">
                  {tag}
                </Badge>
              ))}
              {game.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-muted/60">
                  +{game.tags.length - 2}
                </Badge>
              )}
            </div>
            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{game.rating}</span>
                </div>
                {game.installed && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{game.playtime}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                <span>{game.size}</span>
              </div>
              {game.installed && (
                <span>Last played: {game.lastPlayed}</span>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
  const ListItem = ({ game }: { game: any }) => (
    <div
      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border/50"
      onClick={() => onGameSelect(game.id)}
    >
      {/* Game thumbnail */}
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.image} flex items-center justify-center flex-shrink-0 relative overflow-hidden`}>
        <div className="text-sm font-bold text-white drop-shadow">
          {game.name.substring(0, 1)}
        </div>
        {game.installed && (
          <div className="absolute -top-1 -right-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
          </div>
        )}
      </div>

      {/* Game info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
              {game.name}
            </h3>
            <p className="text-xs text-muted-foreground">{game.developer}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground ml-4">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{game.rating}</span>
            </div>

            {game.installed && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{game.playtime}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>{game.size}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="default" className="h-6 px-2 text-xs">
                {game.installed ? (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3 mr-1" />
                    Install
                  </>
                )}
              </Button>
              <Button size="sm" variant="ghost" className="h-6 px-1">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {game.installed && (
          <div className="mt-1 text-xs text-muted-foreground">
            Last played: {game.lastPlayed}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Game Library
          </h1>
          <p className="text-muted-foreground mt-1">
            {installedCount} of {games.length} games installed • {filteredGames.length} games shown
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Game
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Button
              variant={filterBy === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('all')}
            >
              All
            </Button>
            <Button
              variant={filterBy === 'installed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('installed')}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Installed
            </Button>
            <Button
              variant={filterBy === 'notInstalled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('notInstalled')}
            >
              <Download className="h-3 w-3 mr-1" />
              Not Installed
            </Button>
          </div>
          {/* Sort */}
          <select
            className="px-3 py-1 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="name">Name</option>
            <option value="lastPlayed">Last Played</option>
            <option value="size">Size</option>
            <option value="rating">Rating</option>
            <option value="playtime">Playtime</option>
          </select>

          {/* View Toggle */}
          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none border-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none border-0"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Games Display */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchQuery ? 'No games found matching your search.' : 'No games to display with current filters.'}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GridCard key={game.id} game={game} />
          ))}
        </div>) : (
        <div className="space-y-1">
          {filteredGames.map((game) => (
            <ListItem key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};
