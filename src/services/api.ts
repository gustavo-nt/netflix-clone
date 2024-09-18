import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_TMDB_API_BASE,
  params: {
    api_key: process.env.VITE_TMDB_API_KEY,
    language: process.env.VITE_TMDB_API_LANGUAGE,
  },
});

export default api;
