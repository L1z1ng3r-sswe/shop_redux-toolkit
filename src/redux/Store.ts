import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./features/CrudSlice";

const store = configureStore({
  reducer: {
    todos: crudReducer,
  },
});

// Define a type for the root state
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;
