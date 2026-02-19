import type { Couple, CoupleWithUsers, InviteWithUser } from "../types/couple.types";
import api from "./api";

export const coupleService = {
    createCouple: async (invitedEmail: string) => {
        const response = await api.post(`/couples`, {
            invitedEmail
        });
        return response.data as Couple;
    },
    listInvites: async () => {
        const response = await api.get(`/couples/invites`);
        return response.data as InviteWithUser[];
    },
    getMyCouple: async () => {
        const response = await api.get(`/couples/me`);
        return response.data as CoupleWithUsers;
    },
    acceptInvite: async (coupleId: string) => {
        const response = await api.put(`/couples/${coupleId}/accept`);
        return response.data as Couple;
    },
    declineInvite: async (coupleId: string) => {
        const response = await api.put(`/couples/${coupleId}/decline`);
        return response.data as Couple;
    },
    cancelInvite: async (coupleId: string) => {
        const response = await api.delete(`/couples/${coupleId}`);
        return response.data;
    },
    leaveCouple: async () => {
        const response = await api.delete(`/couples/me`);
        return response.data;
    }
};
