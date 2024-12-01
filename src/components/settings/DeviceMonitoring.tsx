import { useState, useEffect } from 'react';
import { Device } from '../../lib/deviceStore';
import { useDeviceConnection } from '../../hooks/useDeviceConnection';
import { Activity, Users, Clock } from 'lucide-react';

interface DeviceMonitoringProps {
  device: Device;
}

interface MonitoringStats {
  totalUsers: number;
  todayAttendance: number;
  lastSync: string;
  status: 'online' | 'offline' | 'warning';
}

const DeviceMonitoring = ({ device }: DeviceMonitoringProps) => {
  const [stats, setStats] = useState<MonitoringStats>({
    totalUsers: 0,
    todayAttendance: 0,
    lastSync: device.lastSync,
    status: device.status
  });

  const { getAttendance } = useDeviceConnection(device);

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const response = await getAttendance(today, new Date());
      if (response.success && response.data) {
        setStats(prev => ({
          ...prev,
          todayAttendance: response.data.length,
          lastSync: new Date().toISOString()
        }));
      }
    };

    const interval = setInterval(fetchStats, 300000); // Update every 5 minutes
    fetchStats();

    return () => clearInterval(interval);
  }, [getAttendance]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">مراقبة الجهاز</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">إجمالي المستخدمين</p>
              <h3 className="text-2xl font-bold text-blue-700">{stats.totalUsers}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">حضور اليوم</p>
              <h3 className="text-2xl font-bold text-green-700">{stats.todayAttendance}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">آخر مزامنة</p>
              <h3 className="text-sm font-bold text-purple-700">
                {new Date(stats.lastSync).toLocaleTimeString('ar-SA')}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">سجل النشاط</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">حالة الاتصال</p>
                <p className="text-sm text-gray-500">
                  {stats.status === 'online' ? 'متصل' : stats.status === 'offline' ? 'غير متصل' : 'تحذير'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                stats.status === 'online' ? 'bg-green-500' :
                stats.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceMonitoring;