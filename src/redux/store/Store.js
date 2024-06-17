import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../CartSlice.js";
import authReducer from '../AuthSlice.js'
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
export default Store;
