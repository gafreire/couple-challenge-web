export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profile_picture: string | null;
  couple_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  name?: string;
  profile_picture?: string | null;
}