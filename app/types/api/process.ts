import { PaginatedResponse } from '.';
import { Process } from '../process';

export interface ProcessCreatePayload {
  name: string;
}

export interface ProcessPaginatedResponse extends PaginatedResponse {
  data?: Process[];
}
