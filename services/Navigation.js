import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import HomePage from "@/components/HomePage";
import MapPage from "@/components/MapPage";
import CameraPage from "@/components/CameraPage";
import AlertsPage from "@/components/AlertsPage";
import PhotoList from "@/components/PhotoList";
import PhotoDetailsScreen from "@/components/PhotoDetailsScreen";
import ProfileStackNavigator from "./ProfileNavigator";
import Navbar from "@/components/NavBar";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="Alerts" component={AlertsPage} />
        <Stack.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PhotoList" component={PhotoList} />
        <Stack.Screen
          name="PhotoDetailsScreen"
          component={PhotoDetailsScreen}
        />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

export default Navigation;
