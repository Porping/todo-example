// App.tsx
import React, { useState } from "react";
import Todo from "./components/Todo";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false },
  ]);

  const addTodo = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, text, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
};

export default App;
