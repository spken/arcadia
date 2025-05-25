import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BarChart3,
  Clock,
  TrendingUp,
  Gamepad,
  Star,
  Activity,
  Zap
} from 'lucide-react';

export const Analytics = () => {
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
