export interface Shift {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ShiftForm {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
