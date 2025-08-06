import { Shift } from '../types/shifts';

export const ShiftService = {
  getShifts() {
    return fetch('/demo/data/shifts.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Shift[]);
  },
  getShift(id: string) {
    return fetch('/demo/data/shifts.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Shift) => r.id == id));
  }
};
