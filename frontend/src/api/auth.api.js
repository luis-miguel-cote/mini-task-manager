import api from "./axios";

export const registerRequest = (data) =>
  api.post("/register", data);

export const loginRequest = (data) =>
  api.post("/login", data);
