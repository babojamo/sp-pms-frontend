import { AxiosPromise } from 'axios';
import { SectionCreatePayload, SectionPaginatedResponse } from '../types/api/sections';
import { Section } from '../types/section';
import apiClient from '../api/http-common';

const BASE_URL = '/api/sections';

export const SectionService = {
  getSection(id: string) {
    return fetch('/demo/data/sewing-lines.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Section) => r.id == id));
  },
  getSections(params?: Record<string, any>): AxiosPromise<SectionPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createSection(payload: SectionCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
};
