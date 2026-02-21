import React, { useState } from "react";
import axios from "axios";
import type { InviteWithUser } from "../../../types/couple.types";
import { coupleService } from "../../../services/couple.service";
import {
  Container,
  InviteCard,
  Avatar,
  InviterName,
  InviteMessage,
  ButtonGroup,
  AcceptButton,
  DeclineButton,
} from "./ReceivedInvite.styles";
import { ErrorMessage } from "./NoCouple.styles";

const ReceivedInvite = ({ invites }: { invites: InviteWithUser[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleAccept = async (coupleId: string) => {
    setLoadingId(coupleId);
    try {
      await coupleService.acceptInvite(coupleId);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Erro ao aceitar convite");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDecline = async (coupleId: string) => {
    setLoadingId(coupleId);
    try {
      await coupleService.declineInvite(coupleId);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Erro ao recusar convite");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Container>
      {invites.map((invite) => (
        <InviteCard key={invite.couple.id}>
          <Avatar>{invite.user_1.name.charAt(0)}</Avatar>
          <InviterName>{invite.user_1.name}</InviterName>
          <InviteMessage>quer ser seu parceiro(a)!</InviteMessage>
          <ButtonGroup>
            <AcceptButton
              onClick={() => handleAccept(invite.couple.id)}
              disabled={loadingId === invite.couple.id}
            >
              Aceitar
            </AcceptButton>
            <DeclineButton
              onClick={() => handleDecline(invite.couple.id)}
              disabled={loadingId === invite.couple.id}
            >
              Recusar
            </DeclineButton>
          </ButtonGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InviteCard>
      ))}
    </Container>
  );
};

export default ReceivedInvite;
