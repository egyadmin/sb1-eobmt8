import { create } from 'zustand';

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  group: string;
  fingerprint: boolean;
  face: boolean;
  card: boolean;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  selectEmployee: (employee: Employee | null) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  selectedEmployee: null,
  setEmployees: (employees) => set({ employees }),
  addEmployee: (employee) =>
    set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (id, updates) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      ),
    })),
  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
  selectEmployee: (employee) => set({ selectedEmployee: employee }),
}));