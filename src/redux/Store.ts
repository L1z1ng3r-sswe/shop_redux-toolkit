import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./features/ProductsSlice";
import AuthReducer from "./features/AuthSlice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    auth: AuthReducer,
  },
});

// Define a type for the root state
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export function AppDispatch() {
  return useDispatch<RootDispatch>();
}
export default store;
