import type { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';

const BASE_URL = '/api/utils';

class UtilityService {
  itemTypes(): AxiosPromise {
    return apiClient.get(`${BASE_URL}/item-types`);
  }
  buyers(): AxiosPromise {
    return apiClient.get(`${BASE_URL}/buyers`);
  }
}
export default new UtilityService();
