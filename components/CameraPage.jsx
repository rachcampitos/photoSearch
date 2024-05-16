import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PhotoDetailsScreen from "@/components/PhotoDetailsScreen";

const CameraPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      navigation.navigate("PhotoDetailsScreen", { capturedImage: photo.uri });
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setCapturedImage(uri);
      navigation.navigate("PhotoDetailsScreen", { capturedImage: uri });
    } else {
      console.log("Image picker was cancelled or no image was selected.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing="back" />
      <View style={styles.libraryButtonContainer}>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.libraryButton}
        >
          <Text style={styles.libraryButtonText}>Select from Library</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.takePhotoButtonContainer}>
        <TouchableOpacity
          onPress={handleTakePhoto}
          style={styles.takePhotoButton}
        >
          <FontAwesome name="camera" size={38} color="white" />
        </TouchableOpacity>
      </View>
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  libraryButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  libraryButton: {
    backgroundColor: "#fff",
    padding: 10,
  },
  libraryButtonText: {
    color: "#000",
  },
  takePhotoButtonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  takePhotoButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
  },
  permissionButtonText: {
    color: "#000",
  },
  previewImage: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 150,
    right: 20,
  },
});

export default CameraPage;
