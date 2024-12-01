import { useState } from 'react';
import { useAttendanceStore } from '../../lib/stores/attendanceStore';
import AttendanceFilter from '../attendance/AttendanceFilter';
import AttendanceTable from '../attendance/AttendanceTable';
import { Download } from 'lucide-react';

const AttendanceReport = () => {
  const { records } = useAttendanceStore();
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting attendance report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقرير الحضور والانصراف</h2>
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

export default AttendanceReport;