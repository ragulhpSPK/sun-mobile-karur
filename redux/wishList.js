import { createSlice } from "@reduxjs/toolkit";

export const wishSlice = createSlice({
  name: "wish",
  initialState: { wishList: "", productid: "" },
  reducers: {
    setWishListDetails: (state, actions) => {
      state.wishList = actions.payload.WishList;
      state.productid = actions.payload.productId;
    },
  },
});

export const { setWishListDetails } = wishSlice.actions;
export default wishSlice.reducer;
