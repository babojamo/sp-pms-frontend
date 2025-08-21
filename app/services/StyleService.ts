import { StyleCreatePayload, StylePaginatedResponse } from '../types/api/styles';
import { Style } from '../types/styles';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';

const BASE_URL = '/api/styles';

export const StyleService = {
  getStyles(params?: Record<string, any>): AxiosPromise<StylePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  getStyle(id: string) {
    return fetch('/demo/data/styles.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Style) => r.id == id));
  },
  createStyle(payload: StyleCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
};
