import axios from "axios";
const BASE_URL = import.meta.env.VITE_OMDB_API_URL
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export const ApiService = axios.create({
    baseURL: `${BASE_URL}?apikey=${API_KEY}`
})