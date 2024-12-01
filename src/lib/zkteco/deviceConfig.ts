export interface ZKTecoConfig {
  deviceTypes: {
    [key: string]: {
      name: string;
      capabilities: string[];
      maxUsers: number;
      maxFingerprints: number;
      maxFaces: number;
      maxAttendanceRecords: number;
    };
  };
  connectionTypes: string[];
  defaultPorts: {
    [key: string]: number;
  };
}

export const zkTecoConfig: ZKTecoConfig = {
  deviceTypes: {
    'uFace800': {
      name: 'ZKTeco uFace800',
      capabilities: ['fingerprint', 'face', 'card', 'password'],
      maxUsers: 3000,
      maxFingerprints: 4000,
      maxFaces: 3000,
      maxAttendanceRecords: 100000,
    },
  },
  connectionTypes: ['tcp', 'udp'],
  defaultPorts: {
    tcp: 4370,
    udp: 5200,
  },
};