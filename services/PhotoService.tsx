// PhotoService.js
import axios from "axios";

const API_KEY = "Pi7B2B_H9oZHent4pW2eYYg8G9Xx9NhiIyq83w2NsB4"; // Replace with your actual Unsplash API key
const SECRET_KEY = "g3uaHnnz0kMIL76VsLPL3S3TW-dyu6IEB8UAA3R48Tw";

const flickrApiKey = "b78b977cca3cd47f53a6441f758e029d";

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/users/rachcampitos",
      {
        params: {
          client_id: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return [];
  }
};

export const fetchUserPhotos = async () => {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/users/rachcampitos/photos",
      {
        params: {
          client_id: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return [];
  }
};

export const fetchRandomPhotos = async (count: number) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        count,
        client_id: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
export const fetchCollectionPhotos = async (query: string) => {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos?per_page=30",
      {
        params: {
          client_id: API_KEY,
          query: query,
        },
      }
    );
    const photos = response.data.results;

    return photos;
    // Process the photos as needed (e.g., display them in your app)
  } catch (error) {
    console.error("Error fetching wedding photos:", error);
  }
};

export const fetchPhotosNearby = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get("https://api.flickr.com/services/rest/", {
      params: {
        method: "flickr.photos.search",
        api_key: flickrApiKey,
        lat: latitude,
        lon: longitude,
        format: "json",
        nojsoncallback: 1,
        radius: 1,
        extras: "geo, url_l",
        per_page: 50,
      },
    });

    if (
      !response.data ||
      !response.data.photos ||
      !response.data.photos.photo
    ) {
      console.error("Photo data is missing in the response", response.data);
      return [];
    }

    return response.data.photos.photo
      .filter(
        (photo: { latitude: any; longitude: any }) =>
          photo.latitude && photo.longitude
      )
      .map(
        (photo: {
          id: any;
          title: any;
          latitude: string;
          longitude: string;
          url_l: any;
        }) => ({
          id: photo.id,
          title: photo.title,
          latitude: parseFloat(photo.latitude),
          longitude: parseFloat(photo.longitude),
          imageUrl: photo.url_l,
        })
      );
  } catch (error) {
    console.error("Error fetching nearby photos", error);
    return [];
  }
};
