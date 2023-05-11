import { FC, ReactElement, useRef } from "react"
import { ITodo } from "../../types"
interface IProps {
  addTodo: (todo: ITodo) => void
}
const Input:FC<IProps> = ({
  addTodo
}): ReactElement => {
  const InputRef = useRef<HTMLInputElement>(null)
  const addTodoInput = ()=>{
    if(InputRef.current && InputRef.current.value){
      addTodo({
        id: new Date().getTime(),
        content: InputRef.current.value,
        complated: false
      })
      InputRef.current.value = ''
    }
  }
  return (
    <>
      <input ref={InputRef}/>
      <button onClick={addTodoInput}>添加待办</button>
    </>
  )
}

export default Input