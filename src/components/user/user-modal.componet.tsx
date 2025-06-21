"use client"

import { useState } from "react";
import { User } from "model/user.model";

interface UserModalProps {
  user: User | null;
  close: () => void;
  save: (user: User | Omit<User, 'id'>) => Promise<void>;
}

const ModalUser: React.FC<UserModalProps> = ({ user, close, save }) => {
    const [name, setName] = useState<string>(user ? user.name : '');
    const [email, setEmail] = useState<string>(user ? user.email : '');

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      save({ ...user, name, email } as User);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{user ? 'Editar User' : 'Registrar Nuevo User'}</h2>
        <form onSubmit={sendForm} className="space-y-4">
            <div>
                <label htmlFor="nameUser" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                type="text"
                id="nameUser"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
          <div>
            <label htmlFor="emailUser" className="block text-sm font-medium text-gray-700">Descripcion User</label>
            <input
              type="text"
              id="emailUser"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ModalUser;