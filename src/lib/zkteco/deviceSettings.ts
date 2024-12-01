import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DeviceSettings {
  // ADMS Settings
  admsEnabled: boolean;
  enableDomainName: boolean;
  serverAddress: string;
  serverPort: number;
  
  // Proxy Settings
  proxyEnabled: boolean;
  proxyAddress: string;
  proxyPort: number;
  proxyUsername: string;
  proxyPassword: string;

  // Connection Settings
  connectionTimeout: number;
  retryAttempts: number;
  retryDelay: number;
  autoReconnect: boolean;
  syncInterval: number;
  clearLogsAfterSync: boolean;
  verificationMode: 'any' | 'fingerprint' | 'face' | 'card' | 'password';
  deviceCommands: {
    [key: string]: boolean;
  };
}

interface DeviceSettingsState {
  settings: DeviceSettings;
  updateSettings: (settings: Partial<DeviceSettings>) => void;
}

const defaultSettings: DeviceSettings = {
  // ADMS Settings
  admsEnabled: false,
  enableDomainName: false,
  serverAddress: '',
  serverPort: 80,
  
  // Proxy Settings
  proxyEnabled: false,
  proxyAddress: '',
  proxyPort: 8080,
  proxyUsername: '',
  proxyPassword: '',

  // Connection Settings
  connectionTimeout: 5000,
  retryAttempts: 3,
  retryDelay: 5000,
  autoReconnect: true,
  syncInterval: 300000, // 5 minutes
  clearLogsAfterSync: false,
  verificationMode: 'any',
  deviceCommands: {
    enableDevice: true,
    disableDevice: true,
    getTime: true,
    setTime: true,
    getAttendance: true,
    clearAttendance: true,
    getUsers: true,
    setUser: true,
    deleteUser: true,
    getFace: true,
    setFace: true,
    deleteFace: true,
  },
};

export const useDeviceSettingsStore = create<DeviceSettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'device-settings',
    }
  )
);