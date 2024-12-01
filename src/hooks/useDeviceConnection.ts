import { useState, useCallback } from 'react';
import { Device } from '../lib/deviceStore';
import { deviceManager } from '../lib/deviceManager';
import { DeviceResponse } from '../lib/deviceConnection';

export function useDeviceConnection(device: Device) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const connected = await deviceManager.connectDevice(device);
      if (!connected) {
        setError('Failed to connect to device');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsConnecting(false);
    }
  }, [device]);

  const disconnect = useCallback(async () => {
    try {
      await deviceManager.disconnectDevice(device.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [device.id]);

  const syncTime = useCallback(async (): Promise<DeviceResponse> => {
    try {
      return await deviceManager.syncDeviceTime(device.id);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error };
    }
  }, [device.id]);

  const getAttendance = useCallback(
    async (startDate: Date, endDate: Date): Promise<DeviceResponse> => {
      try {
        return await deviceManager.getAttendanceLogs(device.id, startDate, endDate);
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Unknown error';
        return { success: false, error };
      }
    },
    [device.id]
  );

  const restart = useCallback(async (): Promise<DeviceResponse> => {
    try {
      return await deviceManager.restartDevice(device.id);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error };
    }
  }, [device.id]);

  const clearAttendance = useCallback(async (): Promise<DeviceResponse> => {
    try {
      return await deviceManager.clearAttendance(device.id);
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error };
    }
  }, [device.id]);

  return {
    isConnecting,
    error,
    connect,
    disconnect,
    syncTime,
    getAttendance,
    restart,
    clearAttendance,
  };
}