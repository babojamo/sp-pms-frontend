import { PaginatedResponse } from '.';
import { Style } from '../styles';

export interface StyleCreatePayload {
  control_number: string;
  buyer_name: string;
  style_number: string;
  pleats_name?: string | null;
  item_type?: string | null;
  ship_date_from_japan?: string | null; // ISO date string: "YYYY-MM-DD"
  ship_date_from_cebu?: string | null; // ISO date string
  noumae?: string | null;
  sample?: string | null;
  pattern?: string | null;
  item_styles?: ItemStyleCreatePayload[];
}

export interface ItemStyleCreatePayload {
  item_name?: string;
  item_number?: string;
  specs_qty?: number;
  specs_unit?: string;
  youjyaku_qty?: number;
  youjyaku_unit?: string;
  color_detail?: string;
}

export interface StylePaginatedResponse extends PaginatedResponse {
  data?: Style[];
}
