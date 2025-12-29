import { create } from "zustand";
import api from "../services/api";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const useAuthStore = create((set) => ({
  user: userFromStorage || null,

  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(data));
    set({ user: data });
  },

  register: async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(data));
    set({ user: data });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;
