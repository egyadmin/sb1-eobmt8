import { useState } from 'react';
import { usePermissionStore } from '../lib/stores/permissionStore';
import PermissionList from '../components/permissions/PermissionList';
import PermissionForm from '../components/permissions/PermissionForm';
import { FileText, Plus, Search } from 'lucide-react';

const Permissions = () => {
  const [showAddPermission, setShowAddPermission] = useState(false);
  const { permissions, selectedPermission } = usePermissionStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPermissions = permissions.filter((permission) =>
    permission.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="ml-2" />
          الاستئذانات
        </h1>
        <button
          onClick={() => setShowAddPermission(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة استئذان جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن استئذان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-4">
            <PermissionList permissions={filteredPermissions} />
          </div>
          <div className="col-span-8">
            {showAddPermission ? (
              <PermissionForm onClose={() => setShowAddPermission(false)} />
            ) : selectedPermission ? (
              <PermissionForm permission={selectedPermission} onClose={() => setShowAddPermission(false)} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                الرجاء اختيار استئذان من القائمة أو إضافة استئذان جديد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;