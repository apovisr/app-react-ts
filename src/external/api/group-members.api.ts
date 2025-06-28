import { GroupMember } from "model/group-member";

export async function getGroupMembersByGroupId(id: number): Promise<GroupMember[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/group-members/group/${id}`)
    .then(res => res.json());
}

export async function createGroupMember(groupMember: Omit<GroupMember, 'id'|'name'>): Promise<void> {
    fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/group-members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupMember)
    });
}

export async function deleteGroupMember(id: number): Promise<void> {
    //TODO
}
