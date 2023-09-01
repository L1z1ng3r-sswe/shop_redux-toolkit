import { Estatus, TInitialState, TTodos } from "./type";
import axios from "axios";
import { todosAPI } from "../../../utiles/consts";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TTodos[]>(todosAPI);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk<
  TTodos,
  TTodos,
  { rejectValue: string }
>("todos/addTodo", async (credential, { rejectWithValue }) => {
  try {
    const response = await axios.post<TTodos>(todosAPI, credential);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editCategoryTodos = createAsyncThunk<
  TTodos,
  { category: string; id: number },
  { rejectValue: string }
>(
  "todos/editCategoryTodos",
  async function ({ category, id }, { rejectWithValue }) {
    try {
      const { data } = await axios.patch<TTodos>(`${todosAPI}/${id}`, {
        category,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodos = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("todos/deleteTodos", async function (id, { rejectWithValue }) {
  try {
    await axios.delete(`${todosAPI}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: TInitialState = {
  todos: [],
  status: Estatus.idle,
  error: null,
};

export const crudSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = Estatus.loading;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<TTodos[]>) => {
        state.status = Estatus.idle;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = Estatus.error;
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = Estatus.loading;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.status = Estatus.idle;
        state.todos.push(payload);
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        state.status = Estatus.error;
        state.error = payload;
      })
      .addCase(editCategoryTodos.pending, (state) => {
        state.status = Estatus.loading;
        state.error = null;
      })
      .addCase(editCategoryTodos.fulfilled, (state, { payload }) => {
        state.status = Estatus.idle;
        const index = state.todos.findIndex((todo) => todo.id === payload.id);
        if (index !== -1) {
          state.todos[index] = payload;
        }
        state.error = null;
      })
      .addCase(editCategoryTodos.rejected, (state, { payload }) => {
        state.status = Estatus.error;
        state.error = payload;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.status = Estatus.loading;
        state.error = null;
      })
      .addCase(deleteTodos.fulfilled, (state, { payload }) => {
        state.status = Estatus.idle;
        state.todos = state.todos.filter((todo) => todo.id !== payload);
        state.error = null;
      })
      .addCase(deleteTodos.rejected, (state, { payload }) => {
        state.status = Estatus.error;
        state.error = payload;
      });
  },
});

export default crudSlice.reducer;
