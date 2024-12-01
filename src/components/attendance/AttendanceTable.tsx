import { AttendanceRecord } from '../../lib/stores/attendanceStore';
import { Clock, Calendar } from 'lucide-react';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const AttendanceTable = ({ records }: AttendanceTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      case 'late':
        return 'text-yellow-600 bg-yellow-100';
      case 'early_leave':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'حاضر';
      case 'absent':
        return 'غائب';
      case 'late':
        return 'متأخر';
      case 'early_leave':
        return 'خروج مبكر';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الموظف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وقت الحضور
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وقت الانصراف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العمل الإضافي
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                    <span className="text-sm text-gray-900">{record.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.employeeName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 ml-2" />
                    <span className="text-sm text-gray-900">
                      {record.checkIn || '--:--'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 ml-2" />
                    <span className="text-sm text-gray-900">
                      {record.checkOut || '--:--'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {getStatusText(record.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.overtime > 0 ? `${record.overtime} دقيقة` : '-'}
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  لا توجد سجلات للعرض
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;