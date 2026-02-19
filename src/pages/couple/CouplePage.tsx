import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { coupleService } from "../../services/couple.service";
import type { CoupleWithUsers, InviteWithUser } from "../../types/couple.types";
import ActiveCouple from "./components/ActiveCouple";
import NoCouple from "./components/NoCouple";
import PendingInvite from "./components/PendingInvite";
import ReceivedInvite from "./components/ReceivedInvite";

const CouplePage = () => {
  const [coupleData, setCoupleData] = useState<CoupleWithUsers | null>(null);
  const [invites, setInvites] = useState<InviteWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const coupleResponse = await coupleService.getMyCouple();
          setCoupleData(coupleResponse);
        } catch (coupleError) {
          if (
            axios.isAxiosError(coupleError) &&
            coupleError.response?.status === 404
          ) {
            setCoupleData(null);
            const invitesResponse = await coupleService.listInvites();
            setInvites(invitesResponse);
          } else {
            throw coupleError;
          }
        }

      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || 'An error occurred');
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (coupleData) {
    if (coupleData.couple.status === "active") {
      return <ActiveCouple coupleData={coupleData} />;
    } else if (coupleData.couple.status === "pending") {
      if (user?.id === coupleData.couple.user_id_1) {
        return <PendingInvite coupleData={coupleData} />;
      } else {
        return <ReceivedInvite invites={invites} />;
      }
    }
  }

  return <NoCouple />;
};

export default CouplePage;
