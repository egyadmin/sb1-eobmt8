import { useGroupStore, Group } from '../../lib/groupStore';
import { Users } from 'lucide-react';

interface GroupListProps {
  groups: Group[];
}

const GroupList = ({ groups }: GroupListProps) => {
  const { selectGroup, selectedGroup } = useGroupStore();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة المجموعات</h2>
      </div>
      <div className="divide-y">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => selectGroup(group)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedGroup?.id === group.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{group.name}</p>
                <p className="text-sm text-gray-500">{group.members} موظف</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                group.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {group.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
          </button>
        ))}
        {groups.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا توجد مجموعات
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupList;