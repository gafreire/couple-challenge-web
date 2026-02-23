import { type FC } from 'react';
import type { Challenge } from '../../../types/challenge.types';
import {
  Item,
  ItemLeft,
  ItemName,
  ItemDate,
  ItemRight,
  WinnerBadge,
  ScoreText,
} from './ChallengeHistoryItem.styles';
import type { CoupleWithUsers } from '../../../types/couple.types';

interface ChallengeHistoryItemProps {
  challenge: Challenge;
  coupleData: CoupleWithUsers
}

const ChallengeHistoryItem: FC<ChallengeHistoryItemProps> = ({ challenge, coupleData }) => {
  const endDate = new Date(challenge.end_date).toLocaleDateString('pt-BR');

  const getWinnerName = (winnerId: string) => {
    if (winnerId === coupleData.user_1.id) {
      return coupleData.user_1.name;
    }
    if (coupleData.user_2 && winnerId === coupleData.user_2.id) {
      return coupleData.user_2.name;
    }
    return 'Desconhecido';
  };

  return (
    <Item>
      <ItemLeft>
        <ItemName>{challenge.name}</ItemName>
        <ItemDate>Data de fim: {endDate}</ItemDate>
      </ItemLeft>
      <ItemRight>
        {challenge.winner_id && (
          <WinnerBadge>Vencedor: {getWinnerName(challenge.winner_id)}</WinnerBadge>
        )}
        {challenge.winner_score !== null && challenge.loser_score !== null && (
          <ScoreText>{challenge.winner_score} - {challenge.loser_score}</ScoreText>
        )}
      </ItemRight>
    </Item>
  );
};

export default ChallengeHistoryItem;