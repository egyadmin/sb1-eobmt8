import { Outlet, NavLink } from 'react-router-dom';
import { Settings as SettingsIcon, HardDrive, Sliders, Users } from 'lucide-react';

const Settings = () => {
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
          <SettingsIcon className="ml-2" />
          الإعدادات
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <nav className="space-y-2">
            <NavLink to="/settings/system" className={getNavClass}>
              <Sliders className="w-5 h-5" />
              <span>إعدادات النظام</span>
            </NavLink>
            <NavLink to="/settings/devices" className={getNavClass}>
              <HardDrive className="w-5 h-5" />
              <span>الأجهزة</span>
            </NavLink>
            <NavLink to="/settings/users" className={getNavClass}>
              <Users className="w-5 h-5" />
              <span>المستخدمين</span>
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

export default Settings;