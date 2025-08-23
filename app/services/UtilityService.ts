import type { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import { Department } from '../types/department';

const BASE_URL = '/api/utils';

class UtilityService {
  itemTypes(): AxiosPromise {
    return apiClient.get(`${BASE_URL}/item-types`);
  }
  buyers(): AxiosPromise<string[]> {
    return apiClient.get(`${BASE_URL}/buyers`);
  }
  departments(): AxiosPromise<Department[]> {
    return apiClient.get(`${BASE_URL}/departments`);
  }
}
export default new UtilityService();
