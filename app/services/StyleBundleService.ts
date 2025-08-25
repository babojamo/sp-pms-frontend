import { StyleBundlePaginatedResponse, StyleReleaseFabricPayload } from '../types/api/styles';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';

const BASE_URL = '/api/style-bundles';

export const StyleBundleService = {
  getBundles(params?: Record<string, any>): AxiosPromise<StyleBundlePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  releaseFabrics(payload: StyleReleaseFabricPayload, style_id: string) {
    return apiClient.post(`${BASE_URL}/release-fabrics/${style_id}`, payload);
  }
};
