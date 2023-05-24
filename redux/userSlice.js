import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "useSlice",
  initialState: { user: Cookies.get("x-o-t-p") },
  reducers: {
    changeUserValues: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { changeUserValues } = userSlice.actions;
export default userSlice.reducer;
