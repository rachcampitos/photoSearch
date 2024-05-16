import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchUserPhotos, fetchUserProfile } from "@/services/PhotoService";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/Context/ThemeContext";

const ProfilePage = () => {
  const navigation = useNavigation();
  const imageUrls = useSelector((state) => state.images.imageUrls);
  const { theme } = useTheme(); // Destructure theme from your theme context

  const [userProfile, setUserProfile] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    fetchUserProfile()
      .then((response) => {
        setUserProfile(response);
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  }, []);

  useEffect(() => {
    fetchUserPhotos()
      .then((response) => {
        setUserPhotos(response);
      })
      .catch((error) => console.error("Error fetching user photos:", error));
  }, []);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const styles = getStyles(theme);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: item.user.profile_image.small }}
          style={styles.userImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userBio}>{item.user.location}</Text>
        </View>
      </View>
      <Image source={{ uri: item.urls.regular }} style={styles.photo} />
      <View style={styles.iconRow}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={toggleLike}>
            {liked ? (
              <Ionicons
                name="heart"
                size={24}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            ) : (
              <FontAwesome6
                name="heart"
                size={24}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            )}
          </TouchableOpacity>
          <FontAwesome6
            name="message"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
          />
          <FontAwesome6
            name="share"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </View>
        <FontAwesome6
          name="flag"
          size={24}
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {userProfile && (
        <View style={styles.userContainer}>
          <Image
            source={{ uri: userProfile.profile_image.small }}
            style={styles.mainUserImage}
          />
          <View style={styles.userInfoSection}>
            <View style={styles.userStats}>
              <FontAwesome6
                name="user"
                size={20}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text style={styles.statsText}>{userProfile.username}</Text>
              <Text style={styles.statsLabel}>Username</Text>
            </View>
            <View style={styles.userStats}>
              <FontAwesome6
                name="map-pin"
                size={20}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text style={styles.statsText}>{userProfile.location}</Text>
              <Text style={styles.statsLabel}>Location</Text>
            </View>
            <View style={styles.userStats}>
              <FontAwesome6
                name="heart"
                size={20}
                color={theme === "dark" ? "#fff" : "#000"}
              />
              <Text style={styles.statsText}>{userProfile.total_likes}</Text>
              <Text style={styles.statsLabel}>Total Likes</Text>
            </View>
          </View>
        </View>
      )}
      <FlatList
        data={userPhotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1f1f1f" : "#f1f1f1",
    },
    container: {
      backgroundColor: theme === "dark" ? "#333333" : "#ffffff", // Adjust the container background
      borderRadius: 4,
      maxWidth: 768,
      marginBottom: 40,
    },
    topContainer: {
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor: theme === "dark" ? "#333333" : "#fff", // Adjusted for theme
    },
    userContainer: {
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 12,
      marginBottom: 10,
      backgroundColor: theme === "dark" ? "#333333" : "#fff", // Adjusted for theme
    },
    mainUserImage: {
      height: 64,
      width: 64,
      borderRadius: 32,
      marginBottom: 8,
    },
    userImage: {
      height: 32,
      width: 32,
      borderRadius: 32,
      marginBottom: 8,
    },
    userDetails: {
      flex: 1,
      marginLeft: 10, // Added margin for better spacing
    },
    userName: {
      fontSize: 14,
      fontWeight: "600",
      color: theme === "dark" ? "#fff" : "#000", // Text color based on theme
    },
    userBio: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme === "dark" ? "#aaa" : "#4b5563", // Adjust text color for theme
    },
    userInfoSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 30, // pr-20
      flex: 1,
      backgroundColor: theme === "dark" ? "#333333" : "#fff",
    },
    userStats: {
      justifyContent: "center",
      alignItems: "center",
    },
    statsText: {
      color: theme === "dark" ? "#ffffff" : "#000", // Adjust text color for theme
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 8, // mt-2
    },
    statsLabel: {
      fontSize: 12, // text-xs
      color: theme === "dark" ? "#ccc" : "#333", // Adjust label color for theme
    },
    photo: {
      width: "100%",
      height: 384,
    },
    iconRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      marginTop: 12,
      marginBottom: 8,
    },
    icons: {
      flexDirection: "row",
      gap: 20,
    },
    likes: {
      fontWeight: "600",
      fontSize: 14,
      paddingHorizontal: 16,
      marginTop: 8,
      marginBottom: 16,
      color: theme === "dark" ? "#fff" : "#000", // Adjust text color based on theme
    },
  });
