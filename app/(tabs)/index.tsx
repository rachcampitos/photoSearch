import React from "react";
import { View, StyleSheet } from "react-native";
import Navigation from "@/services/Navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <View style={theme === "dark" ? styles.darkContainer : styles.container}>
      <Navigation />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#ffffff", // Light background color
    height: "100%",
  },
  darkContainer: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#333333", // Dark background color
    height: "100%",
  },
});
