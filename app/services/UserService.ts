import { User } from '@/app/types/users';

export const UserService = {
    getUsers() {
        return fetch('/demo/data/users.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as User[]);
    },
    getUser(id: string) {
        return fetch('/demo/data/users.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data.find((r: User) => r.id == id));
    }
};
