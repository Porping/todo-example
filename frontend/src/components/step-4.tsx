import React, { useEffect, useState } from "react";
import axios from "axios";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoList4 = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const res = await axios.post("http://localhost:3000/todo", {
      title: text,
    });

    if (res.data.isSuccess) {
      fetchTodos();
    }
  };

  const toggleTodo = async (id: number, title: string, completed: boolean) => {
    const res = await axios.patch(`http://localhost:3000/todo/${id}`, {
      title: title,
      completed: !completed,
    });

    if (res.data.isSuccess) {
      fetchTodos();
    }
  };

  const editTodo = async (id: number, title: string, completed: boolean) => {
    const res = await axios.patch(`http://localhost:3000/todo/${id}`, {
      title: title,
      completed: completed,
    });

    if (res.data.isSuccess) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await axios.delete(`http://localhost:3000/todo/${id}`);

    if (res.data.isSuccess) {
      fetchTodos();
    }
  };

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3000/todo");
    if (res.data.isSuccess) {
      setTodos(res.data.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg shadow-[#E8D8C4] bg-[#E8D8C4] ">
      <h1 className="text-2xl font-bold mb-4 text-[#6D2932]">Todo App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add new todo"
          className="border border-[#6D2932] bg-[#C7B7A3] text-[#6D2932] placeholder:text-[#6D2932] p-2 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
              addTodo(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      {todos == null ? (
        <p className=" text-center text-lg font-semibold animate-pulse">
          No todo{" "}
        </p>
      ) : (
        <>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          ))}
        </>
      )}
    </div>
  );
};

type TodoProps = {
  todo: { id: number; title: string; completed: boolean };
  onToggle: (id: number, title: string, completed: boolean) => void;
  onEdit: (id: number, title: string, completed: boolean) => void;
  onDelete: (id: number) => void;
};

export const Todo: React.FC<TodoProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
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
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-400" : "text-black"
            }`}
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
