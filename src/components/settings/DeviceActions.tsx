import { useState } from 'react';
import { Device } from '../../lib/deviceStore';
import { useDeviceConnection } from '../../hooks/useDeviceConnection';
import { RefreshCw, Power, Clock, Trash } from 'lucide-react';

interface DeviceActionsProps {
  device: Device;
}

const DeviceActions = ({ device }: DeviceActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isConnecting,
    error,
    connect,
    syncTime,
    restart,
    clearAttendance
  } = useDeviceConnection(device);

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
    setIsLoading(true);
    try {
      const response = await action();
      if (response.success) {
        alert(successMessage);
      } else {
        alert(`خطأ: ${response.error}`);
      }
    } catch (err) {
      alert('حدث خطأ أثناء تنفيذ العملية');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="font-medium">إجراءات الجهاز</span>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAction(syncTime, 'تم مزامنة الوقت بنجاح')}
          disabled={isLoading || isConnecting}
          className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Clock className="w-5 h-5 ml-2" />
          مزامنة الوقت
        </button>

        <button
          onClick={() => handleAction(restart, 'تم إعادة تشغيل الجهاز بنجاح')}
          disabled={isLoading || isConnecting}
          className="flex items-center justify-center p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
        >
          <Power className="w-5 h-5 ml-2" />
          إعادة تشغيل
        </button>

        <button
          onClick={() => handleAction(clearAttendance, 'تم مسح سجلات الحضور بنجاح')}
          disabled={isLoading || isConnecting}
          className="flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash className="w-5 h-5 ml-2" />
          مسح السجلات
        </button>

        <button
          onClick={() => handleAction(connect, 'تم الاتصال بالجهاز بنجاح')}
          disabled={isLoading || isConnecting}
          className="flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
        >
          <RefreshCw className="w-5 h-5 ml-2" />
          {isConnecting ? 'جاري الاتصال...' : 'إعادة الاتصال'}
        </button>
      </div>
    </div>
  );
};

export default DeviceActions;