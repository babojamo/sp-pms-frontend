import { Process } from './process';
import { Section } from './section';

export interface Operator {
  id: string;
  name: string;
  section_id?: string;
  section?: Section;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  operator_processes?: {
    process: Process;
  }[];
}

export interface OperatorForm {
  id?: string;
  name?: string;
  section_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OperatorProcess {
  id?: string | number;
  operator_id?: string;
  operator?: Operator;
  process_id?: string;
  process_name?: string;
  total_output?: number;
  target?: number;
  outputs?: {
    [time: string]: number | string | undefined;
  };
}
