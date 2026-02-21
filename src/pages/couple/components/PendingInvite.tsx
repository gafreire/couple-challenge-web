import React, { useState } from 'react';
import axios from 'axios';
import { coupleService } from '../../../services/couple.service';
import type { Couple } from '../../../types/couple.types';
import {
  Container,
  AnimatedIcon,
  Title,
  Subtitle,
  EmailBadge,
  CancelButton,
} from './PendingInvite.styles';
import { ErrorMessage } from './NoCouple.styles';

interface PendingInviteProps {
  pendingCouple: Couple;
}

const PendingInvite: React.FC<PendingInviteProps> = ({ pendingCouple }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');


  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await coupleService.cancelInvite(pendingCouple.id);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Erro ao cancelar convite');
      } else {
        setError('Erro inesperado ao cancelar convite');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <AnimatedIcon>📩</AnimatedIcon>
      <Title>Convite enviado!</Title>
      <Subtitle>Aguardando resposta do seu parceiro</Subtitle>
      <EmailBadge>
        {pendingCouple.invited_email}
      </EmailBadge>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <CancelButton onClick={handleCancel} disabled={isLoading}>
        {isLoading ? 'Cancelando...' : 'Cancelar convite'}
      </CancelButton>
    </Container>
  );
};

export default PendingInvite;