import { AppSettings } from '@/types';

const isElectron = typeof window !== 'undefined' && window.electron;

const defaultSettings: AppSettings = {
  nickname: 'Player',
  theme: 'light',
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

export class SettingsManager {
  private static instance: SettingsManager;
  private settings: AppSettings = { ...defaultSettings };
  private settingsPath = 'settings.json';

  private constructor() {}

  static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager();
    }
    return SettingsManager.instance;
  }

  async loadSettings(): Promise<AppSettings> {
    try {      
      if (isElectron && window.electron) {
        const settingsData = await window.electron.readFile(this.settingsPath);
        if (settingsData) {
          this.settings = { ...defaultSettings, ...JSON.parse(settingsData) };
        }
      } else {
        const saved = localStorage.getItem('arcadia-settings');
        if (saved) {
          this.settings = { ...defaultSettings, ...JSON.parse(saved) };
        }
      }
    } catch (error) {
      console.warn('Failed to load settings, using defaults:', error);
      this.settings = { ...defaultSettings };
    }
    return this.settings;
  }
  async saveSettings(newSettings: Partial<AppSettings>): Promise<void> {
    const oldSettings = { ...this.settings };
    this.settings = { ...this.settings, ...newSettings };
    
    try {
      const settingsJson = JSON.stringify(this.settings, null, 2);
      if (isElectron && window.electron) {
        await window.electron.writeFile(this.settingsPath, settingsJson);
        
        if ('hardwareAcceleration' in newSettings && 
            oldSettings.hardwareAcceleration !== newSettings.hardwareAcceleration) {
          await window.electron.hardwareAccelerationChanged();
          return Promise.resolve();
        }
      } else {
        localStorage.setItem('arcadia-settings', settingsJson);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  getSettings(): AppSettings {
    return { ...this.settings };
  }
}

declare global {
  interface Window {
    electron?: {
      readFile: (path: string) => Promise<string | null>;
      writeFile: (path: string, data: string) => Promise<void>;
      restartApp: () => Promise<void>;
      hardwareAccelerationChanged: () => Promise<boolean>;
    };
  }
}
