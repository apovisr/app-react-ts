export interface CreateExpenseDto {
    readonly name: string;
    readonly groupMemberId: number;
    readonly totalAmount: number;
    readonly expenseSplits: CreateExpenseSplitDto[];
}

export interface CreateExpenseSplitDto {
    readonly groupMemberId: number;
    readonly amount: number;
}

export interface ExpenseDto {
    readonly id: number;
    readonly name: string;
    readonly totalAmount: number;
    readonly paidByGroupMember: GroupMemberDto;
    readonly createdAt: string;
    readonly expenseSplits: ExpenseSplitDto[];
}

export interface ExpenseSplitDto {
    readonly id: number;
    readonly member: GroupMemberDto;
    readonly amount: number;
}

export interface  GroupMemberDto{
    readonly id: number;
    readonly name: string;
    readonly userId: number;
}

export interface  UserDto{
    readonly id: number;
    readonly name: string;
    readonly email: string;
}


export interface  CreateGroupMemberDto{
    readonly userId: number;
    readonly groupId: number;
}

export interface  CreateSettlementDto{
    readonly name: string;
    readonly fromGroupMemberId: number;
    readonly toGroupMemberId: number;
    readonly amount: number;
}

export interface  SettlementDto{
    readonly id: number;
    readonly name: string;
    readonly fromTo: GroupMemberDto;
    readonly toMember: GroupMemberDto;
    readonly amount: number;
    readonly createdAt: string;
}

export interface  GroupDto{
    readonly id: number;
    readonly name: string;
    readonly description?: string;
}