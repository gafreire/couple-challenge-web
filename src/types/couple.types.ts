export type CoupleStatus = 'pending' | 'active' | 'inactive' | 'cancelled';

export interface Couple {
  id: string;
  user_id_1: string;
  user_id_2: string | null;
  invited_email: string | null;
  invited_at: string | null;
  status: CoupleStatus;
  couple_photo: string | null;
  created_at: string;
  updated_at: string;
}

export interface CoupleUser {
  id: string;
  name: string;
  profile_picture: string | null;
}

export interface CoupleWithUsers {
  couple: Couple;
  user_1: CoupleUser;
  user_2: CoupleUser | null;
}

export interface InviteWithUser {
  couple: Couple;
  user_1: CoupleUser;
}