import axios from "axios";

const api = axios.create({
    baseURL: "https://assignment-02-01-2026-2.onrender.com/api",
});

export default api;
