import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MapPage"
        options={{
          title: "MapPage",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "map" : "map-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CameraPage"
        options={{
          title: "CameraPage",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "camera" : "camera-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AlertsPage"
        options={{
          title: "AlertsPage",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "alert-circle" : "alert-circle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfilePage"
        options={{
          title: "ProfilePage",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "briefcase" : "briefcase-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
