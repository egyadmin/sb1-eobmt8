import { useState } from 'react';
import { useGroupStore, Group } from '../lib/groupStore';
import GroupList from '../components/groups/GroupList';
import GroupForm from '../components/groups/GroupForm';
import { Users, UserPlus, Search } from 'lucide-react';

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const { groups, selectedGroup } = useGroupStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="ml-2" />
          المجموعات
        </h1>
        <button
          onClick={() => setShowAddGroup(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <UserPlus className="w-5 h-5 ml-2" />
          إضافة مجموعة جديدة
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن مجموعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-4">
            <GroupList groups={filteredGroups} />
          </div>
          <div className="col-span-8">
            {showAddGroup ? (
              <GroupForm onClose={() => setShowAddGroup(false)} />
            ) : selectedGroup ? (
              <GroupForm group={selectedGroup} onClose={() => setShowAddGroup(false)} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                الرجاء اختيار مجموعة من القائمة أو إضافة مجموعة جديدة
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;