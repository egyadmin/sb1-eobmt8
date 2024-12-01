import { useState } from 'react';
import { Device, useDeviceStore } from '../../lib/deviceStore';
import { Wifi, WifiOff, AlertCircle, Trash2, Edit2 } from 'lucide-react';
import DeviceForm from './DeviceForm';
import DeviceActions from './DeviceActions';
import DeviceMonitoring from './DeviceMonitoring';
import DeviceEventLog from './DeviceEventLog';

interface DeviceDetailsProps {
  device: Device;
}

const DeviceDetails = ({ device }: DeviceDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeDevice } = useDeviceStore();
  
  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا الجهاز؟')) {
      removeDevice(device.id);
    }
  };

  if (isEditing) {
    return <DeviceForm device={device} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{device.name}</h2>
            <p className="text-gray-500">{device.location}</p>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="تعديل"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-600"
              title="حذف"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-4">معلومات الاتصال</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">عنوان IP:</span>
                <span>{device.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">المنفذ:</span>
                <span>{device.port}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">نوع الاتصال:</span>
                <span>{device.connectionType}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">معلومات الجهاز</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">الرقم التسلسلي:</span>
                <span>{device.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">الفيرموير:</span>
                <span>{device.firmware}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">آخر مزامنة:</span>
                <span>{new Date(device.lastSync).toLocaleString('ar-SA')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {getStatusIcon(device.status)}
              <span className="font-medium">
                {device.status === 'online' ? 'متصل' : device.status === 'offline' ? 'غير متصل' : 'تحذير'}
              </span>
            </div>
          </div>
        </div>

        <DeviceActions device={device} />
      </div>

      <DeviceMonitoring device={device} />
      <DeviceEventLog device={device} />
    </div>
  );
};

export default DeviceDetails;