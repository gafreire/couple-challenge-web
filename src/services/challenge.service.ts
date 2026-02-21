import type { Challenge, ChallengeScore, PeriodType } from "../types/challenge.types";
import api from "./api";

export const challengeService = {
  createChallenge: async (
    name: string,
    start_date: string,
    end_date: string,
    period_type: PeriodType
  ) => {
    const response = await api.post(`/challenges`, {
      name,
      start_date,
      end_date,
      period_type,
    });
    return response.data as Challenge;
  },

  listChallenges: async () => {
    const response = await api.get(`/challenges`);
    return response.data as Challenge[];
  },

  getActiveChallenge: async () => {
    const response = await api.get(`/challenges/active`);
    return response.data as Challenge;
  },

  getChallengeScore: async (challengeId: string) => {
    const response = await api.get(`/challenges/${challengeId}/score`);
    return response.data as ChallengeScore;
  },

  finishChallenge: async (challengeId: string) => {
    const response = await api.put(`/challenges/${challengeId}/finish`);
    return response.data as Challenge;
  },
};
