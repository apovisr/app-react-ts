"use client";
import { useEffect, useState } from 'react';
import * as usersApi from 'external/api/user.api';
import { User } from 'model/user.model';
import { useMessage } from './use-message.hook';

export function useUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [showUserModal, setShowUserModal]
        = useState<boolean>(false);
    const [selectedUser, setSelectedUser]
        = useState<User | null>(null);
    const { showMesage } = useMessage();

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                console.log(await usersApi.getUsers());
                setUsers(await usersApi.getUsers());
            } catch (error) {
                showMesage('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const addUser = async (user: Omit<User, 'id'>) => {
        setLoading(true);

        try {
            const nuevoProducto = await usersApi.createUser(user);
            setUsers(await usersApi.getUsers());
            showMesage('Producto agregado satisfactoriamente!', 'success');
            setShowUserModal(false);
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updateUser: User) => {
        setLoading(true);
        try {
            await usersApi.updateUser(updateUser.id, updateUser);
            setUsers(await usersApi.getUsers());
            showMesage('Producto actualizado satisfactoriamente!', 'success');
            setSelectedUser(null);
            setShowUserModal(false);
        } catch (error) {
            showMesage('No se pudo actualizar el producto.', 'error');
            console.error("Hubo un error al actualizar el producto:", error);
        } finally {
            setLoading(false);
        }
    }
    return {
        users,
        loading,
        addUser,
        updateUser,
        setShowUserModal,
        setSelectedUser,
        selectedUser,
        showUserModal
    };
}
