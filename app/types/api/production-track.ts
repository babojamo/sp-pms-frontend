export interface StoreProductionTrackPayload {
  tracks: {
    id?: number | boolean;
    date: string;
    section_id: number;
    operator_id: number;
    process_id: number;
    target: number | string;
    remarks: string;
  }[];
}



export interface GetProductionTrackPayload {
  track_date: string;
  process_id?: string;
}

