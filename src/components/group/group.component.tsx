import { Group } from "model/group.model";
import Link from "next/link";

interface GroupPageProps {
    groups: Group[];
    setSelectedGroup: (group: Group | null) => void;
    setShowGroupModal: (show: boolean) => void;
}


const GroupsPage: React.FC<GroupPageProps> = ({
    groups,
    setSelectedGroup,
    setShowGroupModal,
}) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Grupos
      <button
        onClick={() => { setSelectedGroup(null); setShowGroupModal(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Grupo
      </button>
    </h1>
    {groups.length === 0 ? (
      <p className="text-gray-600">No hay usuarios disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groups.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href="/group/[id]" as={`/group/${cliente.id}`}>
                <button
                    className="text-zinc-600 hover:text-zinc-900 mr-4"
                  >
                    Ver
                  </button>
                  </Link>
                  <button
                    onClick={() => { setSelectedGroup(cliente); setShowGroupModal(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default GroupsPage