import { AxiosPromise } from 'axios';
import { Department } from '../types/department';
import { DepartmentCreatePayload, DepartmentPaginatedResponse } from '../types/api/department';
import apiClient from '../api/http-common';

const BASE_URL = '/api/departments';

export const DepartmentService = {
  getDepartment(id: string) {
    return fetch('/demo/data/processes.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Department) => r.id == id));
  },
  getDepartmentes(params?: Record<string, any>): AxiosPromise<DepartmentPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createDepartment(payload: DepartmentCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
};
