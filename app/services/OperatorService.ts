import { AxiosPromise } from 'axios';
import { Operator } from '@/app/types/operator';
import { OperatorCreatePayload, OperatorPaginatedResponse } from '../types/api/operators';
import apiClient from '../api/http-common';

const BASE_URL = '/api/operators';

export const OperatorService = {
  getOperators(params?: Record<string, any>): AxiosPromise<OperatorPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  createOperator(payload: OperatorCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  getOperator(id: string) {
    return fetch('/demo/data/operators.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Operator) => r.id == id));
  }
};
