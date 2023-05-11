import { FC } from "react";
import { ITodo } from "../../types";

interface IProps {
  todo: ITodo;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}
const TodoItem: FC<IProps> = ({ todo, removeTodo, toggleTodo }) => {
  const { id, content, complated } = todo;
  console.log('注册Item');
  return (
    <>
      <input
        type="checkbox"
        checked={complated}
        onChange={() => toggleTodo(id)}
      />
      <span style={{ textDecoration: complated ? "line-through" : "none" }}>
        {content}
      </span>
      <button onClick={() => removeTodo(id)}>删除</button>
      <br />
    </>
  );
};

export default TodoItem;
