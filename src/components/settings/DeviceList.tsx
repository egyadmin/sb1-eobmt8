import { useDeviceStore, Device } from '../../lib/deviceStore';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
}

const DeviceList = ({ devices }: DeviceListProps) => {
  const { selectDevice, selectedDevice } = useDeviceStore();

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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة الأجهزة</h2>
      </div>
      <div className="divide-y">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => selectDevice(device)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedDevice?.id === device.id ? 'bg-blue-50' : ''
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">{device.name}</p>
              <p className="text-sm text-gray-500">{device.location}</p>
            </div>
            {getStatusIcon(device.status)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;