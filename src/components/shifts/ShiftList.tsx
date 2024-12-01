import { useShiftStore, Shift } from '../../lib/stores/shiftStore';
import { Clock } from 'lucide-react';

interface ShiftListProps {
  shifts: Shift[];
}

const ShiftList = ({ shifts }: ShiftListProps) => {
  const { selectShift, selectedShift } = useShiftStore();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة الورديات</h2>
      </div>
      <div className="divide-y">
        {shifts.map((shift) => (
          <button
            key={shift.id}
            onClick={() => selectShift(shift)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedShift?.id === shift.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{shift.name}</p>
                <p className="text-sm text-gray-500">
                  {shift.startTime} - {shift.endTime}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                shift.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {shift.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
          </button>
        ))}
        {shifts.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا توجد ورديات
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftList;