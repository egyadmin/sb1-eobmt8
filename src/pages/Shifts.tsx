import { useState } from 'react';
import { useShiftStore } from '../lib/stores/shiftStore';
import ShiftList from '../components/shifts/ShiftList';
import ShiftForm from '../components/shifts/ShiftForm';
import { Clock, Plus, Search } from 'lucide-react';

const Shifts = () => {
  const [showAddShift, setShowAddShift] = useState(false);
  const { shifts, selectedShift } = useShiftStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Clock className="ml-2" />
          الورديات
        </h1>
        <button
          onClick={() => setShowAddShift(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة وردية جديدة
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن وردية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-4">
            <ShiftList shifts={filteredShifts} />
          </div>
          <div className="col-span-8">
            {showAddShift ? (
              <ShiftForm onClose={() => setShowAddShift(false)} />
            ) : selectedShift ? (
              <ShiftForm shift={selectedShift} onClose={() => setShowAddShift(false)} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                الرجاء اختيار وردية من القائمة أو إضافة وردية جديدة
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shifts;