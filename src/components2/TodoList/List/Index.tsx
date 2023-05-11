import { FC, ReactElement } from "react";
import { ITodo } from "../../types";
import Item from "./Item";
interface IProps {
  todoList: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}
const TodoList: FC<IProps> = ({
  todoList,
  removeTodo,
  toggleTodo,
}): ReactElement => {
  console.log('注册list index');
  
  return (
    <>
      {todoList &&
        todoList.map((todo) => {
          return (
            <Item
              todo={todo}
              key={todo.id}
              removeTodo={() => removeTodo(todo.id)}
              toggleTodo={() => toggleTodo(todo.id)}
            />
          );
        })}
    </>
  );
};

export default TodoList;
