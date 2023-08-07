import axios from "axios";

const getCurrentLocation = async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  return { lat, lon };
};

const getDataForCurrentLocation = async (url) => {
  const data = await axios.get(url);
  return data;
};

const locationServices = {
  getCurrentLocation,
  getDataForCurrentLocation,
};

export default locationServices;
