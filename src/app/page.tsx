"use client"

import ModalGroup from 'components/group/group-modal.componet';
import GroupsPage from 'components/group/group.component';
import ModalUser from 'components/user/user-modal.componet';
import UsersPage from 'components/user/user.component';
import { useGroup } from 'hooks/use-group.hook';
import { useMessage } from 'hooks/use-message.hook';
import { useUser } from 'hooks/use-user.hook';
import { Group } from 'model/group.model';
import { User } from 'model/user.model';
import React, { useState } from 'react';


export default function Home() {
  const [paginaActual, setPaginaActual] = useState<'users' | 'groups'>('users');

  const { message } = useMessage();
  const usersHook = useUser();
  const groupsHook = useGroup();


  const loading = usersHook.loading || groupsHook.loading;
  
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
              onClick={() => setPaginaActual('users')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'users' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Users
            </button>
            <button
              onClick={() => setPaginaActual('groups')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'groups' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Groups
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {paginaActual === 'users' && (
          <UsersPage
            users={usersHook.users}
            setSelectedUser={usersHook.setSelectedUser}
            setShowUserModal={usersHook.setShowUserModal}
            deleteUser={usersHook.deleteUser}
          />
        )}

        {paginaActual === 'groups' && (
          <GroupsPage
            groups={groupsHook.groups}
            setSelectedGroup={groupsHook.setSelectedGroup}
            setShowGroupModal={groupsHook.setShowGroupModal}
            deleteGroup={groupsHook.deleteGroup}
          />
        )}
      </main>


      {groupsHook.showGroupModal && (
        <ModalGroup
          group={groupsHook.selectedGroup}
          close={() => {
            groupsHook.setShowGroupModal(false);
            groupsHook.setSelectedGroup(null);
          }}
          save={(group) =>
            groupsHook.selectedGroup
              ? groupsHook.updateGroup(group as Group)
              : groupsHook.addGroup(group as Omit<Group, 'id'>)
          }
        />
      )}

      {usersHook.showUserModal && (
        <ModalUser
          user={usersHook.selectedUser}
          close={() => {
            usersHook.setShowUserModal(false);
            usersHook.setSelectedUser(null);
          }}
          save={(user) =>
            usersHook.selectedUser
              ? usersHook.updateUser(user as User)
              : usersHook.addUser(user as Omit<User, 'id'>)
          }
        />
      )}
    </div>
  );
};
