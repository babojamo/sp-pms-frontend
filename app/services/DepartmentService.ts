import { Department } from '../types/department';

export const DepartmentService = {
  getDepartments() {
    return fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Department[]);
  },
  getDepartment(id: string) {
    return fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Department) => r.id == id));
  }
};
