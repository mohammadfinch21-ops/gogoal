import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token") || null,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;