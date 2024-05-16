import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/Context/ThemeContext"; // Import useTheme from your theme context
import { fetchCollectionPhotos } from "@/services/PhotoService";
import PhotoStory from "@/components/PhotoStory";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Wedding");
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // Destructure theme from your theme context

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    const photos = await fetchCollectionPhotos(category);
    navigation.navigate("PhotoList", { category });
  };

  // Define dynamic styles based on the theme
  const styles = getStyles(theme);

  const categories = [
    { name: "Wedding", img: require("@/assets/images/wedding.jpg") },
    { name: "Outdoors", img: require("@/assets/images/outdoors.jpg") },
    { name: "Portraits", img: require("@/assets/images/portraits.jpeg") },
    { name: "Travel", img: require("@/assets/images/travel.jpeg") },
    { name: "Pets", img: require("@/assets/images/pets.jpeg") },
    { name: "Christmas", img: require("@/assets/images/christmas.jpeg") },
    { name: "Products", img: require("@/assets/images/products.jpeg") },
    { name: "Halloween", img: require("@/assets/images/halloween.jpeg") },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.collectionTitle}>Collections:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
          style={{ flex: 0 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              onPress={() => handleCategorySelect(category.name.toLowerCase())}
              style={styles.iconButton}
            >
              <Image source={category.img} style={styles.iconImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.storyTitle}>Today's feed:</Text>
      <PhotoStory />
    </View>
  );
}

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#1f1f22" : "#f1f1f1",
      paddingTop: 52,
    },
    collectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000",
      marginLeft: 10,
      marginBottom: 10,
    },
    scrollViewContainer: {
      height: 100,
      flex: 0,
      marginHorizontal: 10,
    },
    storyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000",
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 10,
    },
    iconButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme === "dark" ? "#666" : "#E5E5E5",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 40,
      marginTop: 15,
    },
    categoryText: {
      textAlign: "center",
      color: theme === "dark" ? "#fff" : "#000",
    },
  });
}
