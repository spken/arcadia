// Types and interfaces for the Arcadia game manager application

export interface SideNavProps {
  currentView: string;
  onChange: (view: string) => void;
  libraryStatus: LibraryStatus;
}

export interface GameActionProps {
  onGameSelect: (gameId: string) => void;
}

export interface GameDetailProps {
  gameId: string;
  onBack: () => void;
}

export interface LibraryStatus {
  totalGames: number;
  scanning: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  systemMetricsEnabled: boolean;
  language: string;
  startWithWindows: boolean;
  autoUpdateGames: boolean;
  performanceOverlay: boolean;
  hardwareAcceleration: boolean;
  sharePlayStatistics: boolean;
  usageDataCollection: boolean;
  defaultInstallPath: string;
}

export type SettingsContextType = {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  isLoading?: boolean;
};
