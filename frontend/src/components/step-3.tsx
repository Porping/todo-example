import { useState } from "react";

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoList3 = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState<string>("");

  const addTodo = (title: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, title, completed: false },
    ]);
  };

  const editTodo = (id: number, newText: string) => {
    console.log(todos, id, newText);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newText } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addTodo(text)}>Add</button>

      <div className="flex flex-col">
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
    </>
  );
};

export type TodoProps = {
  todo: TodoType;
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
    <>
      {isEditing ? (
        <div className="flex space-x-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <div
            onClick={() => onToggle(todo.id, todo.title, todo.completed)}
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-400" : "text-black"
            }`}
          >
            {todo.title}
          </div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </>
  );
};
