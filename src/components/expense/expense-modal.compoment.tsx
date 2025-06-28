"use client"
import { CreateExpense, ExpenseSplitBuild } from "model/expense";
import { GroupMember } from "model/group-member";
import { useState } from "react";
interface ExpenseModalProps {
  groupMembers: GroupMember[];
  close: () => void;
  save: (expense: CreateExpense) => Promise<void>;
}

const ModalExpense: React.FC<ExpenseModalProps> = ({ groupMembers, close, save }) => {
  const [splitExpenses, setSplitExpenses] = useState<ExpenseSplitBuild[]>(groupMembers.map((e) => {return {id: e.id, name: e.name, amount: 0, checked: false};}));
  const [paidByGroupMemberId, setPaidByGroupMemberId] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [name, setName] = useState<string>('');


  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (paidByGroupMemberId <= 0 || totalAmount <= 0 || name === '' 
      || splitExpenses.filter(e => e.checked).length === 0 || totalAmount !== splitExpenses.filter(e => e.checked).reduce((acc, curr) => acc + curr.amount, 0)) {
      return;
    }

    save({
      name: name,
      groupMemberId: paidByGroupMemberId,
      totalAmount: totalAmount,
      groupId: 0,
      expenseSplits: splitExpenses.filter(e => e.checked).map(e => {
        return { groupMemberId: e.id, amount: e.amount };
      })
    });
  };

  const updatedParticipants = (amount, index) => {
    const updated = splitExpenses.map((e) => {
      if (e.id === index) {
        return { ...e, amount: amount };
      }
      return e;
    });
    setSplitExpenses(updated);
  }

  const updatedChecked = (index) => {
    const updatedItems = splitExpenses.map((item) =>
      item.id === index ? { ...item, checked: !item.checked } : item
    );
    setSplitExpenses(updatedItems);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Agregar Gasto</h2>
        <form onSubmit={sendForm} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto total</label>
            <input
              type="number"
              id="amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(+e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor='paidByGroupMemberId' className="block text-sm font-medium text-gray-700">Paid by</label>
            <select name="fromGroupMemberId" value={paidByGroupMemberId} onChange={(e) => setPaidByGroupMemberId(+e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="0">Select an User</option>
              {
                groupMembers.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          <div>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seleccionar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {splitExpenses.map((splitExpense) => (
                  <tr key={splitExpense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input type="checkbox" checked={splitExpense.checked} onChange={() => updatedChecked(splitExpense.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{splitExpense.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="number"
                        disabled={!splitExpense.checked}
                        id="amount"
                        value={splitExpense.amount}
                        onChange={(e) => updatedParticipants(+e.target.value, splitExpense.id)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                      />

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default ModalExpense;