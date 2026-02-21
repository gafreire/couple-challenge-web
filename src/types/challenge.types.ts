export type PeriodType = "mensal" | "trimestral" | "semestral" | "anual";

export type ChallengeStatus = "active" | "completed" | "cancelled";

export interface Challenge {
  id: string;
  couple_id: string;
  name: string;
  start_date: string;
  end_date: string;
  period_type: PeriodType;
  status: ChallengeStatus;
  winner_id: string | null;
  winner_score: number | null;
  loser_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface ChallengeScore {
  user_id_1: string;
  user_id_1_score: number;
  user_id_1_tasks: number;
  user_id_2: string | null;
  user_id_2_score: number;
  user_id_2_tasks: number;
}
