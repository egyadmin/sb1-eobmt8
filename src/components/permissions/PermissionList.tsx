import { usePermissionStore, Permission } from '../../lib/stores/permissionStore';
import { FileText } from 'lucide-react';

interface PermissionListProps {
  permissions: Permission[];
}

const PermissionList = ({ permissions }: PermissionListProps) => {
  const { selectPermission, selectedPermission } = usePermissionStore();

  const getStatusColor = (status: Permission['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: Permission['status']) => {
    switch (status) {
      case 'approved':
        return 'تمت الموافقة';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'قيد الانتظار';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة الاستئذانات</h2>
      </div>
      <div className="divide-y">
        {permissions.map((permission) => (
          <button
            key={permission.id}
            onClick={() => selectPermission(permission)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedPermission?.id === permission.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{permission.employeeName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(permission.startDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                permission.status
              )}`}
            >
              {getStatusText(permission.status)}
            </span>
          </button>
        ))}
        {permissions.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا توجد استئذانات
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionList;