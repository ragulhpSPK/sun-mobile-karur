import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import userSlice from "./userSlice";
import loaderReducer from "./loadingSlice";
import wishListSlice from "./wishList";

export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    user: userSlice,
    loader: loaderReducer,
    wish: wishListSlice,
  },
});
