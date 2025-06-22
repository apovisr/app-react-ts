"use client"
import ModalGroupMember from 'components/group-members/group-member-modal.componet';
import GroupMembersPage from 'components/group-members/group-members.component';
import ModalSettlement from 'components/settlement/setlement-modal.componet';
import SettlementsPage from 'components/settlement/settlement.component';
import { useGroupMember } from 'hooks/use-group-member.hook';
import { useMessage } from 'hooks/use-message.hook';
import { useSettlement } from 'hooks/use-settlement.hook';
import { useUser } from 'hooks/use-user.hook';
import React, { useState } from 'react';


export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { message } = useMessage();
  const groupMembersHook = useGroupMember(+id);
  const settlementsHook = useSettlement(+id);

  const loading = groupMembersHook.loading || settlementsHook.loading;
  const [paginaActual, setPaginaActual] = useState<'group-members' | 'settlements' | 'payments'>('group-members');

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {message.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50
          ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {message.text}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">loading...</p>
        </div>
      )}

      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold rounded-lg">Split Wise</div>
          <div className="flex space-x-6">
            <button
              onClick={() => setPaginaActual('group-members')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'group-members' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Members
            </button>
            <button
              onClick={() => setPaginaActual('settlements')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'settlements' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Pagos
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {paginaActual === 'group-members' && (
          <GroupMembersPage
            groupMembers={groupMembersHook.groupMembers}
            setSelectedGroupMember={groupMembersHook.setSelectedGroupMember}
            setShowGroupMemberModal={groupMembersHook.setShowGroupMemberModal}
            deleteGroupMember={groupMembersHook.deleteGroupMember}
          />
        )}

        {paginaActual === 'settlements' && (
          <SettlementsPage
            settlements={settlementsHook.settlements}
            setSelectedSettlement={settlementsHook.setSelectedSettlement}
            setShowSettlementModal={settlementsHook.setShowSettlementModal}
          />
        )}
      </main>
  
      {groupMembersHook.showGroupMemberModal && (
        <ModalGroupMember
          users={groupMembersHook.users}
          close={() => {
            groupMembersHook.setShowGroupMemberModal(false);
          }}
          save={groupMembersHook.addGroupMember}
        />
      )}


      {settlementsHook.showSettlementModal && (
        <ModalSettlement
          groupMembers={groupMembersHook.groupMembers}
          close={() => {
            settlementsHook.setShowSettlementModal(false);
          }}
          save={settlementsHook.addSettlement}
        />
      )}
    </div>
  );
};
