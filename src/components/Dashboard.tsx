import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Cpu,
  HardDrive,
  Activity,
  Gamepad,
  Play,
  RefreshCw,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';
import { DashboardProps, GameActionProps } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';

export const Dashboard = ({ onGameSelect, onChangeView }: DashboardProps) => {
  const { settings } = useSettings();
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
    // Only fetch system info if system metrics are enabled
    if (!settings.systemMetricsEnabled) {
      return;
    }
    
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
  }, [handleSystemInfoUpdate, settings.systemMetricsEnabled]);

  return (
    <div className="p-6 space-y-6">
      {/* Header with gradient title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, {settings.nickname}
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
        </Card>
      </div>
      {/* System Metrics - Only show if enabled in settings */}
      {settings.systemMetricsEnabled && (
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
                    systemStats.storage.split(' ')[0] + ' GB free'
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
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => onChangeView('library')} 
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
          onClick={() => onChangeView('analytics')} 
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
