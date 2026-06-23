export interface User {
  _id: string;
  name: string;
  email: string;
  role: "seeker" | "employer" | "admin";
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}