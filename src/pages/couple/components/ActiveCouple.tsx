import React, { useState } from 'react';
import axios from 'axios';
import type { CoupleWithUsers } from '../../../types/couple.types';
import { coupleService } from '../../../services/couple.service';
import {
  Container,
  CoupleCard,
  MembersRow,
  MemberCard,
  Avatar,
  MemberName,
  HeartIcon,
  Divider,
  InfoRow,
  InfoLabel,
  InfoValue,
  LeaveButton,
} from './ActiveCouple.styles';
import { ErrorMessage } from './NoCouple.styles';

const ActiveCouple = ({ coupleData }: { coupleData: CoupleWithUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLeave = async () => {
    if (!window.confirm('Tem certeza que deseja sair do casal?')) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await coupleService.leaveCouple();
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao sair do casal');
      } else {
        setError('Erro ao sair do casal');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const { couple, user_1, user_2 } = coupleData;

  return (
    <Container>
      <CoupleCard>
        <MembersRow>
          <MemberCard>
            <Avatar>{user_1.name.charAt(0)}</Avatar>
            <MemberName>{user_1.name}</MemberName>
          </MemberCard>
          <HeartIcon>❤️</HeartIcon>
          <MemberCard>
            <Avatar>{user_2 ? user_2.name.charAt(0) : '?'}</Avatar>
            <MemberName>{user_2 ? user_2.name : 'Pendente'}</MemberName>
          </MemberCard>
        </MembersRow>

        <Divider />

        <InfoRow>
          <InfoLabel>Juntos desde</InfoLabel>
          <InfoValue>{formatDate(couple.created_at)}</InfoValue>
        </InfoRow>

        <LeaveButton onClick={handleLeave} disabled={isLoading}>
          {isLoading ? 'Saindo...' : 'Sair do Casal'}
        </LeaveButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CoupleCard>
    </Container>
  );
};

export default ActiveCouple;
