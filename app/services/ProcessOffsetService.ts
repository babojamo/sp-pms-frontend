import { ProcessOffset } from '../types/process-offset';

export const ProcessOffsetService = {
  getProcessOffsets() {
    return fetch('/demo/data/process-offsets.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as ProcessOffset[]);
  },
  getProcessOffset(id: string) {
    return fetch('/demo/data/process-offsets.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: ProcessOffset) => r.id == id));
  }
};
