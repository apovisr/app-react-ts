import { Group } from "model/group.model";

export let groups: Group[] = [
    {
        id: 1,
        name: 'Group 1',
        description: 'Ramírez Gómez'
    },
    {
        id: 2,
        name: 'Group 2',
        description: 'Lucía'
    },
    {
        id: 3,
        name: 'Group 3',
        description: 'José'
    },
];

export async function getGroups(): Promise<Group[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/groups`)
    .then(res => res.json());
}

export async function createGroup(group: Omit<Group, 'id'>): Promise<void> {
    fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });
}

export async function updateGroup(group: Group): Promise<void> {
    const index = groups.findIndex(c => c.id === group.id);
    if (index !== -1) {
        groups[index] = group;
    }
}

export async function deleteGroup(id: number): Promise<void> {
    groups = groups.filter(c => c.id !== id);
}
