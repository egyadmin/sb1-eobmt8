import { create } from 'zustand';

export interface Group {
  id: string;
  name: string;
  description: string;
  schedule: string;
  members: number;
  createdAt: string;
  status: 'active' | 'inactive';
}

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  updateGroup: (id: string, group: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  selectGroup: (group: Group | null) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  selectedGroup: null,
  setGroups: (groups) => set({ groups }),
  addGroup: (group) =>
    set((state) => ({ groups: [...state.groups, group] })),
  updateGroup: (id, updates) =>
    set((state) => ({
      groups: state.groups.map((grp) =>
        grp.id === id ? { ...grp, ...updates } : grp
      ),
    })),
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((grp) => grp.id !== id),
    })),
  selectGroup: (group) => set({ selectedGroup: group }),
}));