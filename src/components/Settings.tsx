import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  RefreshCw,
  Monitor,
  Palette,
  Globe,
  Activity,
  HardDrive,
  Download,
  Zap,
  BarChart3,
  Cpu,
  Shield,
  Users,
  User,
  Info,
  Gamepad,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

export const Settings = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const { addToast } = useToast();
  const [nicknameInput, setNicknameInput] = useState(settings.nickname);

  useEffect(() => {
    setNicknameInput(settings.nickname);
  }, [settings.nickname]);

  const handleNicknameChange = (value: string) => {
    setNicknameInput(value);
  };

  const handleNicknameBlur = async () => {
    const trimmedNickname = nicknameInput.trim();
    const finalNickname = trimmedNickname || 'Player';

    if (finalNickname !== settings.nickname) {
      try {
        await updateSettings({ nickname: finalNickname });
      } catch (error) {
        console.error('Failed to update nickname setting:', error);
        setNicknameInput(settings.nickname);
      }
    }

    setNicknameInput(finalNickname);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

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
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={async () => {
              try {
                const defaultSettings = {
                  nickname: 'Player',
                  theme: 'light' as const,
                  systemMetricsEnabled: true,
                  language: 'english',
                  startWithWindows: false,
                  autoUpdateGames: true,
                  performanceOverlay: false,
                  hardwareAcceleration: true,
                  sharePlayStatistics: true,
                  usageDataCollection: false,
                  defaultInstallPath: 'C:\\Games'
                };
                await updateSettings(defaultSettings);
                setNicknameInput('Player');
              } catch (error) {
                console.error('Failed to reset settings:', error);
              }
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>      <div className="space-y-6 max-w-4xl">
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Nickname</h3>
                  <p className="text-sm text-muted-foreground">How you'll be addressed in the app</p>
                </div>
              </div>
              <Input
                value={nicknameInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleNicknameChange(e.target.value);
                }}
                onBlur={handleNicknameBlur}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                placeholder="Enter your nickname"
                className="w-48"
                maxLength={20}
              />
            </div>
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
              <Button
                variant="outline"
                className="gap-2"
                onClick={async () => {
                  const nextTheme = settings.theme === 'light' ? 'dark' : 'light';
                  try {
                    await updateSettings({ theme: nextTheme });
                  } catch (error) {
                    console.error('Failed to update theme setting:', error);
                  }
                }}
              >
                <Monitor className="h-4 w-4" />
                {settings.theme === 'light' ? 'Light' : 'Dark'}
              </Button>
            </div>
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
              <Switch
                checked={settings.startWithWindows}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ startWithWindows: checked });
                  } catch (error) {
                    console.error('Failed to update start with Windows setting:', error);
                  }
                }}
              />
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
              <Switch
                checked={settings.autoUpdateGames}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ autoUpdateGames: checked });
                  } catch (error) {
                    console.error('Failed to update auto-update games setting:', error);
                  }
                }}
              />
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
              <Switch
                checked={settings.performanceOverlay}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ performanceOverlay: checked });
                  } catch (error) {
                    console.error('Failed to update performance overlay setting:', error);
                  }
                }}
              />
            </div>
            <div className="flex justify-between items-center group hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Hardware Acceleration</h3>
                  <p className="text-sm text-muted-foreground">Use GPU for UI rendering</p>
                </div>
              </div>              <Switch
                checked={settings.hardwareAcceleration}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ hardwareAcceleration: checked });
                    addToast({
                      title: "Restart Required",
                      description: "Hardware acceleration changes require an app restart to take effect.",
                      variant: "warning",
                      duration: 0,
                      action: (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={async () => {
                              try {
                                console.log('Restart button clicked');
                                if (window.electron?.restartApp) {
                                  console.log('Calling restartApp...');
                                  await window.electron.restartApp();
                                  console.log('restartApp called successfully');
                                } else {
                                  console.error('window.electron.restartApp not available');
                                }
                              } catch (error) {
                                console.error('Failed to restart app:', error);
                              }
                            }}
                          >
                            Restart Now
                          </Button>
                        </div>
                      )
                    });
                  } catch (error) {
                    console.error('Failed to update hardware acceleration setting:', error);
                  }
                }}
              />
            </div>
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
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ systemMetricsEnabled: checked });
                  } catch (error) {
                    console.error('Failed to update system metrics setting:', error);
                  }
                }}
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
              <Switch
                checked={settings.sharePlayStatistics}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ sharePlayStatistics: checked });
                  } catch (error) {
                    console.error('Failed to update share play statistics setting:', error);
                  }
                }}
              />
            </div>
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
              <Switch
                checked={settings.usageDataCollection}
                onCheckedChange={async (checked) => {
                  try {
                    await updateSettings({ usageDataCollection: checked });
                  } catch (error) {
                    console.error('Failed to update usage data collection setting:', error);
                  }
                }}
              />
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

            <div className="flex flex-wrap gap-2 mt-4">
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
    </div>  );
};
