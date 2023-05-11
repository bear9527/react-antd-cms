import { FC, ReactElement, useCallback, useEffect, useReducer } from "react";
import { IState, ITodo } from "../types";
import Input from "./Input";
import List from "./List/Index";
import { todoReducer } from "../reducer";
import { ACTION_TYPE } from "../types/index";

const init = (initTodoList: ITodo[]): IState => {
  return {
    todoList: initTodoList,
  };
};
const TodoList: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, [], init);

  const addTodo = useCallback(
    (todo: ITodo) => {
      if (state.todoList.some((item) => item.content === todo.content)) {
        alert("已经有重复的咯！");
        return;
      }
      dispatch({
        type: ACTION_TYPE.ADD_TODO,
        payload: todo,
      });
    },
    [state.todoList]
  );
  const removeTodo = (id: number) => {
    console.log("--removeTodo", id);
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id,
    });
  };
  const toggleTodo = (id: number) => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id,
    });
  };
  const initTodoList = (todoList: ITodo[]) => {
    dispatch({
      type: ACTION_TYPE.INIT_TODOLIST,
      payload: todoList,
    });
  };
  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    todoList.length && initTodoList(todoList);
  }, []);
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state.todoList))
  },[state.todoList]);

  return (
    <>
      <Input addTodo={addTodo} />
      <br />
      <List
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </>
  );
};

export default TodoList;
