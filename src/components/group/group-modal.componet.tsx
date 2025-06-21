"use client"

import { useState } from "react";
import { Group } from "model/group.model";

interface GroupModalProps {
  group: Group | null;
  close: () => void;
  save: (group: Group | Omit<Group, 'id'>) => Promise<void>;
}

const ModalGroup: React.FC<GroupModalProps> = ({ group, close, save }) => {
    const [name, setName] = useState<string>(group ? group.name : '');
    const [description, setDescription] = useState<string>(group ? group.description : '');

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description) {
      save({ ...group, name, description } as Group);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{group ? 'Editar Group' : 'Registrar Nuevo Group'}</h2>
        <form onSubmit={sendForm} className="space-y-4">
            <div>
                <label htmlFor="nameGroup" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                type="text"
                id="nameGroup"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
          <div>
            <label htmlFor="descriptionGroup" className="block text-sm font-medium text-gray-700">Descripcion Group</label>
            <input
              type="text"
              id="descriptionGroup"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default ModalGroup;