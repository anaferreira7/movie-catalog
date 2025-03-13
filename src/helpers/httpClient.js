import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_API_ACCESS_TOKEN}`,
  },
});

httpClient.defaults.params = {
  api_key: process.env.VUE_APP_API_KEY,
};

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default httpClient;
