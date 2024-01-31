import { useState } from "react";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

const mockTodos: TodoType[] = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React 2",
    completed: false,
  },
];

export const TodoList1 = () => {
  const [todos, setTodos] = useState<TodoType[]>(mockTodos);

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  );
};
