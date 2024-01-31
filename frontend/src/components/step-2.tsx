import { useState } from "react";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoList2 = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState<string>("");

  const addTodo = (title: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, title, completed: false },
    ]);
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addTodo(text)}>Add</button>

      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  );
};
