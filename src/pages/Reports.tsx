import { Outlet, NavLink } from 'react-router-dom';
import { FileText, Clock, BarChart2 } from 'lucide-react';

const Reports = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 rtl:space-x-reverse p-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="ml-2" />
          التقارير
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <nav className="space-y-2">
            <NavLink to="/reports/attendance" className={getNavClass}>
              <FileText className="w-5 h-5" />
              <span>تقارير الحضور</span>
            </NavLink>
            <NavLink to="/reports/late" className={getNavClass}>
              <Clock className="w-5 h-5" />
              <span>تقارير التأخير</span>
            </NavLink>
            <NavLink to="/reports/statistics" className={getNavClass}>
              <BarChart2 className="w-5 h-5" />
              <span>الإحصائيات</span>
            </NavLink>
          </nav>
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Reports;