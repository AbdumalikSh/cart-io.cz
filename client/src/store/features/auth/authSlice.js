import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axios";

// Fetch User
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const { data } = await axiosInstance.get("/api/user/is-auth");
  return data;
});

// Fetch Seller
export const fetchSeller = createAsyncThunk("auth/fetchSeller", async () => {
  const { data } = await axiosInstance.get("/api/seller/is-auth");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isSeller: false,
    showUserLogin: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        } else {
          state.user = null;
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(fetchSeller.fulfilled, (state, action) => {
        state.isSeller = action.payload.success;
      })
      .addCase(fetchSeller.rejected, (state) => {
        state.isSeller = false;
      });
  },
});

export const { setUser, setShowUserLogin } = authSlice.actions;
export default authSlice.reducer;
