import { Style } from '../types/styles';

export const StyleService = {
  getStyles() {
    return fetch('/demo/data/styles.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Style[]);
  },
  getStyle(id: string) {
    return fetch('/demo/data/styles.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Style) => r.id == id));
  }
};
