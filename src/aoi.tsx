import axios from "axios";
import type { User, Weather } from "./types";

export const fetchUsers = async ():Promise<User[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}

export const fetchUserDetail = async (id: string): Promise<User> => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.data
}

export const fetchWeather = async (city: string): Promise<Weather> => {
    const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=aa9877d85b324c18966135657231402&lat=-37.3159&lon=81.1496&aqi=yes&q=${city}`)
    return res.data;
}

export const getCountryFromCoords = async (lat: string, lng: string) => {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const data = await res.data;
  return data.address.country;
};

