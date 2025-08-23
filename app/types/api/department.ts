import { PaginatedResponse } from '.';
import { Department } from '../department';

export interface DepartmentCreatePayload {
  name: string;
}

export interface DepartmentPaginatedResponse extends PaginatedResponse {
  data?: Department[];
}
