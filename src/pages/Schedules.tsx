import { useState } from 'react';
import { useScheduleStore } from '../lib/stores/scheduleStore';
import ScheduleList from '../components/schedules/ScheduleList';
import ScheduleForm from '../components/schedules/ScheduleForm';
import { Calendar, Plus, Search } from 'lucide-react';

const Schedules = () => {
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const { schedules, selectedSchedule } = useScheduleStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="ml-2" />
          الجداول الأسبوعية
        </h1>
        <button
          onClick={() => setShowAddSchedule(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة جدول جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن جدول..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-4">
            <ScheduleList schedules={filteredSchedules} />
          </div>
          <div className="col-span-8">
            {showAddSchedule ? (
              <ScheduleForm onClose={() => setShowAddSchedule(false)} />
            ) : selectedSchedule ? (
              <ScheduleForm schedule={selectedSchedule} onClose={() => setShowAddSchedule(false)} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                الرجاء اختيار جدول من القائمة أو إضافة جدول جديد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;