import { useScheduleStore, Schedule } from '../../lib/stores/scheduleStore';
import { Calendar } from 'lucide-react';

interface ScheduleListProps {
  schedules: Schedule[];
}

const ScheduleList = ({ schedules }: ScheduleListProps) => {
  const { selectSchedule, selectedSchedule } = useScheduleStore();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة الجداول</h2>
      </div>
      <div className="divide-y">
        {schedules.map((schedule) => (
          <button
            key={schedule.id}
            onClick={() => selectSchedule(schedule)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedSchedule?.id === schedule.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{schedule.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(schedule.startDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                schedule.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {schedule.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
          </button>
        ))}
        {schedules.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا توجد جداول
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;