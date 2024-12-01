export enum DeviceEventType {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ATTENDANCE = 'attendance',
  USER_VERIFIED = 'user_verified',
  ALARM = 'alarm',
  ERROR = 'error',
}

export interface DeviceEvent {
  type: DeviceEventType;
  timestamp: number;
  deviceId: string;
  data?: any;
}

export interface AttendanceEvent extends DeviceEvent {
  type: DeviceEventType.ATTENDANCE;
  data: {
    userId: string;
    verifyMode: number;
    inOut: 'in' | 'out';
    recordId: number;
  };
}

export interface UserVerifiedEvent extends DeviceEvent {
  type: DeviceEventType.USER_VERIFIED;
  data: {
    userId: string;
    verifyMode: number;
    success: boolean;
  };
}

export interface AlarmEvent extends DeviceEvent {
  type: DeviceEventType.ALARM;
  data: {
    code: number;
    message: string;
  };
}

export type DeviceEventListener = (event: DeviceEvent) => void;

export class DeviceEventEmitter {
  private listeners: Map<DeviceEventType, DeviceEventListener[]> = new Map();

  on(type: DeviceEventType, listener: DeviceEventListener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)?.push(listener);
  }

  off(type: DeviceEventType, listener: DeviceEventListener) {
    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      const index = typeListeners.indexOf(listener);
      if (index !== -1) {
        typeListeners.splice(index, 1);
      }
    }
  }

  emit(event: DeviceEvent) {
    const typeListeners = this.listeners.get(event.type);
    if (typeListeners) {
      typeListeners.forEach((listener) => listener(event));
    }
  }
}