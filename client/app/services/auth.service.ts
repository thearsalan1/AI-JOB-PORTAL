import api from "../lib/axios";

export const loginUser = async (data: { email: string; password: string }) => {
  console.log("login hit");

  const user = await api.post("/auth/login", data);
  console.log("log reach");

  return user;
};

export const registerUser = async (data: {
  email: string;
  name: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post("/auth/forget-password", data);
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const response = await api.post("/auth/reset-password", data);
  return response;
};
