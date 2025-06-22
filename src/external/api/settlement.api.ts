import { CreateSettlement, Settlement } from "model/settlement";

export async function getSettlements(groupId: number): Promise<Settlement[]> {
    return fetch('/api/settlements/group/' + groupId)
        .then(res => res.json());
}


export async function createSettlement(settlement: CreateSettlement): Promise<void> {
    fetch('/api/settlements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settlement)
    });
}

