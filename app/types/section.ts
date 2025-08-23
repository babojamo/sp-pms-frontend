export interface Section {
  id?: string;
  name: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SectionForm {
  id: string;
  name: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
