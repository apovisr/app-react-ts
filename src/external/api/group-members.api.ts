import { GroupMember } from "model/group-member";


export let groupMembers: GroupMember[] = [
    {
        id: 1,
        name: 'GroupMember 1',
        userId: 1,
        groupId: 1
    },
    {
        id: 2,
        name: 'GroupMember 2',
        userId: 2,
        groupId: 1
    },
    {
        id: 3,
        name: 'GroupMember 3',
        userId: 3,
        groupId: 1
    },
];

export async function getGroupMembersByGroupId(id: number): Promise<GroupMember[]> {
    return fetch(`/api/group-members/group/${id}`)
    .then(res => res.json());
}

export async function createGroupMember(groupMember: Omit<GroupMember, 'id'|'name'>): Promise<void> {
    fetch('/api/group-members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupMember)
    });
}

export async function deleteGroupMember(id: number): Promise<void> {
    groupMembers = groupMembers.filter(c => c.id !== id);
}
