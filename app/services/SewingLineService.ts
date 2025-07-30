import { SewingLine } from '../types/sewing-line';

export const SewingLineService = {
  getSewingLines() {
    return fetch('/demo/data/sewing-lines.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as SewingLine[]);
  },
  getSewingLine(id: string) {
    return fetch('/demo/data/sewing-lines.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: SewingLine) => r.id == id));
  }
};
