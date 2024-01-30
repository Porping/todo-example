import axios from 'axios';
import { TodoType, GetTodosResponse } from '../types/schema/todo-schema.ts';

class todoService {

  public async getTodo(): Promise<GetTodosResponse> {
    return axios.get('http://localhost:3000/todo').then((res) => {
      return res.data as unknown as GetTodosResponse;
    })
  }

  public async addTodo(title: string): Promise<GetTodosResponse> {
    return axios.post('http://localhost:3000/todo', {
      title: title
    }).then((res) => {
      return res.data;
    })
  }

  public async updateTodo(data: TodoType) {
    try {
      await axios.put('http://localhost:3000/todo', data).then((res) => {
        return res.data;
      })
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteTodo(id: number) {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`).then((res) => {
        return res.data;
      })
    } catch (err) {
      console.log(err);
    }
  }
}

export const TodoService = new todoService();