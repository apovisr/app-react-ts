"use client"

import { GroupMember } from "model/group-member";
import { CreateSettlement } from "model/settlement";
import { useState } from "react";
interface SettlementModalProps {
  groupMembers: GroupMember[];
  close: () => void;
  save: (settlement: CreateSettlement) => Promise<void>;
}

const ModalSettlement: React.FC<SettlementModalProps> = ({ groupMembers, close, save }) => {
  const [fromGroupMemberId, setFromGroupMemberId] = useState<number>(0);
  const [toGroupMemberId, setToGroupMemberId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');


  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromGroupMemberId > 0 && toGroupMemberId > 0 && amount > 0 && name) {
      save({
        name: name,
        fromGroupMemberId: fromGroupMemberId,
        toGroupMemberId: toGroupMemberId,
        amount: amount,
      } as CreateSettlement);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Pago</h2>
        <form onSubmit={sendForm} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Descripcion</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor='fromGroupMemberId' className="block text-sm font-medium text-gray-700">Emisor</label>
            <select name="fromGroupMemberId" value={fromGroupMemberId} onChange={(e) => setFromGroupMemberId(+e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="0">Seleccione un usuario</option>
              {
                groupMembers.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          <div>
            <label htmlFor='toGroupMemberId' className="block text-sm font-medium text-gray-700">Receptor</label>
            <select name="toGroupMemberId" value={toGroupMemberId} onChange={(e) => setToGroupMemberId(+e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="0">Seleccione un usuario</option>
              {
                groupMembers.filter(e => e.id != fromGroupMemberId).map(e => <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Grabar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSettlement;