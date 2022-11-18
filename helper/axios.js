import axios from "axios";
const API_URL = "https://nkitservice.com/expensetest/";
export const CLIENT_CREDENTIAL_ID = "97c30364-75ab-4062-aead-f4cb698b81f7";
export const CLIENT_SECRET = "tBnsylQTkaii5sCrjtPusn2EUkY4hWLBFZgnlv0T";
export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAPI = async (url) => {
  return await API.get(`${url}`);
};

export const postAPI = async (url, data) => {
  return await API.post(url, data);
};
export const patchAPI = async (url, data) => {
  return await API.patch(url, data);
};
export const deleteAPI = async (url) => {
  return await API.delete(url);
};
export const sendGetAdminApi = (url, token) => {
  console.log(url);
  return API.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendPostAdminApi = (url, data, token) => {
  return API.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sendPatchAdminApi = (url, data, token) => {
  return API.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendDeleteAdminApi = (url, token) => {
  return API.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
