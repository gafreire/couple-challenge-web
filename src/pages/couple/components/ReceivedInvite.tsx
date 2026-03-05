import { useState } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';
import type { InviteWithUser } from '../../../types/couple.types';
import { coupleService } from '../../../services/couple.service';
import {
  Container,
  Card,
  AvatarWrapper,
  Avatar,
  HeartBadge,
  Title,
  Subtitle,
  AcceptButton,
  RejectButton,
  Tagline,
  ErrorMessage,
} from './ReceivedInvite.styles';

const ReceivedInvite = ({ invites }: { invites: InviteWithUser[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleAccept = async (coupleId: string) => {
    setLoadingId(coupleId);
    setError('');
    try {
      await coupleService.acceptInvite(coupleId);
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao aceitar convite');
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDecline = async (coupleId: string) => {
    setLoadingId(coupleId);
    setError('');
    try {
      await coupleService.declineInvite(coupleId);
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao recusar convite');
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Container>
      {invites.map((invite) => (
        <Card key={invite.couple.id}>
          <AvatarWrapper>
            <Avatar>{invite.user_1.name.charAt(0).toLowerCase()}</Avatar>
            <HeartBadge>
              <Heart size={11} fill="#fff" color="#fff" />
            </HeartBadge>
          </AvatarWrapper>

          <Title>{invite.user_1.name}</Title>
          <Subtitle>quer ser seu parceiro(a)!</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <AcceptButton
            onClick={() => handleAccept(invite.couple.id)}
            disabled={loadingId === invite.couple.id}
          >
            <Heart size={15} fill="#fff" color="#fff" />
            {loadingId === invite.couple.id ? 'Processando...' : 'Aceitar Convite'}
          </AcceptButton>

          <RejectButton
            onClick={() => handleDecline(invite.couple.id)}
            disabled={loadingId === invite.couple.id}
          >
            Recusar
          </RejectButton>

          <Tagline>Um novo desafio aguarda vocês</Tagline>
        </Card>
      ))}
    </Container>
  );
};

export default ReceivedInvite;