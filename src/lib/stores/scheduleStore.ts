import { create } from 'zustand';

export interface Schedule {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  shifts: {
    shiftId: string;
    employees: string[];
  }[];
  status: 'active' | 'inactive';
}

interface ScheduleState {
  schedules: Schedule[];
  selectedSchedule: Schedule | null;
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  selectSchedule: (schedule: Schedule | null) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  schedules: [],
  selectedSchedule: null,
  setSchedules: (schedules) => set({ schedules }),
  addSchedule: (schedule) =>
    set((state) => ({ schedules: [...state.schedules, schedule] })),
  updateSchedule: (id, updates) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updates } : schedule
      ),
    })),
  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
    })),
  selectSchedule: (schedule) => set({ selectedSchedule: schedule }),
}));