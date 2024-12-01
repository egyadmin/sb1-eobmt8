import { useEmployeeStore, Employee } from '../../lib/employeeStore';
import { User } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const { selectEmployee, selectedEmployee } = useEmployeeStore();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">قائمة الموظفين</h2>
      </div>
      <div className="divide-y">
        {employees.map((employee) => (
          <button
            key={employee.id}
            onClick={() => selectEmployee(employee)}
            className={`w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div className="mr-3">
                <p className="font-medium text-gray-900">{employee.name}</p>
                <p className="text-sm text-gray-500">#{employee.employeeId}</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                employee.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {employee.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
          </button>
        ))}
        {employees.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            لا يوجد موظفين
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;