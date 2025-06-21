import { User } from "model/user.model";



export let users: User[] = [
    {
        id: 1,
        name: 'Carlos',
        email: 'Ramírez Gómez'
    },
    {
        id: 2,
        name: '87654321',
        email: 'Lucía'
    },
    {
        id: 3,
        name: '11223344',
        email: 'José'
    },
];

export async function getUsers(): Promise<User[]> {
    return fetch('/api/users')
        .then(res => res.json());
}

export async function createUser(user: Omit<User, 'id'>): Promise<void> {
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export async function updateUser(cliente: User): Promise<void> {
    const index = users.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
        users[index] = cliente;
    }
}

export async function deleteUser(id: number): Promise<void> {
    users = users.filter(c => c.id !== id);
}
