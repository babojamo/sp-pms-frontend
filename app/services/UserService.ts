import { User } from '@/app/types/users';

import apiClient from '../api/http-common';
import type { AxiosPromise } from 'axios';
import { UserCreatePayload } from '../types/api/users';

const BASE_URL = '/api/users';

class UserService {
  getUsers(payload?: Record<string, any>): AxiosPromise {
    return apiClient.get(`${BASE_URL}`, { params: { ...payload } });
  }

  getUser(id: string) {
    return fetch('/demo/data/users.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: User) => r.id == id));
  }

  createUser(payload: UserCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }
}

export default new UserService();
