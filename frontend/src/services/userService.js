import { apiRequest } from "./httpService";

export const getUsersForSidebar = () => {
  return apiRequest("/api/users");
};
