import TimeDisplay from './TimeDisplay';
import StatusBadge from './StatusBadge';

interface AttendanceRecord {
  id: number;
  date: string;
  employeeName: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late';
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const AttendanceTable = ({ records }: AttendanceTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              التاريخ
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              اسم الموظف
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.employeeName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <TimeDisplay time={record.checkIn} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <TimeDisplay time={record.checkOut} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={record.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;