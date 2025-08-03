import { Operator } from './operator';

export interface Device {
  id: string;
  name: string;
  device_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  operators?: Operator[];
}

export interface CachedDevice {
  id?: string;
  remarks: string;
  device_id?: string;
}

export interface DeviceForm {
  id: string;
  name: string;
  device_id?: string;
  operator_ids?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}
