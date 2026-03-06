import { type FC } from 'react';
import type { Challenge } from '../../../types/challenge.types';
import type { CoupleWithUsers } from '../../../types/couple.types';
import {
  Item, ItemLeft, StatusDot, ItemInfo, ItemName, ItemDate,
  ItemRight, WinnerBadge, ScoreText, CancelledBadge,
} from './ChallengeHistoryItem.styles';

interface ChallengeHistoryItemProps {
  challenge: Challenge;
  coupleData: CoupleWithUsers;
}

const ChallengeHistoryItem: FC<ChallengeHistoryItemProps> = ({ challenge, coupleData }) => {
  const endDate = new Date(challenge.end_date).toLocaleDateString('pt-BR');
  const isCancelled = challenge.status === 'cancelled';

  const getWinnerName = (winnerId: string) => {
    if (winnerId === coupleData.user_1.id) return coupleData.user_1.name.split(' ')[0];
    if (coupleData.user_2 && winnerId === coupleData.user_2.id) return coupleData.user_2.name.split(' ')[0];
    return 'Desconhecido';
  };

  return (
    <Item>
      <ItemLeft>
        <StatusDot $cancelled={isCancelled} />
        <ItemInfo>
          <ItemName>{challenge.name}</ItemName>
          <ItemDate>Encerrado em {endDate}</ItemDate>
        </ItemInfo>
      </ItemLeft>

      <ItemRight>
        {isCancelled ? (
          <CancelledBadge>Cancelado</CancelledBadge>
        ) : (
          <>
            {challenge.winner_id && (
              <WinnerBadge>🏆 {getWinnerName(challenge.winner_id)}</WinnerBadge>
            )}
            {challenge.winner_score !== null && challenge.loser_score !== null && (
              <ScoreText>{challenge.winner_score} — {challenge.loser_score}</ScoreText>
            )}
          </>
        )}
      </ItemRight>
    </Item>
  );
};

export default ChallengeHistoryItem;