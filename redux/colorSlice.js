import { createSlice } from "@reduxjs/toolkit";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    primary: "",
    secondary: "",
  },
  reducers: {
    setColors: (state, action) => {
      state.primary = action.payload.primary;
      state.secondary = action.payload.secondary;
    },
  },
});

export const { setColors } = colorsSlice.actions;
export default colorsSlice.reducer;
