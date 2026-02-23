import type { FC } from 'react';
import { useState } from 'react';
import { challengeService } from '../../../services/challenge.service';
import type { Challenge, ChallengeScore } from '../../../types/challenge.types';
import type { CoupleWithUsers } from '../../../types/couple.types';
import {
  CardHeader,
  ChallengeName,
  StatusBadge,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  ScoreRow,
  ScoreCard,
  ScoreName,
  ScoreValue,
  FinishButton,
  Card,
  ErrorMessage,
} from './ActiveChallengeCard.styles';

interface ActiveChallengeCardProps {
  challenge: Challenge;
  score: ChallengeScore | null;
  coupleData: CoupleWithUsers;
}

const ActiveChallengeCard: FC<ActiveChallengeCardProps> = ({ challenge, score, coupleData }) => {
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const start = new Date(challenge.start_date);
  const end = new Date(challenge.end_date);

  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  const remainingDays = Math.max(totalDays - daysPassed, 0);

  const canFinish = now > end;

  const handleFinish = async () => {
    if (!canFinish) return;
    setFinishing(true);
    setError(null);
    try {
      await challengeService.finishChallenge(challenge.id);
    } catch {
      setError('Erro ao finalizar desafio. Tente novamente.');
    } finally {
      setFinishing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <ChallengeName>{challenge.name}</ChallengeName>
        <StatusBadge>{challenge.status}</StatusBadge>
      </CardHeader>

      <ProgressBar>
        <ProgressFill $progress={progress} />
      </ProgressBar>
      <ProgressLabel>{remainingDays} dias restantes</ProgressLabel>

      {score && (
        <ScoreRow>
          <ScoreCard>
            <ScoreName>{coupleData.user_1.name}</ScoreName>
            <ScoreValue>{score.user_id_1_score}</ScoreValue>
          </ScoreCard>
          <ScoreCard>
            <ScoreName>{coupleData.user_2?.name || 'Parceiro'}</ScoreName>
            <ScoreValue>{score.user_id_2_score}</ScoreValue>
          </ScoreCard>
        </ScoreRow>
      )}

      {canFinish && (
        <FinishButton onClick={handleFinish} disabled={finishing}>
          {finishing ? 'Finalizando...' : 'Finalizar Desafio'}
        </FinishButton>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default ActiveChallengeCard;