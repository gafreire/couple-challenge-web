import React, { useState } from 'react';
import axios from 'axios';
import { Mail, X } from 'lucide-react';
import { Heart } from 'lucide-react';
import { coupleService } from '../../../services/couple.service';
import type { Couple } from '../../../types/couple.types';
import {
  Container,
  Card,
  EnvelopeWrapper,
  EnvelopeIcon,
  HeartBadge,
  Title,
  Subtitle,
  EmailBadge,
  EmailIcon,
  CancelButton,
  StatusBadge,
  ErrorMessage,
} from './PendingInvite.styles';

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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao cancelar convite');
      } else {
        setError('Erro inesperado ao cancelar convite');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <EnvelopeWrapper>
          <EnvelopeIcon>✉️</EnvelopeIcon>
          <HeartBadge>
            <Heart size={12} fill="#fff" color="#fff" />
          </HeartBadge>
        </EnvelopeWrapper>

        <Title>Convite enviado!</Title>
        <Subtitle>Aguardando resposta do seu parceiro para começar o desafio.</Subtitle>

        <EmailBadge>
          <EmailIcon><Mail size={14} /></EmailIcon>
          {pendingCouple.invited_email}
        </EmailBadge>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <CancelButton onClick={handleCancel} disabled={isLoading}>
          <X size={14} />
          {isLoading ? 'Cancelando...' : 'Cancelar convite'}
        </CancelButton>

        <StatusBadge>Status: Pendente</StatusBadge>
      </Card>
    </Container>
  );
};

export default PendingInvite;