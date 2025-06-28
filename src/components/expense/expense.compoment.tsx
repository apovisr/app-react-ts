import { Expense } from "model/expense";

interface ExpensePageProps {
    expenses: Expense[];
    setSelectedExpense: (expense: Expense | null) => void;
    setShowExpenseModal: (show: boolean) => void;
    deleteExpense: (id: number) => void;
}


const ExpensesPage: React.FC<ExpensePageProps> = ({
    expenses,
    setSelectedExpense,
    setShowExpenseModal,
    deleteExpense,
}) => {
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Gastos
      <button
        onClick={() => { setSelectedExpense(null); setShowExpenseModal(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Gastos
      </button>
    </h1>
    {expenses.length === 0 ? (
      <p className="text-gray-600">No hay gastos disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagado por</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.paidByGroupMember.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => { setSelectedExpense(expense); setShowExpenseModal(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)};

export default ExpensesPage