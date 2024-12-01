import { useState } from 'react';
import { useEmployeeStore, Employee } from '../lib/employeeStore';
import EmployeeList from '../components/employees/EmployeeList';
import EmployeeForm from '../components/employees/EmployeeForm';
import { Users, UserPlus, Search } from 'lucide-react';

const Employees = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const { employees, selectedEmployee } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="ml-2" />
          الموظفين
        </h1>
        <button
          onClick={() => setShowAddEmployee(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <UserPlus className="w-5 h-5 ml-2" />
          إضافة موظف جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن موظف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-4">
            <EmployeeList employees={filteredEmployees} />
          </div>
          <div className="col-span-8">
            {showAddEmployee ? (
              <EmployeeForm onClose={() => setShowAddEmployee(false)} />
            ) : selectedEmployee ? (
              <EmployeeForm employee={selectedEmployee} onClose={() => setShowAddEmployee(false)} />
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                الرجاء اختيار موظف من القائمة أو إضافة موظف جديد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;