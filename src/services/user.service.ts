import type { UserProfile, UpdateProfileData } from "../types/user.types";
import api from "./api";

export const userService = {
  getProfile: async () => {
    const response = await api.get(`/users/me`);
    return response.data as UserProfile;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await api.put(`/users/me`, data);
    return response.data as UserProfile;
  },
};
