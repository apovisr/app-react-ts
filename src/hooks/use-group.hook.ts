"use client";
import { useEffect, useState } from 'react';
import * as groupsApi from 'external/api/group.api';
import { Group } from 'model/group.model';
import { useMessage } from './use-message.hook';

export function useGroup() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [showGroupModal, setShowGroupModal]
        = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup]
        = useState<Group | null>(null);
    const { showMesage } = useMessage();

    useEffect(() => {
        const loadGroups = async () => {
            setLoading(true);
            try {
                setGroups(await groupsApi.getGroups());
            } catch (error) {
                showMesage('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadGroups();
    }, []);

    const addGroup = async (group: Omit<Group, 'id'>) => {
        setLoading(true);

        try {
            const nuevoProducto = await groupsApi.createGroup(group);
            setGroups(await groupsApi.getGroups());
            showMesage('Producto agregado satisfactoriamente!', 'success');
            setShowGroupModal(false);
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateGroup = async (updateGroup: Group) => {
        setLoading(true);
        try {
            await groupsApi.updateGroup(updateGroup);
            setGroups(await groupsApi.getGroups());
            showMesage('Producto actualizado satisfactoriamente!', 'success');
            setSelectedGroup(null);
            setShowGroupModal(false);
        } catch (error) {
            showMesage('No se pudo actualizar el producto.', 'error');
            console.error("Hubo un error al actualizar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteGroup = async (id: number) => {
        setLoading(true);
        try {
            await groupsApi.deleteGroup(id);
            setGroups(await groupsApi.getGroups());
            showMesage('El producto fue eliminado satisfactoriamente!', 'success');
        } catch (error) {
            showMesage('No se pudo eliminar el producto.', 'error');
            console.error("Hubo un error al eliminar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        groups,
        loading,
        addGroup,
        updateGroup,
        setShowGroupModal,
        setSelectedGroup,
        selectedGroup,
        showGroupModal
    };
}
