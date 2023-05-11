import { configureStore } from "@reduxjs/toolkit";
import userStore from "./modules/userStore";
import counterStore from "./modules/counterStore";

export default configureStore({
  reducer: {
    userStore,
    counterStore
  }
})