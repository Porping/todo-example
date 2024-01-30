import axios from 'axios';
import { TodoType, ResponseType } from '../types/schema/todo-schema.ts';

 class todoService  {

  public async getTodo():Promise<ResponseType>{
      return axios.get('http://localhost:8081/todo').then((res) => {
          return res.data as unknown as ResponseType;
  })
  }

  public async addTodo(title:string):Promise<ResponseType> {
      return  axios.post('http://localhost:8081/todo',{
        title: title
      }).then((res) => {
         return res.data;
     })
  }

  public async updateTodo(data: TodoType) {
    try {
      await axios.put('http://localhost:8081/todo', data).then((res) => {
         return res.data;
     })
   }catch (err) {
     console.log(err);
   }
  }

  public async deleteTodo(id: number) {
    try {
      await axios.delete(`http://localhost:8081/todo/${id}`).then((res) => {
         return res.data;
     })
   }catch (err) {
     console.log(err);
   }
  }
}

export const TodoService = new todoService();