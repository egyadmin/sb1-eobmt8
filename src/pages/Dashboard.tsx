import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import AttendanceCard from '../components/AttendanceCard';
import AttendanceTable from '../components/AttendanceTable';
import DateRangePicker from '../components/DateRangePicker';
import DeviceStatus from '../components/DeviceStatus';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceStats = [
    {
      title: 'الحضور اليوم',
      value: '45',
      icon: 'attendance',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'الغياب',
      value: '3',
      icon: 'absent',
      color: 'bg-gradient-to-r from-red-500 to-red-600',
    },
    {
      title: 'التأخير',
      value: '5',
      icon: 'late',
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    },
    {
      title: 'الورديات النشطة',
      value: '2',
      icon: 'schedule',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
  ];

  const mockDevices = [
    {
      id: 1,
      name: 'جهاز البصمة الرئيسي',
      status: 'online',
      lastSync: '2024-03-01 10:30:00',
      location: 'المدخل الرئيسي',
    },
    {
      id: 2,
      name: 'جهاز البصمة الفرعي',
      status: 'offline',
      lastSync: '2024-03-01 09:15:00',
      location: 'المدخل الفرعي',
    },
  ];

  const mockAttendanceRecords = [
    {
      id: 1,
      date: '2024-03-01',
      employeeName: 'أحمد محمد',
      checkIn: '08:30',
      checkOut: '17:00',
      status: 'present',
    },
    {
      id: 2,
      date: '2024-03-01',
      employeeName: 'محمد علي',
      checkIn: '09:15',
      checkOut: '17:00',
      status: 'late',
    },
    {
      id: 3,
      date: '2024-03-01',
      employeeName: 'فاطمة أحمد',
      checkIn: '--:--',
      checkOut: '--:--',
      status: 'absent',
    },
  ];

  const attendanceChartData = {
    labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    datasets: [
      {
        label: 'الحضور',
        data: [42, 45, 43, 44, 45, 41, 40],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'التأخير',
        data: [3, 2, 4, 3, 2, 5, 4],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const lateChartData = {
    labels: ['8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30'],
    datasets: [
      {
        label: 'توزيع وقت الحضور',
        data: [5, 12, 15, 8, 4, 2, 1],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <AttendanceCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon as any}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">إحصائيات الحضور الأسبوعية</h2>
          <Line data={attendanceChartData} options={chartOptions} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">توزيع وقت الحضور</h2>
          <Bar data={lateChartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <AttendanceTable records={mockAttendanceRecords} />
        </div>
        <div className="col-span-4">
          <DeviceStatus devices={mockDevices} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;