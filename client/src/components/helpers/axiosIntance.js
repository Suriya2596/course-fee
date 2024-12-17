import axios from "axios";

export const baseURL =
  import.meta.env.VITE_BASE_URL && import.meta.env.VITE_BASE_URL;

export const axiosIntance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json, text/plain, /",
    "Content-Type": "application/json",
  },
});