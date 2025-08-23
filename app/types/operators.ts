import { Section } from './section';

export interface Operator {
  id: string;
  name: string;
  section_id?: string;
  section?: Section;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface OperatorForm {
  id: string;
  section_id?: string;
  process_ids?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}
