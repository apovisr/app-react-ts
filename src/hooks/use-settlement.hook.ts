"use client";
import { useEffect, useState } from 'react';
import { useMessage } from './use-message.hook';
import * as settlementsApi from 'external/api/settlement.api';
import { CreateSettlement, Settlement } from 'model/settlement';

export function useSettlement(groupId: number) {
    const [settlements, setSettlements] = useState<Settlement[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSettlementModal, setShowSettlementModal]
        = useState<boolean>(false);
    const [selectedSettlement, setSelectedSettlement]
        = useState<Settlement | null>(null);
    const { showMesage } = useMessage();

    useEffect(() => {
        const loadSettlements = async () => {
            setLoading(true);
            try {
                setSettlements(await settlementsApi.getSettlements(groupId));
            } catch (error) {
                showMesage('No se pudieron cargar los productos.', 'error');
                console.error('Error al cargar productos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSettlements();
    }, []);

    const addSettlement = async (settlement: CreateSettlement) => {
        setLoading(true);

        try {
            const response = await settlementsApi.createSettlement({...settlement, groupId});
            setSettlements(await settlementsApi.getSettlements(groupId));
            showMesage('Producto agregado satisfactoriamente!', 'success');
            setShowSettlementModal(false);
        } catch (error) {
            showMesage('No se pudo agregar el producto.', 'error');
            console.error("Hubo un error al agregar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        settlements,
        loading,
        addSettlement,
        setShowSettlementModal,
        setSelectedSettlement,
        selectedSettlement,
        showSettlementModal
    };
}
