import { Process } from '@/app/types/process';

export const ProcessService = {
    getProcesses() {
        return fetch('/demo/data/processes.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Process[]);
    },
    getProcess(id: string) {
        return fetch('/demo/data/processes.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data.find((r: Process) => r.id == id));
    }
};
