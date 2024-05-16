import "react-native-reanimated";

import React from "react";
import Navigation from "@/services/Navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
}
