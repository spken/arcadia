import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AppSettings, SettingsContextType } from '@/types';
import { SettingsManager } from '@/lib/settings';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {  const [settings, setSettings] = useState<AppSettings>({
    nickname: 'Player',
    theme: 'dark',
    systemMetricsEnabled: true,
    language: 'english',
    startWithWindows: false,
    autoUpdateGames: true,
    performanceOverlay: false,
    hardwareAcceleration: true,
    sharePlayStatistics: true,
    usageDataCollection: false,
    defaultInstallPath: 'C:\\Games'
  });
  const [isLoading, setIsLoading] = useState(true);

  const settingsManager = SettingsManager.getInstance();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await settingsManager.loadSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [settingsManager]);

  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    try {
      setSettings(prev => ({ ...prev, ...newSettings }));
      
      await settingsManager.saveSettings(newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);

      const currentSettings = settingsManager.getSettings();
      setSettings(currentSettings);
    }
  }, [settingsManager]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}
