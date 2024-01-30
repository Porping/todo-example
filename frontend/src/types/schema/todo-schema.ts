export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export type GetTodosResponse = {
  data: TodoType[];
  message: string;
  isSuccess: boolean;
};