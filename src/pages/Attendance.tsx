import { useState } from 'react';
import { useAttendanceStore } from '../lib/stores/attendanceStore';
import AttendanceTable from '../components/attendance/AttendanceTable';
import AttendanceFilter from '../components/attendance/AttendanceFilter';
import { FileText, Download } from 'lucide-react';

const Attendance = () => {
  const { records } = useAttendanceStore();
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting attendance records...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="ml-2" />
          سجل الحضور والانصراف
        </h1>
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Download className="w-5 h-5 ml-2" />
          تصدير التقرير
        </button>
      </div>

      <AttendanceFilter onFilter={setFilteredRecords} />
      <AttendanceTable records={filteredRecords} />
    </div>
  );
};

export default Attendance;