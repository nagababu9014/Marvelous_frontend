import api from "./axios";

export const loginUser = (data) =>
  api.post("users/login/", {
    ...data,
    guest_id: localStorage.getItem("guest_id"), // 🔥 IMPORTANT
  });

export const signupUser = (data) =>
  api.post("users/signup/", data);

export const logoutUser = () =>
  api.post("users/logout/", {
    refresh: localStorage.getItem("refresh"), // 🔥 IMPORTANT
  });
