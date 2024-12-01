export class DeviceError extends Error {
  constructor(
    message: string,
    public code: number,
    public details?: any
  ) {
    super(message);
    this.name = 'DeviceError';
  }
}

export const DeviceErrorCodes = {
  CONNECTION_FAILED: 1001,
  TIMEOUT: 1002,
  INVALID_RESPONSE: 1003,
  DEVICE_BUSY: 1004,
  AUTHENTICATION_FAILED: 1005,
  UNSUPPORTED_OPERATION: 1006,
  INVALID_PARAMETER: 1007,
  DEVICE_MEMORY_FULL: 1008,
  DUPLICATE_USER: 1009,
  USER_NOT_FOUND: 1010,
} as const;

export function isDeviceError(error: any): error is DeviceError {
  return error instanceof DeviceError;
}

export function handleDeviceError(error: DeviceError): string {
  switch (error.code) {
    case DeviceErrorCodes.CONNECTION_FAILED:
      return 'فشل الاتصال بالجهاز. يرجى التحقق من إعدادات الاتصال والمحاولة مرة أخرى.';
    case DeviceErrorCodes.TIMEOUT:
      return 'انتهت مهلة الاتصال بالجهاز. يرجى المحاولة مرة أخرى.';
    case DeviceErrorCodes.DEVICE_BUSY:
      return 'الجهاز مشغول حالياً. يرجى المحاولة لاحقاً.';
    case DeviceErrorCodes.AUTHENTICATION_FAILED:
      return 'فشل المصادقة. يرجى التحقق من بيانات الاعتماد.';
    default:
      return `حدث خطأ: ${error.message}`;
  }
}