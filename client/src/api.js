import axios from "axios";

const API_BASE = "https://panscience-storybook-server.onrender.com" || "http://localhost:8080";

export function setToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export const api = axios.create({ baseURL: `${API_BASE}/api` });

api.interceptors.request.use(cfg => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
