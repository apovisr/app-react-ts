import { User } from "model/user.model";

export async function getUsers(): Promise<User[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/users`)
        .then(res => res.json());
}


export async function getUsersNotBelongGroup(id: number): Promise<User[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/users/not/group/` + id)
        .then(res => res.json());
}

export async function createUser(user: Omit<User, 'id'>): Promise<void> {
    fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export async function updateUser(id:number, user: Omit<User, 'id'|'email'>): Promise<void> {
    fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}