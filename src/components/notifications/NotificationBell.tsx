import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../lib/stores/notificationStore';
import NotificationList from './NotificationList';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && <NotificationList />}
    </div>
  );
};

export default NotificationBell;