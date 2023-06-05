import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import userSlice from "./userSlice";
import loaderReducer from "./loadingSlice";
import colorsSlice from "./colorSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    user: userSlice,
    loader: loaderReducer,
    colors: colorsSlice,
  },
});
