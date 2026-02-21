import { useState, useEffect } from "react";
import axios from "axios";
import { coupleService } from "../../services/couple.service";
import type {
  Couple,
  CoupleWithUsers,
  InviteWithUser,
} from "../../types/couple.types";
import ActiveCouple from "./components/ActiveCouple";
import NoCouple from "./components/NoCouple";
import PendingInvite from "./components/PendingInvite";
import ReceivedInvite from "./components/ReceivedInvite";

const CouplePage = () => {
  const [coupleData, setCoupleData] = useState<CoupleWithUsers | null>(null);
  const [pendingCouple, setPendingCouple] = useState<Couple | null>(null);
  const [invites, setInvites] = useState<InviteWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            (coupleError.response?.status === 404 ||
              coupleError.response?.status === 400)
          ) {
            try {
              setCoupleData(null);
              const pendingCoupleResponse =
                await coupleService.getMyPendingCouple();
              setPendingCouple(pendingCoupleResponse);
            } catch {
              setCoupleData(null);
              const invitesResponse = await coupleService.listInvites();
              setInvites(invitesResponse);
            }
          } else {
            throw coupleError;
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "An error occurred");
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

  if (coupleData?.couple.status === "active") {
    return <ActiveCouple coupleData={coupleData} />;
  }

  if (pendingCouple) {
    return <PendingInvite pendingCouple={pendingCouple} />;
  }

  if (invites.length > 0) {
    return <ReceivedInvite invites={invites} />;
  }

  return <NoCouple />;
};

export default CouplePage;
