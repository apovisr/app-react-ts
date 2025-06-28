import { SuggestSettlement } from "model/calculate";
import { Expense } from "model/expense";
import { GroupMember } from "model/group-member";
import { Settlement } from "model/settlement";
import { useState } from "react";


interface CalculatePageProps {
  expenses: Expense[];
  settlements: Settlement[]
  groupMembers: GroupMember[];
}


const CalculatesPage: React.FC<CalculatePageProps> = ({
  expenses,
  settlements,
  groupMembers
}) => {
  const [calculateSuggestions, setCalculateSuggestions] = useState<SuggestSettlement[]>([]);

  const calculate = () => {
    const calculateExpenses: SuggestSettlement[] = expenses.flatMap((expense) => expense.expenseSplits.map((split) => {
      return {
        toMember: expense.paidByGroupMember,
        fromMember: split.member,
        amount: +split.amount,
      };
    }
    ));

    const calculateSettlements: SuggestSettlement[] = settlements.map((settlement) => {
      return {
        fromMember: settlement.fromTo,
        toMember: settlement.toMember,
        amount: +settlement.amount,
      };
    });

    const suggestPayments = groupMembers.map((member) => {
      const x = calculateExpenses.filter(e => e.fromMember.id === member.id).map(e => e.amount).reduce((a, b) => a + b, 0)
      const y = calculateExpenses.filter(e => e.toMember.id === member.id).map(e => e.amount).reduce((a, b) => a + b, 0)
      const z = calculateSettlements.filter(e => e.toMember.id === member.id).map(e => e.amount).reduce((a, b) => a + b, 0)
      const w = calculateSettlements.filter(e => e.fromMember.id === member.id).map(e => e.amount).reduce((a, b) => a + b, 0)
      return {
        member: member,
        total: (y - x - z + w)

      }
    });

    const calculateSuggestionsUpdated: SuggestSettlement[] = []
    while (suggestPayments.find(e => e.total < 0)) {
      const toPay = suggestPayments.find(e => e.total > 0)
      const from = suggestPayments.find(e => e.total < 0)
      if (Math.abs(from.total) <= toPay.total) {
        calculateSuggestionsUpdated.push({
          fromMember: from.member,
          toMember: toPay.member,
          amount: Math.abs(from.total)
        })
        toPay.total += from.total
        from.total = 0;
      } else {
        calculateSuggestionsUpdated.push({
          fromMember: from.member,
          toMember: toPay.member,
          amount: toPay.total
        })
        from.total += toPay.total
        toPay.total = 0;
      }
    }
    setCalculateSuggestions(calculateSuggestionsUpdated);
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
        Calculos
        <button
        onClick={() => { calculate()}}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Calcular
      </button>
      </h1>
      {expenses.length === 0 && settlements.length === 0 ? (
        <p className="text-gray-600">No hay calculos disponibles.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emisor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receptor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {calculateSuggestions.map((calculateSuggestion, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calculateSuggestion.fromMember.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calculateSuggestion.toMember.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calculateSuggestion.amount}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
};

export default CalculatesPage