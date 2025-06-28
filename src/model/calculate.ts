import { GroupMember } from "./group-member";

export interface SuggestSettlement {
    readonly fromMember: GroupMember;
    readonly toMember: GroupMember;
    readonly amount: number;
}