// App.tsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import Todo from "./components/Todo";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { TodoType } from "./types/schema/todo-schema";


const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  // const {getTodo,todos, addTodo} = useTodo();
  const notify = (text: string, type?: TypeOptions | undefined) => toast('🦄 ' + text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: type ?? "default",
  });




  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/todo');
      console.log(res.data)
      if (res.data.isSuccess) {
        notify(res.data.message, "success");
        setTodos(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addTodo = (text: string) => {
    try {
      axios.post('http://localhost:3000/todo', {
        title: text,
      }).then((res) => {
        if (res.data.isSuccess) {
          notify(res.data.message, "success");
          fetchTodos();
        } else {
          notify(res.data.message, "error");
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTodo = (id: number, title: string, completed: boolean) => {
    try {
      axios.patch(`http://localhost:3000/todo/${id}`, {
        title: title,
        completed: !completed,
      }).then((res) => {
        if (res.data.isSuccess) {
          notify(res.data.message, "success");
          fetchTodos();
        } else {
          notify(res.data.message);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = (id: number, title: string, completed: boolean) => {
    try {
      axios.patch(`http://localhost:3000/todo/${id}`, {
        title: title,
        completed: completed,
      }).then((res) => {
        if (res.data.isSuccess) {
          notify(res.data.message, "success");
          fetchTodos();
        } else {
          notify(res.data.message);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = (id: number) => {
    try {
      axios.delete(`http://localhost:3000/todo/${id}`).then((res) => {
        if (res.data.isSuccess) {
          notify(res.data.message, "success");
          fetchTodos();
        } else {
          notify(res.data.message);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg shadow-[#E8D8C4] bg-[#E8D8C4] ">
      <ToastContainer />
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
        <p className=' text-center text-lg font-semibold animate-pulse'>No todo </p>
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

export default App;
