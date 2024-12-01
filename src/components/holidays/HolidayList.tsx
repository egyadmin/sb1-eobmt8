import { useHolidayStore, Holiday } from '../../lib/stores/holidayStore';
import { Calendar } from 'lucide-react';

interface HolidayListProps {
  holidays: Holiday[];
}

const HolidayList = ({ holidays }: HolidayListProps) => {
  const { selectHoliday, selectedHoliday } = useHolidayStore();

  const getTypeText = (type: Holiday['type']) => {
    switch (type) {
      case 'public':
        return 'عطلة رسمية';
      case 'company':
        return 'عطلة الشركة';
      case 'department':
        return 'عطلة القسم';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة العطلات</h2>
      </div>
      <div className="divide-y">
        {holidays.map((holiday) => (
          <button
            key={holiday.id}
            onClick={() => selectHoliday(holiday)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedHoliday?.id === holiday.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{holiday.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(holiday.startDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                holiday.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {getTypeText(holiday.type)}
            </span>
          </button>
        ))}
        {holidays.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا توجد عطلات
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayList;