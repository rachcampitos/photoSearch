import React from "react";
import { Pressable, View, usetheme } from "react-native";
import {
  HomeIcon,
  CameraIcon,
  SunIcon,
  MoonIcon,
  MapPinIcon,
  BellAlertIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/Context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={[
        styles.navbarContainer,
        theme === "dark" ? styles.darkNavbarContainer : null,
      ]}
    >
      <Pressable onPress={() => handlePress("Home")}>
        <HomeIcon
          style={
            theme === "light" ? styles.iconColorLight : styles.iconColorDark
          }
          size={28}
        />
      </Pressable>
      <Pressable onPress={() => handlePress("Map")}>
        <MapPinIcon
          style={
            theme === "light" ? styles.iconColorLight : styles.iconColorDark
          }
          size={28}
        />
      </Pressable>
      <Pressable onPress={() => handlePress("Camera")}>
        <CameraIcon
          style={
            theme === "light" ? styles.iconColorLight : styles.iconColorDark
          }
          size={28}
        />
      </Pressable>
      <Pressable onPress={() => handlePress("Alerts")}>
        <BellAlertIcon
          style={
            theme === "light" ? styles.iconColorLight : styles.iconColorDark
          }
          size={28}
        />
      </Pressable>
      <Pressable onPress={() => handlePress("Profile")}>
        <UserCircleIcon
          style={
            theme === "light" ? styles.iconColorLight : styles.iconColorDark
          }
          size={28}
        />
      </Pressable>
      <Pressable onPress={toggleTheme}>
        {theme === "light" ? (
          <SunIcon color="black" size={28} />
        ) : (
          <MoonIcon color="white" size={28} />
        )}
      </Pressable>
    </View>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbarContainer: {
    paddingHorizontal: 32, // 'px-8' in Tailwind to React Native conversion
    paddingVertical: 24, // 'py-6'
    backgroundColor: "#ffffff", // default light background
    flexDirection: "row", // flex-row
    alignItems: "center", // items-center
    justifyContent: "space-between", // justify-between
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1, // shadow-top implies negative vertical offset
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  darkNavbarContainer: {
    backgroundColor: "#374151", // Assume 'soft-dark' is similar to Tailwind's 'gray-700'
  },
  iconColorLight: {
    color: "black",
  },
  iconColorDark: {
    color: "white",
  },
});
