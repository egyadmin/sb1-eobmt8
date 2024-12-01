import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SystemSettings {
  companyName: string;
  workStartTime: string;
  workEndTime: string;
  gracePeriod: number;
  autoSync: boolean;
  syncInterval: number;
  language: 'ar' | 'en';
  timezone: string;
  deviceSyncEnabled: boolean;
  deviceSyncInterval: number;
  attendanceRules: {
    lateThreshold: number;
    earlyDepartureThreshold: number;
    overtimeThreshold: number;
  };
}

interface SettingsState {
  settings: SystemSettings;
  updateSettings: (settings: Partial<SystemSettings>) => void;
}

const defaultSettings: SystemSettings = {
  companyName: '',
  workStartTime: '09:00',
  workEndTime: '17:00',
  gracePeriod: 15,
  autoSync: true,
  syncInterval: 5,
  language: 'ar',
  timezone: 'Asia/Riyadh',
  deviceSyncEnabled: true,
  deviceSyncInterval: 5,
  attendanceRules: {
    lateThreshold: 15,
    earlyDepartureThreshold: 15,
    overtimeThreshold: 30,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'attendance-settings',
    }
  )
);