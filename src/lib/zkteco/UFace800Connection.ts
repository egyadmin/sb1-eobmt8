import { DeviceConnection } from "../deviceConnection";
import { Device } from "../deviceStore";
import { deviceApi } from "../api/deviceApi";

export class UFace800Connection extends DeviceConnection {
  private device: Device;
  private connected: boolean = false;

  constructor(device: Device) {
    super(device);
    this.device = device;
  }

  async connect(): Promise<boolean> {
    try {
      const response = await deviceApi.connect(this.device.id);
      this.connected = response.success;
      return response.success;
    } catch (error) {
      console.error('UFace800 connection error:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await deviceApi.disconnect(this.device.id);
      this.connected = false;
    }
  }

  async getAttendanceLogs(startDate: Date, endDate: Date) {
    try {
      const response = await deviceApi.getAttendanceLogs(this.device.id, startDate, endDate);
      return response.data;
    } catch (error) {
      console.error('Failed to get attendance logs:', error);
      throw error;
    }
  }

  async syncTime(): Promise<boolean> {
    try {
      const response = await deviceApi.syncTime(this.device.id);
      return response.success;
    } catch (error) {
      console.error('Failed to sync time:', error);
      return false;
    }
  }

  async clearAttendanceLogs(): Promise<boolean> {
    try {
      const response = await deviceApi.clearAttendance(this.device.id);
      return response.success;
    } catch (error) {
      console.error('Failed to clear attendance logs:', error);
      return false;
    }
  }

  async restart(): Promise<boolean> {
    try {
      const response = await deviceApi.restartDevice(this.device.id);
      return response.success;
    } catch (error) {
      console.error('Failed to restart device:', error);
      return false;
    }
  }

  async ping(): Promise<boolean> {
    try {
      const response = await deviceApi.sendCommand(this.device.id, { command: 'ping' });
      return response.success;
    } catch {
      return false;
    }
  }
}