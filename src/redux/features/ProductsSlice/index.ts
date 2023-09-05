import axios from "axios";
import { LIMIT, productsAPI } from "../../../utiles/consts";
import {
  EStatus,
  TInitialState,
  TProduct,
  ECategory,
  EditedProduct,
} from "./types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<
  TProduct[],
  void,
  { rejectValue: string }
>("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(productsAPI);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const getOneProduct = createAsyncThunk<
  TProduct,
  number,
  { rejectValue: string }
>("getOneProduct/products", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get(`${productsAPI}/${id}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("products/deleteProducts", async function (id, { rejectWithValue }) {
  try {
    await axios.delete(`${productsAPI}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const addProduct = createAsyncThunk<
  TProduct,
  TProduct,
  { rejectValue: string }
>("products/addProduct", async function (credential, { rejectWithValue }) {
  try {
    const { data } = await axios.post(productsAPI, credential);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});

export const editProduct = createAsyncThunk<
  TProduct,
  EditedProduct,
  { rejectValue: string }
>(
  "products/editProduct",
  async function ({ id, updatedProduct }, { rejectWithValue }) {
    try {
      const { data } = await axios.patch(
        `${productsAPI}/${id}`,
        updatedProduct
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

const initialState: TInitialState = {
  products: [],
  status: EStatus.idle,
  error: null,
  oneProduct: null,
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.status = EStatus.idle;
        state.products = payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.status = EStatus.idle;
        state.products = state.products.filter((item) => item.id !== payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.status = EStatus.idle;
        state.products = [...state.products, payload];
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(getOneProduct.fulfilled, (state, { payload }) => {
        state.status = EStatus.idle;
        state.oneProduct = payload;
        state.error = null;
      })
      .addCase(getOneProduct.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = EStatus.loading;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, { payload }) => {
        state.status = EStatus.idle;
        state.products = state.products.map((item) =>
          item.id === payload.id ? payload : item
        );
        const data = state.products.map((item) => {
          if (item.id === payload.id) {
            return payload;
          } else {
            return item;
          }
        });
        state.products = data;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, { payload }) => {
        state.status = EStatus.error;
        state.error = payload;
      });
  },
});

export default ProductsSlice.reducer;
