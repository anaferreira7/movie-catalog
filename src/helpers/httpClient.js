import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_API_ACCESS_TOKEN}`,
  },
});

// ✅ Use an interceptor to append `api_key` to each request dynamically
httpClient.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  config.params.api_key = process.env.VUE_APP_API_KEY;
  return config;
});

// ✅ Use paramsSerializer to ensure arrays are formatted as a comma-separated string
httpClient.defaults.paramsSerializer = (params) => {
  return new URLSearchParams(params).toString();
};

// ✅ Handle 401 errors gracefully
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
