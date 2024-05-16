// redux/reducers/imagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images", // The name of the slice
  initialState: {
    imageUrls: [],
  },
  reducers: {
    addImageUrl: (state, action) => {
      // Directly mutate the state thanks to Immer
      state.imageUrls.push(action.payload);
    },
    // Add other reducers here as needed
  },
});

// Export the generated action creators
export const { addImageUrl } = imagesSlice.actions;
// Export the reducer
export default imagesSlice.reducer;
