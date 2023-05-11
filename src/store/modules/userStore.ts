import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers: {
    setToken(state, actions){
      state.token = actions.payload
    }
  }
})

const { setToken } = user.actions
const reducer = user.reducer

export {
  setToken
}
export default reducer