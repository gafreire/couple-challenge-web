import { useState } from "react";
import axios from "axios";
import { Heart, Calendar } from "lucide-react";
import type { CoupleWithUsers } from "../../../types/couple.types";
import { coupleService } from "../../../services/couple.service";
import {
  Container,
  CoupleCard,
  MembersRow,
  MemberCard,
  Avatar,
  MemberName,
  HeartWrapper,
  Divider,
  DateSection,
  DateLabel,
  DateValue,
  LeaveButton,
  ErrorMessage,
} from "./ActiveCouple.styles";

const ActiveCouple = ({ coupleData }: { coupleData: CoupleWithUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLeave = async () => {
    if (!window.confirm("Tem certeza que deseja sair do casal?")) return;

    setIsLoading(true);
    setError("");

    try {
      await coupleService.leaveCouple();
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Erro ao sair do casal");
      } else {
        setError("Erro ao sair do casal");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const daysTogether = Math.floor(
    (new Date().getTime() - new Date(coupleData.couple.created_at).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const { couple, user_1, user_2 } = coupleData;

  return (
    <Container>
      <CoupleCard>
        <MembersRow>
          <MemberCard>
            <Avatar>{user_1.name.charAt(0).toLowerCase()}</Avatar>
            <MemberName>{user_1.name}</MemberName>
          </MemberCard>

          <HeartWrapper>
            <Heart size={22} fill="#E63946" />
          </HeartWrapper>

          <MemberCard>
            <Avatar>
              {user_2 ? user_2.name.charAt(0).toLowerCase() : "?"}
            </Avatar>
            <MemberName>{user_2 ? user_2.name : "Pendente"}</MemberName>
          </MemberCard>
        </MembersRow>

        <Divider />

        <DateSection>
          <DateLabel>
            <Calendar size={12} /> Juntos desde
          </DateLabel>
          <DateValue>{formatDate(couple.created_at)}</DateValue>
          <DateLabel style={{ marginTop: 4 }}>
            🗓️ {daysTogether} dias juntos
          </DateLabel>
        </DateSection>

        <LeaveButton onClick={handleLeave} disabled={isLoading}>
          <Heart size={14} fill="#E63946" />
          {isLoading ? "Saindo..." : "Sair do Casal"}
        </LeaveButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CoupleCard>
    </Container>
  );
};

export default ActiveCouple;
