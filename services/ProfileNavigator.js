// In ProfileStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "@/components/ProfilePage";
import ImageDetailsPage from "@/components/ImageDetailsPage"; // This would be your new detail view component

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfilePage}
        options={{ title: "User's Profile" }}
      />
      <ProfileStack.Screen
        name="ImageDetails"
        component={ImageDetailsPage}
        options={{ title: "Image Details" }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
