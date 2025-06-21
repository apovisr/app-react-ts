import { GroupMember } from "model/group-member";

interface GroupMemberPageProps {
    groupMembers: GroupMember[];
    setSelectedGroupMember: (groupMember: GroupMember | null) => void;
    setShowGroupMemberModal: (show: boolean) => void;
    deleteGroupMember: (id: number) => void;
}


const GroupMembersPage: React.FC<GroupMemberPageProps> = ({
    groupMembers,
    setSelectedGroupMember,
    setShowGroupMemberModal,
    deleteGroupMember,
}) => (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 flex justify-between items-center">
      Clientes
      <button
        onClick={() => { setSelectedGroupMember(null); setShowGroupMemberModal(true); }}
        className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Agregar Usuario
      </button>
    </h1>
    {groupMembers.length === 0 ? (
      <p className="text-gray-600">No hay miembros disponibles.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groupMembers.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cliente.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteGroupMember(cliente.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
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

export default GroupMembersPage