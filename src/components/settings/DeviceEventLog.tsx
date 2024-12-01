import { useState, useEffect } from 'react';
import { Device } from '../../lib/deviceStore';
import { useDeviceConnection } from '../../hooks/useDeviceConnection';

interface DeviceEvent {
  timestamp: string;
  type: string;
  message: string;
  status: 'success' | 'error' | 'warning';
}

interface DeviceEventLogProps {
  device: Device;
}

const DeviceEventLog = ({ device }: DeviceEventLogProps) => {
  const [events, setEvents] = useState<DeviceEvent[]>([]);
  const { error } = useDeviceConnection(device);

  useEffect(() => {
    if (error) {
      setEvents(prev => [{
        timestamp: new Date().toISOString(),
        type: 'error',
        message: error,
        status: 'error'
      }, ...prev]);
    }
  }, [error]);

  const getStatusColor = (status: DeviceEvent['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">سجل الأحداث</h2>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${getStatusColor(event.status)}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{event.type}</p>
                <p className="text-sm mt-1">{event.message}</p>
              </div>
              <span className="text-sm">
                {new Date(event.timestamp).toLocaleTimeString('ar-SA')}
              </span>
            </div>
          </div>
        ))}
        
        {events.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            لا توجد أحداث لعرضها
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceEventLog;