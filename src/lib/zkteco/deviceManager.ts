import { DeviceConnection } from './deviceConnection';
import { DeviceEventEmitter, DeviceEventType } from './deviceEvents';
import { DeviceError, DeviceErrorCodes } from './deviceErrors';
import { Device } from '../deviceStore';

export class DeviceManager {
  private connections: Map<string, DeviceConnection> = new Map();
  private eventEmitter: DeviceEventEmitter = new DeviceEventEmitter();

  async connectDevice(device: Device): Promise<boolean> {
    try {
      const connection = new DeviceConnection(device);
      const connected = await connection.connect();

      if (connected) {
        this.connections.set(device.id, connection);
        this.eventEmitter.emit({
          type: DeviceEventType.CONNECTED,
          timestamp: Date.now(),
          deviceId: device.id,
        });
        return true;
      }

      throw new DeviceError(
        'Failed to connect to device',
        DeviceErrorCodes.CONNECTION_FAILED
      );
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
      this.eventEmitter.emit({
        type: DeviceEventType.DISCONNECTED,
        timestamp: Date.now(),
        deviceId,
      });
    }
  }

  onEvent(type: DeviceEventType, listener: (event: any) => void) {
    this.eventEmitter.on(type, listener);
  }

  offEvent(type: DeviceEventType, listener: (event: any) => void) {
    this.eventEmitter.off(type, listener);
  }

  async getDeviceStatus(deviceId: string): Promise<'online' | 'offline'> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      return 'offline';
    }
    try {
      await connection.ping();
      return 'online';
    } catch {
      return 'offline';
    }
  }

  async syncDeviceTime(deviceId: string): Promise<boolean> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      throw new DeviceError(
        'Device not connected',
        DeviceErrorCodes.CONNECTION_FAILED
      );
    }
    return connection.syncTime();
  }

  async getAttendanceLogs(
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<any[]> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      throw new DeviceError(
        'Device not connected',
        DeviceErrorCodes.CONNECTION_FAILED
      );
    }
    return connection.getAttendanceLogs(startDate, endDate);
  }

  async clearAttendanceLogs(deviceId: string): Promise<boolean> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      throw new DeviceError(
        'Device not connected',
        DeviceErrorCodes.CONNECTION_FAILED
      );
    }
    return connection.clearAttendanceLogs();
  }

  async restartDevice(deviceId: string): Promise<boolean> {
    const connection = this.connections.get(deviceId);
    if (!connection) {
      throw new DeviceError(
        'Device not connected',
        DeviceErrorCodes.CONNECTION_FAILED
      );
    }
    return connection.restart();
  }
}