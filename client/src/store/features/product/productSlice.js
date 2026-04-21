import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axiosInstance.get("/api/product/list");
    return data;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.products = action.payload.products;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(fetchProducts.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  },
});

export default productSlice.reducer;
