export interface Style {
  id: string;
  control_number: string;
  buyer_name: string;
  style_number: string;
  pleats_name: string;
  item_type: string;
  ship_date_from_japan: string; // or Date, if you handle date types
  ship_date_from_cebu: string; // or Date
  noumae: string;
  sample: string;
  pattern: string;
}

export interface StyleItem {
  id?: string | number;
  style_id?: string | number; // depends if it's UUID/int, you can refine
  item_name?: string;
  item_number?: string;
  specs_qty?: number;
  specs_unit?: string;
  youjyaku_qty?: number;
  youjyaku_unit?: string;
  color_detail?: string;
  style?: Style;
}
