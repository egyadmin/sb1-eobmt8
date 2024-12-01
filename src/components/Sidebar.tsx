import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Clock, 
  Settings, 
  FileText,
  ChevronDown,
  Fingerprint,
  BarChart2,
  UserCheck,
  Building,
  CalendarDays,
  CalendarClock,
  CalendarOff,
  FileEdit
} from 'lucide-react';

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'لوحة التحكم',
    path: '/',
    icon: <BarChart2 className="w-5 h-5" />
  },
  {
    title: 'الموظفين',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        title: 'قائمة الموظفين',
        path: '/employees',
        icon: <UserCheck className="w-5 h-5" />
      },
      {
        title: 'المجموعات',
        path: '/groups',
        icon: <Building className="w-5 h-5" />
      }
    ]
  },
  {
    title: 'الحضور والانصراف',
    icon: <Clock className="w-5 h-5" />,
    children: [
      {
        title: 'سجل الحضور',
        path: '/attendance',
        icon: <FileText className="w-5 h-5" />
      },
      {
        title: 'الورديات',
        path: '/shifts',
        icon: <CalendarClock className="w-5 h-5" />
      },
      {
        title: 'الجداول الأسبوعية',
        path: '/schedules',
        icon: <CalendarDays className="w-5 h-5" />
      },
      {
        title: 'العطلات',
        path: '/holidays',
        icon: <CalendarOff className="w-5 h-5" />
      },
      {
        title: 'الاستئذانات',
        path: '/permissions',
        icon: <FileEdit className="w-5 h-5" />
      }
    ]
  },
  {
    title: 'التقارير',
    path: '/reports',
    icon: <FileText className="w-5 h-5" />
  },
  {
    title: 'الإعدادات',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        title: 'إعدادات النظام',
        path: '/settings/system',
        icon: <Settings className="w-5 h-5" />
      },
      {
        title: 'الأجهزة',
        path: '/settings/devices',
        icon: <Fingerprint className="w-5 h-5" />
      },
      {
        title: 'المستخدمين',
        path: '/settings/users',
        icon: <Users className="w-5 h-5" />
      }
    ]
  }
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [location.pathname, onClose]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.includes(item.title);
    const active = isActive(item.path);

    if (item.children) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleExpand(item.title)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
          </button>
          {isExpanded && (
            <div className="mr-4 mt-2 space-y-1">
              {item.children.map(child => renderMenuItem(child))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        to={item.path || '#'}
        className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg transition-colors ${
          active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <div className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } lg:translate-x-0`}>
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img 
            src="https://www2.0zz0.com/2024/11/20/07/988856043.png" 
            alt="Company Logo" 
            className="h-12 w-auto"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">نظام الحضور</h1>
            <p className="text-sm text-gray-500">Attendance Dashboard</p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  );
};

export default Sidebar;