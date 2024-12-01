import { create } from 'zustand';

export interface Holiday {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'public' | 'company' | 'department';
  departments: string[];
  repeatsYearly: boolean;
  status: 'active' | 'inactive';
}

interface HolidayState {
  holidays: Holiday[];
  selectedHoliday: Holiday | null;
  setHolidays: (holidays: Holiday[]) => void;
  addHoliday: (holiday: Holiday) => void;
  updateHoliday: (id: string, holiday: Partial<Holiday>) => void;
  deleteHoliday: (id: string) => void;
  selectHoliday: (holiday: Holiday | null) => void;
}

export const useHolidayStore = create<HolidayState>((set) => ({
  holidays: [],
  selectedHoliday: null,
  setHolidays: (holidays) => set({ holidays }),
  addHoliday: (holiday) =>
    set((state) => ({ holidays: [...state.holidays, holiday] })),
  updateHoliday: (id, updates) =>
    set((state) => ({
      holidays: state.holidays.map((holiday) =>
        holiday.id === id ? { ...holiday, ...updates } : holiday
      ),
    })),
  deleteHoliday: (id) =>
    set((state) => ({
      holidays: state.holidays.filter((holiday) => holiday.id !== id),
    })),
  selectHoliday: (holiday) => set({ selectedHoliday: holiday }),
}));