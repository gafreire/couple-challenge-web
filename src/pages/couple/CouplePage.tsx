/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { coupleService } from "../../services/couple.service";
import { useAppCache } from "../../store/appCache";
import ActiveCouple from "./components/ActiveCouple";
import NoCouple from "./components/NoCouple";
import PendingInvite from "./components/PendingInvite";
import ReceivedInvite from "./components/ReceivedInvite";

const CouplePage = () => {
  const cache = useAppCache();

  const hasCache = cache.coupleData !== null || cache.pendingCouple !== null || cache.invites.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      try {
        const coupleResponse = await coupleService.getMyCouple();
        cache.setCouple({ coupleData: coupleResponse, pendingCouple: null, invites: [] });
      } catch (coupleError) {
        if (
          axios.isAxiosError(coupleError) &&
          (coupleError.response?.status === 404 || coupleError.response?.status === 400)
        ) {
          try {
            const pendingCoupleResponse = await coupleService.getMyPendingCouple();
            cache.setCouple({ coupleData: null, pendingCouple: pendingCoupleResponse, invites: [] });
          } catch {
            const invitesResponse = await coupleService.listInvites();
            cache.setCouple({ coupleData: null, pendingCouple: null, invites: invitesResponse });
          }
        } else {
          throw coupleError;
        }
      }
    } catch (err) {
      if (!silent) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(hasCache);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { coupleData, pendingCouple, invites } = cache;

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