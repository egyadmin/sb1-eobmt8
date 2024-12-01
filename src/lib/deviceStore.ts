import { create } from 'zustand';

export interface Device {
  id: string;
  name: string;
  model: 'uFace800' | string;
  ipAddress: string;
  port: number;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  serialNumber: string;
  firmware: string;
  connectionType: 'ethernet' | 'wifi' | 'usb';
}

interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  error: string | null;
  setDevices: (devices: Device[]) => void;
  selectDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  addDevice: (device: Device) => void;
  removeDevice: (id: string) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  selectedDevice: null,
  isLoading: false,
  error: null,
  setDevices: (devices) => set({ devices }),
  selectDevice: (device) => set({ selectedDevice: device }),
  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      ),
    })),
  addDevice: (device) =>
    set((state) => ({ devices: [...state.devices, device] })),
  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== id),
    })),
}));