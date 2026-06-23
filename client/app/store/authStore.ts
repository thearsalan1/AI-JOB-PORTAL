import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "seeker" | "employer" | "admin";
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        return {
          getItem: (name: string) => Cookies.get(name) ?? null,
          setItem: (name: string, value: string) => {
            Cookies.set(name, value, { expires: 7 });
          },
          removeItem: (name: string) => {
            Cookies.remove(name);
            return undefined;
          },
        };
      }),
    },
  ),
);
