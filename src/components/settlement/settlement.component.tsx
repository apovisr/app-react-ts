import { Settlement } from "model/settlement";
import Link from "next/link";

interface SettlementPageProps {
    settlements: Settlement[];
    setSelectedSettlement: (settlement: Settlement | null) => void;
    setShowSettlementModal: (show: boolean) => void;
}


const SettlementsPage: React.FC<SettlementPageProps> = ({
    settlements,
    setSelectedSettlement,
    setShowSettlementModal,
}) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Pagos
      <button
        onClick={() => { setSelectedSettlement(null); setShowSettlementModal(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Pago
      </button>
    </h1>
    {settlements.length === 0 ? (
      <p className="text-gray-600">No hay pagos disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emisor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receptor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settlements.map((settlement) => (
              <tr key={settlement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.fromTo.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.toMember.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{settlement.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default SettlementsPage