import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface DeviceCommand {
  command: string;
  params?: Record<string, any>;
}

export interface DeviceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const deviceApi = {
  async connect(deviceId: string): Promise<DeviceResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices/${deviceId}/connect`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  },

  async disconnect(deviceId: string): Promise<DeviceResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices/${deviceId}/disconnect`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Disconnection failed'
      };
    }
  },

  async sendCommand(deviceId: string, command: DeviceCommand): Promise<DeviceResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/devices/${deviceId}/command`,
        command
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Command failed'
      };
    }
  },

  async getAttendanceLogs(
    deviceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DeviceResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/devices/${deviceId}/attendance`,
        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get attendance logs'
      };
    }
  },

  async syncTime(deviceId: string): Promise<DeviceResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices/${deviceId}/sync-time`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Time sync failed'
      };
    }
  },

  async clearAttendance(deviceId: string): Promise<DeviceResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices/${deviceId}/clear-attendance`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear attendance'
      };
    }
  },

  async restartDevice(deviceId: string): Promise<DeviceResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices/${deviceId}/restart`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to restart device'
      };
    }
  }
};