import type { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import { Department } from '../types/department';
import { Section } from '../types/section';
import { Process } from '../types/process';

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
  sections(): AxiosPromise<Section[]> {
    return apiClient.get(`${BASE_URL}/sections`);
  }
  processes(): AxiosPromise<Process[]> {
    return apiClient.get(`${BASE_URL}/processes`);
  }
}
export default new UtilityService();
