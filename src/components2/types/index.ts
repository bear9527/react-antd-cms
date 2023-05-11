export interface ITodo {
  id: number;
  content: string;
  complated: boolean
}

export interface IAction {
  type: ACTION_TYPE;
  payload: ITodo | ITodo[] | number
}

export interface IState {
  todoList: ITodo[]
}

export enum ACTION_TYPE{
  ADD_TODO = 'addTodo',
  REMOVE_TODO = 'removeTodo',
  TOGGLE_TODO = 'toggleTodo',
  INIT_TODOLIST = 'initTodoList',
}