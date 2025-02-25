import axios from "axios";

const baseURL = "https://be-fas.msdm.app/api/v1";
// const baseURL = "https://5642-180-254-75-233.ngrok-free.app/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // We can add token here in the future
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      console.error("Server Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.request);
      return Promise.reject({ message: "Network error occurred" });
    } else {
      // Error in request setup
      console.error("Request Error:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
