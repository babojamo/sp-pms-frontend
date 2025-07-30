export interface Department {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentForm {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
