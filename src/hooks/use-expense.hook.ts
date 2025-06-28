"use client";
import { useEffect, useState } from 'react';
import { useMessage } from './use-message.hook';

import * as expensesApi from 'external/api/expense.api';
import { CreateExpense, Expense } from 'model/expense';

export function useExpense(groupId: number) {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);
    const [showExpenseModal, setShowExpenseModal]
        = useState<boolean>(false);
    const [selectedExpense, setSelectedExpense]
        = useState<Expense | null>(null);
    const { showMesage } = useMessage();

    useEffect(() => {
        const loadExpenses = async () => {
            setLoading(true);
            try {
                setExpenses(await expensesApi.getExpensesByGroupId(groupId));
            } catch (error) {
                showMesage('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadExpenses();
    }, []);

    const addExpense = async (createExpense: CreateExpense) => {
        setLoading(true);

        try {
            await expensesApi.createExpense({...createExpense, groupId });
            setExpenses(await expensesApi.getExpensesByGroupId(groupId));
            showMesage('Producto agregado satisfactoriamente!', 'success');
            setShowExpenseModal(false);
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteExpenseById = async (expenseId: number) => {
        setLoading(true);

        try {
            await expensesApi.deleteExpenseById(expenseId);
            setExpenses(await expensesApi.getExpensesByGroupId(groupId));
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    
    return {
        expenses,
        loading,
        addExpense,
        setShowExpenseModal,
        setSelectedExpense,
        deleteExpenseById,
        selectedExpense,
        showExpenseModal
    };
}
