import { GroupMember } from "./group-member";

export interface Expense {
    readonly id: number;
    readonly name: string;
    readonly totalAmount: number;
    readonly paidByGroupMember: GroupMember;
    readonly createdAt: string;
    readonly expenseSplits: ExpenseSplit[];
}

export interface ExpenseSplit {
    readonly id: number;
    readonly member: GroupMember;
    readonly amount: number;
}


export interface CreateExpense {
    readonly name: string;
    readonly groupMemberId: number;
    readonly groupId: number
    readonly totalAmount: number;
    readonly expenseSplits: CreateExpenseSplit[];
}

export interface CreateExpenseSplit {
    readonly groupMemberId: number;
    readonly amount: number;
}

export interface  ExpenseSplitBuild{
    id: number;
    name: string;
    amount: number;
    checked: boolean;
}