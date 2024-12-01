import { useNotificationStore } from '../../lib/stores/notificationStore';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';

const NotificationList = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <Bell className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">الإشعارات</h3>
          <span className="text-sm text-gray-500">{unreadCount} جديد</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            <CheckCheck className="w-4 h-4 ml-1" />
            تحديد الكل كمقروء
          </button>
          <button
            onClick={clearAll}
            className="text-sm text-red-600 hover:text-red-700 flex items-center"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            مسح الكل
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="mr-3 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </div>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleString('ar-SA')}
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">لا توجد إشعارات</div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;