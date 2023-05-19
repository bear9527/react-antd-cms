import { configureStore } from "@reduxjs/toolkit";
import userStore from "./modules/userStore";
import counterStore from "./modules/counterStore";
import categoryStore from "./modules/categoryStore";

export default configureStore({
  reducer: {
    userStore,
    counterStore,
    categoryStore
  }
})