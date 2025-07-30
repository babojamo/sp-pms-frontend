import { Operator } from '@/app/types/operator';

export const OperatorService = {
  getOperators() {
    return fetch('/demo/data/operators.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Operator[]);
  },
  getOperator(id: string) {
    return fetch('/demo/data/operators.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Operator) => r.id == id));
  },
};
