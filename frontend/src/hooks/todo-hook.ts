import { TodoService } from "../services/todo-service";
import { useState} from "react";
import {  toast, TypeOptions } from 'react-toastify';
import { TodoType } from "../types/schema/todo-schema";
export const useTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const notify = (text:string, type?: TypeOptions | undefined) => toast('🦄 ' + text, {
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
  
  const getTodo = async () => {
    const data = await TodoService.getTodo();
    if (data.isSuccess) {
      notify(data.message, "success");
      setTodos(data.data);
    }else {
      notify(data.message, "error");
    }
  };

  const addTodo = async(text: string) => {
   const data = await TodoService.addTodo(text);
    if (data.isSuccess) {
      notify(data.message, "success");
      getTodo();
    }
  };

  return {
    getTodo,
    todos,
    addTodo,
  };
}