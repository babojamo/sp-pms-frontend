import { Device } from '../types/device';

export const DeviceService = {
  getDevices() {
    return fetch('/demo/data/devices.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data as Device[]);
  },
  getDevice(id: string) {
    return fetch('/demo/data/devices.json', { headers: { 'Cache-Control': 'no-cache' } })
      .then((res) => res.json())
      .then((d) => d.data.find((r: Device) => r.id == id));
  }
};
