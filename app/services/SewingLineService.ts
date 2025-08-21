import { AxiosPromise } from 'axios';
import { SewingLineCreatePayload, SewingLinePaginatedResponse } from '../types/api/sewing-lines';
import { SewingLine } from '../types/sewing-line';
import apiClient from '../api/http-common';

const BASE_URL = '/api/sewing-lines';

export const SewingLineService = {
  getSewingLine(id: string) {
    return fetch('/demo/data/sewing-lines.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: SewingLine) => r.id == id));
  },
  getSewingLines(params?: Record<string, any>): AxiosPromise<SewingLinePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createSewingLine(payload: SewingLineCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
};
