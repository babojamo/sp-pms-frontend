import { AxiosPromise } from 'axios';
import { GetProductionTrackPayload, StoreProductionTrackPayload } from '../types/api/production-track';
import { ProductionTrack } from '../types/production-track';
import apiClient from '../api/http-common';

const BASE_URL = '/api/production-tracks';

export const ProductionTrackService = {
  getTracks(section_id: string, params: GetProductionTrackPayload): AxiosPromise<ProductionTrack[]> {
    return apiClient.get(`${BASE_URL}/${section_id}`, { params });
  },
  storeTracks(payload: StoreProductionTrackPayload) {
    return apiClient.post(`${BASE_URL}/`, payload);
  }
};
