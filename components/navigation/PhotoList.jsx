import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { fetchCollectionPhotos } from "@/services/PhotoService";
import { FontAwesome6 } from "@expo/vector-icons";

const PhotoList = ({ route }) => {
  const [photos, setPhotos] = useState([]);
  const { category } = route.params;
  const navigation = useNavigation();

  if (category === undefined) {
    navigation.navigate("Home");
    return null;
  }

  useEffect(() => {
    fetchCollectionPhotos(category)
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, [category]);

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
          <FontAwesome6 name="heart" size={24} />
          <FontAwesome6 name="message" size={24} />
          <FontAwesome6 name="share" size={24} />
        </View>
        <FontAwesome6 name="flag" size={24} />
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 4, // rounded-sm
    maxWidth: 768, // max-w-md (adjust this based on your design needs)
    marginBottom: 40, // mb-10
  },
  userInfoContainer: {
    flexDirection: "row", // flex-row
    paddingHorizontal: 8, // px-2
    paddingVertical: 12, // py-3
  },
  userImage: {
    height: 32, // h-8
    width: 32, // w-8
    borderRadius: 16, // rounded-full
    marginRight: 8, // mr-2
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14, // text-sm
    fontWeight: "600", // font-semibold
    marginBottom: 2, // tight leading, approx.
  },
  userLocation: {
    fontSize: 12, // text-xs
    color: "#4b5563", // text-gray-600
  },
  photo: {
    width: "100%", // w-full
    height: 384, // h-96 (adjust this based on your design needs)
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16, // mx-4
    marginTop: 12, // mt-3
    marginBottom: 8, // mb-2
  },
  icons: {
    flexDirection: "row",
    gap: 20, // gap-5
  },
  likes: {
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
    paddingHorizontal: 16, // mx-4
    marginTop: 8, // mt-2
    marginBottom: 16, // mb-4
  },
});
