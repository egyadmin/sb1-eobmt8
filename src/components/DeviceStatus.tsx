import { WifiOff, Wifi, AlertCircle } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  location: string;
}

interface DeviceStatusProps {
  devices: Device[];
}

const DeviceStatus = ({ devices }: DeviceStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-right">حالة الأجهزة</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الجهاز</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر مزامنة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الموقع</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(device.status)}
                    <span className="mr-2 text-sm text-gray-700">
                      {device.status === 'online' ? 'متصل' : device.status === 'offline' ? 'غير متصل' : 'تحذير'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.lastSync}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceStatus;