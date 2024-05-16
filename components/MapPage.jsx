import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fetchPhotosNearby } from "@/services/PhotoService";

const MapPage = () => {
  const [region, setRegion] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const getInitialLocationAndPhotos = async () => {
      setLoading(true);
      setError(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const initialRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(initialRegion);

        const fetchedPhotos = await fetchPhotosNearby(
          initialRegion.latitude,
          initialRegion.longitude
        );
        setPhotos(fetchedPhotos);
      } catch (err) {
        setError("Failed to fetch photos or location data.");
        console.error(err);
      }

      setLoading(false);
    };

    getInitialLocationAndPhotos();
  }, []);

  const handleMarkerPress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {photos.map((photo) => (
          <Marker
            key={photo.id}
            coordinate={{
              latitude: parseFloat(photo.latitude),
              longitude: parseFloat(photo.longitude),
            }}
            onPress={() => handleMarkerPress(photo)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: photo.imageUrl }} style={styles.image} />
            </View>
          </Marker>
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOuter}>
          <View style={styles.modalView}>
            <Image
              source={{ uri: selectedPhoto?.imageUrl }}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>{selectedPhoto?.title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  modalOuter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: 300, // Specify width to control modal size
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 250,
    height: 250,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MapPage;
