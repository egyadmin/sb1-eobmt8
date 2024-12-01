import { useState } from 'react';
import { AttendanceRecord } from '../../lib/stores/attendanceStore';
import { Calendar, Filter } from 'lucide-react';

interface AttendanceFilterProps {
  onFilter: (records: AttendanceRecord[]) => void;
}

const AttendanceFilter = ({ onFilter }: AttendanceFilterProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('all');

  const handleFilter = () => {
    // TODO: Implement actual filtering logic
    onFilter([]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <Filter className="w-5 h-5 ml-2" />
          تصفية السجلات
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            من تاريخ
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            إلى تاريخ
          </label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الحالة
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">الكل</option>
            <option value="present">حاضر</option>
            <option value="absent">غائب</option>
            <option value="late">متأخر</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <Filter className="w-5 h-5 ml-2" />
            تصفية
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilter;