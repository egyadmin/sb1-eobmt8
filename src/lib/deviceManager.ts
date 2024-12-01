import { Device } from './deviceStore';
import { DeviceCommand, DeviceResponse } from './deviceConnection';
import { createDeviceConnection } from './zkteco/deviceFactory';

class DeviceManager {
  private connections: Map<string, ReturnType<typeof createDeviceConnection>> = new Map();

  async connectDevice(device: Device): Promise<boolean> {
    try {
      const connection = createDeviceConnection(device);
      const connected = await connection.connect();

      if (connected) {
        this.connections.set(device.id, connection);
      }

      return connected;
    } catch (error) {
      console.error(`Failed to connect device ${device.id}:`, error);
      return false;
    }
  }

  async disconnectDevice(deviceId: string): Promise<void> {
    const connection = this.connections.get(deviceId);
    if (connection) {
      await connection.disconnect();
      this.connections.delete(deviceId);
    }
  }

  async sendCommand(deviceId: string, command: DeviceCommand): Promise<DeviceResponse> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      return {
        success: false,
        error: 'Device not connected'
      };
    }

    try {
      return await connection.sendCommand(command);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async syncDeviceTime(deviceId: string): Promise<DeviceResponse> {
    return this.sendCommand(deviceId, {
      command: 'sync_time',
      params: { timestamp: Date.now() }
    });
  }

  async getAttendanceLogs(
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DeviceResponse> {
    return this.sendCommand(deviceId, {
      command: 'get_attendance',
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
  }

  async restartDevice(deviceId: string): Promise<DeviceResponse> {
    return this.sendCommand(deviceId, { command: 'restart_device' });
  }

  async clearAttendance(deviceId: string): Promise<DeviceResponse> {
    return this.sendCommand(deviceId, { command: 'clear_attendance' });
  }
}

export const deviceManager = new DeviceManager();