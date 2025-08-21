import { PaginatedResponse } from '.';
import { SewingLine } from '../sewing-line';

export interface SewingLineCreatePayload {
  name: string;
}

export interface SewingLinePaginatedResponse extends PaginatedResponse {
  data?: SewingLine[];
}
