// Todo.tsx
import React, { useState } from 'react';

interface TodoProps {
  todo: { id: number; title: string; completed: boolean };
  onToggle: (id: number, title: string, completed: boolean) => void;
  onEdit: (id: number, title: string, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, newText, todo.completed);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-[#6D2932]">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border-b border-[#6D2932] bg-[#C7B7A3] text-[#6D2932] placeholder:text-[#6D2932] focus:outline-none  px-2 py-1 mr-2"
          />
          <button onClick={handleSave} className="text-blue-500">
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span
            className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-black"}`}
            onClick={() => onToggle(todo.id, todo.title, todo.completed)}
          >
            {todo.title}
          </span>
          <button onClick={handleEdit} className="ml-2 text-blue-500">
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
