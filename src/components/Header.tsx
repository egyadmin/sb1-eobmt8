import { useState } from 'react';
import { Search, User, Menu } from 'lucide-react';
import NotificationBell from './notifications/NotificationBell';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 left-0 right-0 z-20 lg:right-64">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-end lg:justify-between">
          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <NotificationBell />
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-700">تامر الجوهري</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;