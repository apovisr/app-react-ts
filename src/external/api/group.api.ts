import { Group } from "model/group.model";

export async function getGroups(): Promise<Group[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/groups`)
    .then(res => res.json());
}

export async function createGroup(group: Omit<Group, 'id'>): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });
}

export async function updateGroup(group: Group): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/groups/${group.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });
}

export async function deleteGroup(id: number): Promise<void> {
    // TODO
}
