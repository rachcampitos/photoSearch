// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./reducers/images";
import alertReducer from "./reducers/alertReducer";

const store = configureStore({
  reducer: {
    images: imagesReducer,
    alerts: alertReducer,
  },
});

export default store;
