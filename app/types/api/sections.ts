import { PaginatedResponse } from '.';
import { Section } from '../section';

export interface SectionCreatePayload {
  name: string;
  department_id?: string;
}

export interface SectionPaginatedResponse extends PaginatedResponse {
  data?: Section[];
}
