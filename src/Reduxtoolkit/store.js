import { configureStore } from "@reduxjs/toolkit";
import booksData from "./UserSlice";

const store = configureStore({
  reducer: {
    bookStore: booksData,
  },
});

export default store;
