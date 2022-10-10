import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
//Import your slices below.

//Configure your store below.
const store = configureStore({
  reducer: { auth: authSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
