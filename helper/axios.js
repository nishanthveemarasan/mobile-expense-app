import axios from "axios";
const API_URL = "https://nkitservice.com/expensetest/api";
export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAPI = async (url) => {
  return await API.get(url);
};

export const postAPI = async (url, data) => {
  return await API.post(url, data);
};
export const patchAPI = async (url, data) => {
  return await API.patch(url, data);
};
