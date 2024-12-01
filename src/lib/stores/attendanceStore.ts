import { create } from 'zustand';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'early_leave';
  overtime: number;
  notes: string;
}

interface AttendanceState {
  records: AttendanceRecord[];
  selectedRecord: AttendanceRecord | null;
  setRecords: (records: AttendanceRecord[]) => void;
  addRecord: (record: AttendanceRecord) => void;
  updateRecord: (id: string, record: Partial<AttendanceRecord>) => void;
  deleteRecord: (id: string) => void;
  selectRecord: (record: AttendanceRecord | null) => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  records: [],
  selectedRecord: null,
  setRecords: (records) => set({ records }),
  addRecord: (record) =>
    set((state) => ({ records: [...state.records, record] })),
  updateRecord: (id, updates) =>
    set((state) => ({
      records: state.records.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      ),
    })),
  deleteRecord: (id) =>
    set((state) => ({
      records: state.records.filter((record) => record.id !== id),
    })),
  selectRecord: (record) => set({ selectedRecord: record }),
}));