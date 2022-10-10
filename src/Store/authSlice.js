import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, loggedInUser: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload.user;
      console.log(state, state.loggedInUser, state.isLoggedIn, "this is state");
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
