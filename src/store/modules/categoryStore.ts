import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit"
import {
  getAllCategory
} from "@/api/category";

const counter = createSlice({
  name: 'categoryStore',
  initialState: {
    count: 1,
    categoryList: []
  },
  reducers: {
    add(state){
      state.count++
    },
    setCategoryList(state, actions){
      console.log('actions',...actions.payload);
      state.categoryList = actions.payload
    },
  }
})

const { add, setCategoryList } = counter.actions
const reducer = counter.reducer




const getTopCateList = () => {
  // try {
    // const res = await getAllCategory({
    //   cate_id: 0
    // });
    // if (res.data) {
      // cateState.list = [...res.data];
      // setCateState({ list: [...cateState.list] });
      // console.log("setCateList", cateState);
      // dispatch(setCategoryList(res.data))
    // }
      return async (dispatch:any) => {
        const res = await getAllCategory({
          categoryId: 1
        });
        dispatch(setCategoryList(res.data))
      }

  // } catch (error) {}
};

export { add, getTopCateList }
export default reducer