import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchGeocoding = async (query) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 10,
          appid: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//Location coordinates for user, else defaults to Lagos, Nigeria
export const defaultCoords = { lat: 6.5244, lon: 3.3792 }; // Lagos fallback

export const getUserLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(defaultCoords);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => resolve(defaultCoords),
        { timeout: 5000, enableHighAccuracy: true }
      );
    }
  });
};
