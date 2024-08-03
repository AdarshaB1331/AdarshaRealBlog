import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice.js";
const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
