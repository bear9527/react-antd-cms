import { createSlice } from "@reduxjs/toolkit"

const counter = createSlice({
  name: 'counter',
  initialState: {
    count: 1,
    list: ['jq','vue']
  },
  reducers: {
    add(state){
      state.count++
    },
    addItem(state, actions){
      console.log('actions',actions);
      
      state.list.push(actions.payload)
    },
  }
})

const { add, addItem } = counter.actions
const reducer = counter.reducer

export { add, addItem }
export default reducer