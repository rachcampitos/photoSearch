import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchCollectionPhotos } from "@/services/PhotoService";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/Context/ThemeContext"; // Ensure this is the correct import path

const PhotoList = ({ route }) => {
  const [photos, setPhotos] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();
  const { theme } = useTheme(); // Destructure theme from your theme context

  if (category === undefined) {
    navigation.navigate("Home");
    return null;
  }

  useEffect(() => {
    fetchCollectionPhotos(category)
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, [category]);

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const styles = getStyles(theme); // Dynamic styles based on the theme

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
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
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

export default PhotoList;

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1f1f1f" : "#f1f1f1", // Adjust the safe area background
    },
    container: {
      backgroundColor: theme === "dark" ? "#333333" : "#ffffff", // Adjust the container background
      borderRadius: 4,
      maxWidth: 768,
      marginBottom: 40,
      paddingVertical: 16, // Add padding to the container
    },
    userInfoContainer: {
      flexDirection: "row",
      marginBottom: 12,
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
      color: theme === "dark" ? "#ffffff" : "#000000", // Adjust text color based on theme
    },
    userLocation: {
      fontSize: 12,
      color: theme === "dark" ? "#aaaaaa" : "#4b5563", // Adjust location color based on theme
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
      width: 100, // Give specific width to keep icons aligned
      justifyContent: "space-between", // Space out icons evenly
    },
    likes: {
      fontWeight: "600",
      fontSize: 14,
      paddingHorizontal: 16,
      marginTop: 8,
      marginBottom: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },
  });
