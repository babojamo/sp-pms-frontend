import { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import { ProcessOffsetCreatePayload, ProcessOffsetPaginatedResponse } from '../types/api/process-offsets';
import { ProcessOffset } from '../types/process-offset';

const BASE_URL = '/api/process-offset';

export const ProcessOffsetService = {
  getProcessOffsets(params?: Record<string, any>): AxiosPromise<ProcessOffsetPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createProcessOffset(payload: ProcessOffsetCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  getProcessOffset(id: string) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  updateProcessOffset(id: string, payload: ProcessOffsetCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteProcessOffset(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
