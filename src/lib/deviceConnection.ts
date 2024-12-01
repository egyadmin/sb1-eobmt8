import { Device } from './deviceStore';

export abstract class DeviceConnection {
  constructor(protected device: Device) {}

  abstract connect(): Promise<boolean>;
  abstract disconnect(): Promise<void>;
  abstract getAttendanceLogs(startDate: Date, endDate: Date): Promise<any>;
  abstract syncTime(): Promise<boolean>;
  abstract clearAttendanceLogs(): Promise<boolean>;
  abstract restart(): Promise<boolean>;
  abstract ping(): Promise<boolean>;
}