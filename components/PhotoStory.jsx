import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchRandomPhotos } from "@/services/PhotoService";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/Context/ThemeContext"; // Import your theme context

const PhotoStory = () => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const { theme } = useTheme(); // Use theme from your context

  useEffect(() => {
    fetchRandomPhotos(10)
      .then((photos) => setRandomPhotos(photos))
      .catch((error) => console.error("Error fetching random photos:", error));
  }, []);

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const styles = getStyles(theme); // Get styles based on the theme

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: item.user.profile_image.small }}
          style={styles.userImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userLocation}>{item.user.location}</Text>
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
      <FlatList
        data={randomPhotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

export default PhotoStory;

// Dynamic styles based on the theme
const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1f1f22" : "#f1f1f1",
    },
    container: {
      backgroundColor: theme === "dark" ? "#333333" : "#ffffff", // Dark or light background
      borderRadius: 4,
      maxWidth: 768,
      marginBottom: 40,
    },
    userContainer: {
      flexDirection: "row",
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    userImage: {
      height: 32,
      width: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 2,
      color: theme === "dark" ? "#fff" : "#000", // Text color based on theme
    },
    userLocation: {
      fontSize: 12,
      color: theme === "dark" ? "#aaa" : "#4b5563", // Adjusted for better visibility in dark mode
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
      color: theme === "dark" ? "#fff" : "#000", // Text color based on theme
    },
  });
