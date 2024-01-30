export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export type ResponseType = {
  data: TodoType[];
  message: string;
  isSuccess: boolean;
};