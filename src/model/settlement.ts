import { GroupMember } from "./group-member";

export interface  Settlement{
    id: number;
    name: string;
    fromTo: GroupMember;
    toMember: GroupMember;
    amount: number;
    createdAt: string;
}


export interface  CreateSettlement{
    groupId?: number;
    name: string;
    fromGroupMemberId: number;
    toGroupMemberId: number;
    amount: number;
}
