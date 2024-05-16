import React, { useState } from "react";
import { View, Image, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { addImageUrl } from "../redux/reducers/images";
import { addAlert } from "../redux/actions/alertActions";

const PhotoDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();

  const { capturedImage } = route.params;
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", "hgztjmtu");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dml5vqnmu/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploading(false);
      Alert.alert("Upload Successful", "Your image has been uploaded.");
      navigation.navigate("Profile", { imageUrl: response.data.url });
      dispatch(addImageUrl(response.data.url));
      dispatch(
        addAlert({ type: "success", message: "Image uploaded successfully!" })
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the image."
      );
      dispatch(addAlert({ type: "error", message: "Failed to upload image." }));
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: capturedImage }}
        style={styles.fullImage}
        resizeMode="contain"
      />
      <Button
        title={uploading ? "Uploading..." : "Upload Image"}
        onPress={() => uploadImage(capturedImage)}
        disabled={uploading}
        color="#6a51ae" // You can change the button color as per your design
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
});

export default PhotoDetailsScreen;
