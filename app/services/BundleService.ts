import { Bundle } from '../types/bundles';

export const BundleService = {
  getBundles() {
    return fetch('/demo/data/styles.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Bundle[]);
  },
  getBundle(id: string) {
    return fetch('/demo/data/styles.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Bundle) => r.id == id));
  }
};
