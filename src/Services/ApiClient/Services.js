import useTokenStore from "@/stores/TokenStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = () => {
  const { accessToken } = useTokenStore.getState();
  if (accessToken) {
    const { exp } = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    // console.log("exp: ", exp, " now: ", currentTime, exp - currentTime);
    return exp - currentTime <= 24;
  }
  return false;
};

const RefreshToken = async () => {
  const { accessToken, refreshToken, updateAccessToken } =
    useTokenStore.getState();
  if (accessToken) {
    if (isTokenExpired()) {
      // console.log("meow", refreshToken)
      const r = await apiClient.post("/auth/token/refresh/", {
        refresh: refreshToken,
      });
      // console.log("get access token here1: ", refreshToken);
      // console.log("get access token here2: ", r.data.access);
      updateAccessToken(r.data.access);
    }
  }
};

// export const baseURL = "https://bombfundingbackend.liara.run";
export const baseURL = "http://104.168.46.4:8000";
// export const baseURL = "https://miliisawesome.duckdns.org";

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    // Authorization:""
  },
});

// Optional: Add interceptors to handle requests/responses globally
// This is useful for logging, error handling, or adding authorization tokens dynamically

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Modify the config before the request is sent, e.g., attach token
    //  const token = localStorage.getItem('token');
    const token = useTokenStore.getState()?.accessToken;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMzY3NDc1LCJpYXQiOjE3MzIzNjM4NzUsImp0aSI6IjI2NjU0YzMzMzIwMzQyYjhiOTVlZDhiNjkxZDBhOTg5IiwidXNlcl9pZCI6M30.53XrPqzf9jmSdZBnZwZP8_Ggk8GfN4HbSgPYe4-Hux4";
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle errors in the request
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any response status code 2xx is handled here
    return response;
  },
  (error) => {
    // Handle response errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // No response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export const getData = async (endPoint, headers) => {
  await RefreshToken();
  if (headers) {
    try {
      const response = await apiClient.get(endPoint, headers);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  try {
    const response = await apiClient.get(endPoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDataParams = async (endPoint, headers, params) => {
  await RefreshToken();
  try {
    const response = await apiClient.get(endPoint, {
      headers,
      params: { ...params },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postData = async (endPoint, data, additionalHeaders) => {
  await RefreshToken();
  try {
    const response = await apiClient.post(endPoint, data, additionalHeaders);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postImageData = async (endPoint, formData) => {
  await RefreshToken();
  try {
    const response = await apiClient.post(endPoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const patchData = async (endPoint, data, additionalHeaders) => {
  await RefreshToken();
  try {
    const response = await apiClient.patch(endPoint, data, additionalHeaders);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const putData = async (endPoint, data) => {
  await RefreshToken();
  try {
    const response = await apiClient.put(endPoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteData = async (endPoint, data, additionalHeaders) => {
  await RefreshToken();
  try {
    const response = await apiClient.delete(
      endPoint,
      { data },
      additionalHeaders
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
