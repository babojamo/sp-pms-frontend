export interface Operator {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OperatorForm {
  id: string;
  name: string;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface OperatorProcess {
  id?: string;
  operator_id?: string;
  operator?: Operator;
  process_id?: string;
  process_name?: string;
  target?: number;
  [time: string]: number | string | undefined | Operator;
}
