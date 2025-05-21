import axios from "axios";
// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

export default api;
