import { CreateExpense, Expense } from "model/expense";


export async function getExpensesByGroupId(id: number): Promise<Expense[]> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/expenses/group/${id}`)
    .then(res => res.json());
}

export async function createExpense(expense: CreateExpense): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    });
}

export async function getExpenseById(id: number): Promise<Expense> {
    return fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/expenses/${id}`)
    .then(res => res.json());
}

export async function deleteExpenseById(id: number): Promise<void> {
    await fetch(`${process.env.NEXT_PUBLIC_URL_BASE_API}/expenses/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
