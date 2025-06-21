"use client";
import { useEffect, useState } from 'react';
import { useMessage } from './use-message.hook';
import { GroupMember } from 'model/group-member';

import * as groupMembersApi from 'external/api/group-members.api';

export function useGroupMember(groupId: number) {
    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [showGroupMemberModal, setShowGroupMemberModal]
        = useState<boolean>(false);
    const [selectedGroupMember, setSelectedGroupMember]
        = useState<GroupMember | null>(null);
    const { showMesage } = useMessage();

    useEffect(() => {
        const loadGroupMembers = async () => {
            setLoading(true);
            try {
                setGroupMembers(await groupMembersApi.getGroupMembersByGroupId(groupId));
            } catch (error) {
                showMesage('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadGroupMembers();
    }, []);

    const addGroupMember = async (groupMember: Omit<GroupMember, 'id'>) => {
        setLoading(true);

        try {
            const nuevoProducto = await groupMembersApi.createGroupMember(groupMember);
            setGroupMembers(await groupMembersApi.getGroupMembersByGroupId(groupId));
            showMesage('Producto agregado satisfactoriamente!', 'success');
            setShowGroupMemberModal(false);
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteGroupMember = async (id: number) => {
        setLoading(true);
        try {
            await groupMembersApi.deleteGroupMember(id);
            setGroupMembers(await groupMembersApi.getGroupMembersByGroupId(groupId));
            showMesage('El producto fue eliminado satisfactoriamente!', 'success');
        } catch (error) {
            showMesage('No se pudo eliminar el producto.', 'error');
            console.error("Hubo un error al eliminar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        groupMembers,
        loading,
        addGroupMember,
        deleteGroupMember,
        setShowGroupMemberModal,
        setSelectedGroupMember,
        selectedGroupMember,
        showGroupMemberModal
    };
}
