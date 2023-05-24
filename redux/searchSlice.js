import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searches: "",
  },

  reducers: {
    addSearch: (state, action) => {
      state.searches = action.payload;
    },

    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addSearch, reset } = searchSlice.actions;
export default searchSlice.reducer;
