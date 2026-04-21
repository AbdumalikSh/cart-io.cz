import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (cartItems, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/cart/update", { cartItems });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
  },

  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload || {};
    },
    addToCart: (state, action) => {
      const id = action.payload;
      state.cartItems[id] = (state.cartItems[id] || 0) + 1;
      toast.success("Added to Cart");
    },
    updateCartItem: (state, action) => {
      const { itemId, quantity } = action.payload;
      state.cartItems[itemId] = quantity;
      toast.success("Cart Updated");
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state.cartItems[id]) {
        state.cartItems[id]--;

        if (state.cartItems[id] === 0) {
          delete state.cartItems[id];
        }
      }
      toast.success("Removed from Cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(syncCart.rejected, (_, action) => {
        toast.error(action.payload || action.error.message);
      });
  },
});

// Selectors
export const getCartCount = (state) =>
  Object.values(state.cart.cartItems).reduce((a, b) => a + b, 0);

export const getCartAmount = (state) => {
  const { cartItems } = state.cart;
  const { products } = state.product;

  let total = 0;

  for (const id in cartItems) {
    const product = products.find((p) => p._id === id);
    if (product) {
      total += product.offerPrice * cartItems[id];
    }
  }

  return Math.floor(total * 100) / 100;
};

export const { addToCart, updateCartItem, removeFromCart, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
