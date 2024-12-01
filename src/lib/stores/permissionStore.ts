import { create } from 'zustand';

export interface Permission {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'early_leave' | 'late_arrival' | 'absence' | 'overtime';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

interface PermissionState {
  permissions: Permission[];
  selectedPermission: Permission | null;
  setPermissions: (permissions: Permission[]) => void;
  addPermission: (permission: Permission) => void;
  updatePermission: (id: string, permission: Partial<Permission>) => void;
  deletePermission: (id: string) => void;
  selectPermission: (permission: Permission | null) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  selectedPermission: null,
  setPermissions: (permissions) => set({ permissions }),
  addPermission: (permission) =>
    set((state) => ({ permissions: [...state.permissions, permission] })),
  updatePermission: (id, updates) =>
    set((state) => ({
      permissions: state.permissions.map((permission) =>
        permission.id === id ? { ...permission, ...updates } : permission
      ),
    })),
  deletePermission: (id) =>
    set((state) => ({
      permissions: state.permissions.filter((permission) => permission.id !== id),
    })),
  selectPermission: (permission) => set({ selectedPermission: permission }),
}));