import { apiRequest } from "./httpService";

export const loginUser = ({ identifier, password }) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
};

export const signupUser = ({ fullName, username, email, password, confirmPassword, gender }) => {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender }),
  });
};

export const logoutUser = () => {
  return apiRequest("/api/auth/logout", {
    method: "POST",
  });
};
