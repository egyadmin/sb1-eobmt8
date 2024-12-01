import { create } from 'zustand';

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  workDays: number[];
  flexibleTime: boolean;
  graceTime: number;
  overtimeEnabled: boolean;
  status: 'active' | 'inactive';
}

interface ShiftState {
  shifts: Shift[];
  selectedShift: Shift | null;
  setShifts: (shifts: Shift[]) => void;
  addShift: (shift: Shift) => void;
  updateShift: (id: string, shift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
  selectShift: (shift: Shift | null) => void;
}

export const useShiftStore = create<ShiftState>((set) => ({
  shifts: [],
  selectedShift: null,
  setShifts: (shifts) => set({ shifts }),
  addShift: (shift) =>
    set((state) => ({ shifts: [...state.shifts, shift] })),
  updateShift: (id, updates) =>
    set((state) => ({
      shifts: state.shifts.map((shift) =>
        shift.id === id ? { ...shift, ...updates } : shift
      ),
    })),
  deleteShift: (id) =>
    set((state) => ({
      shifts: state.shifts.filter((shift) => shift.id !== id),
    })),
  selectShift: (shift) => set({ selectedShift: shift }),
}));