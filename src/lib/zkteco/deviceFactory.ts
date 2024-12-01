import { Device } from '../deviceStore';
import { DeviceConnection } from '../deviceConnection';
import { UFace800Connection } from './UFace800Connection';

export function createDeviceConnection(device: Device): DeviceConnection {
  switch (device.model) {
    case 'uFace800':
      return new UFace800Connection(device);
    default:
      throw new Error(`Unsupported device model: ${device.model}`);
  }
}