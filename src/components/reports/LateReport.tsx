import { useState } from 'react';
import { useAttendanceStore } from '../../lib/stores/attendanceStore';
import AttendanceFilter from '../attendance/AttendanceFilter';
import { Download, Clock } from 'lucide-react';

const LateReport = () => {
  const { records } = useAttendanceStore();
  const [filteredRecords] = useState(records.filter(r => r.status === 'late'));

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting late report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقرير التأخير</h2>
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Download className="w-5 h-5 ml-2" />
          تصدير التقرير
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">إجمالي التأخير</p>
                <h3 className="text-2xl font-bold text-red-700">15</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <AttendanceFilter onFilter={() => {}} />
        
        <div className="mt-6">
          {/* Late records table */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الموظف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وقت الحضور</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مدة التأخير</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    30 دقيقة
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LateReport;