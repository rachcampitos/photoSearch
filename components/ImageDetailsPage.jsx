import React from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";

const ImageDetailsPage = ({ route }) => {
  const image = route.params.item; // Assume this contains the image URL
  console.log("detail", route.params.item);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: image }} style={styles.userImage} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Raul Campos</Text>
            <Text style={styles.userLocation}>Lima, Peru</Text>
          </View>
        </View>
        <Image source={{ uri: image }} style={styles.fullImage} />
      </View>
    </ScrollView>
  );
};

export default ImageDetailsPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 4, // rounded-sm
    maxWidth: 768, // max-w-md (adjust based on your design needs)
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
  fullImage: {
    width: "100%", // w-full
    height: 384, // h-96 (adjust this based on your design needs)
  },
});
