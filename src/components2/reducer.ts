import { ACTION_TYPE, IAction, IState, ITodo } from "./types/index";
export const todoReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, payload as ITodo],
      };
    case ACTION_TYPE.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== payload),
      };
    case ACTION_TYPE.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          return todo.id === payload
            ? {
                ...todo,
                complated: !todo.complated,
              }
            : todo;
        }),
      };
      case ACTION_TYPE.INIT_TODOLIST:
        return {
          ...state,
          todoList: payload as ITodo[],
        };

    default:
      return state;
  }
};
