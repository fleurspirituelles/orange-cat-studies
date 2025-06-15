import axios from "axios";
import { auth } from "../firebase/config";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  async (config) => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user) {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          delete config.headers.Authorization;
        }
        resolve(config);
      });
    });
  },
  (error) => Promise.reject(error)
);

export default api;