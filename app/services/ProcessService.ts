import { Process } from '@/app/types/process';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { ProcessCreatePayload, ProcessPaginatedResponse } from '../types/api/process';

const BASE_URL = '/api/processes';

export const ProcessService = {
  getProcess(id: string) {
    return fetch('/demo/data/processes.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Process) => r.id == id));
  },
  getProcesses(params?: Record<string, any>): AxiosPromise<ProcessPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createProcess(payload: ProcessCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
};
