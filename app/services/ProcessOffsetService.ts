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
    return fetch('/demo/data/process-offsets.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: ProcessOffset) => r.id == id));
  }
};
