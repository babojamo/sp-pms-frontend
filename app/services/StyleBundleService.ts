import { SaveStyleFabricPayload, StyleBundlePaginatedResponse, StyleReleaseFabricPayload } from '../types/api/styles';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { StyleBundle } from '../types/styles';

const BASE_URL = '/api/style-bundles';

export const StyleBundleService = {
  getBundles(params?: Record<string, any>): AxiosPromise<StyleBundlePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  releaseFabrics(payload: StyleReleaseFabricPayload, style_id: string): AxiosPromise<StyleBundle[]> {
    return apiClient.post(`${BASE_URL}/release-fabrics/${style_id}`, payload);
  },
  updateFabricBundle(id: string, payload: SaveStyleFabricPayload): AxiosPromise<StyleBundle> {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  getFabricBundle(id: string): AxiosPromise<StyleBundle> {
    return apiClient.get(`${BASE_URL}/${id}`);
  }
};
