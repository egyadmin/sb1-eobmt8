import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';

const StatisticsReport = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">الإحصائيات</h2>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">معدل الحضور</p>
              <h3 className="text-2xl font-bold text-blue-700">95%</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">إجمالي الموظفين</p>
              <h3 className="text-2xl font-bold text-green-700">48</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">متوسط ساعات العمل</p>
              <h3 className="text-2xl font-bold text-yellow-700">7.5</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">معدل التأخير</p>
              <h3 className="text-2xl font-bold text-purple-700">5%</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">توزيع الحضور الأسبوعي</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            الرسم البياني هنا
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">معدلات التأخير الشهرية</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            الرسم البياني هنا
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsReport;