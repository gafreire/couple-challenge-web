import type { FC } from 'react';
import { useState } from 'react';
import { challengeService } from '../../../services/challenge.service';
import type { Challenge, ChallengeScore } from '../../../types/challenge.types';
import type { CoupleWithUsers } from '../../../types/couple.types';
import {
  Card, CardHeader, ChallengeName, StatusBadge,
  ProgressSection, ProgressHeader, ProgressLabel, ProgressPercent,
  ProgressBar, ProgressFill,
  ScoreRow, ScoreCard, ScoreAvatar, ScoreInfo, ScoreName, ScoreValue, VsDivider,
  FinishButton, ErrorMessage,
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
      window.location.reload();
    } catch {
      setError('Erro ao finalizar desafio. Tente novamente.');
    } finally {
      setFinishing(false);
    }
  };

  const user1 = coupleData.user_1;
  const user2 = coupleData.user_2;
  const score1 = score?.user_id_1_score ?? 0;
  const score2 = score?.user_id_2_score ?? 0;

  return (
    <Card>
      <CardHeader>
        <ChallengeName>{challenge.name}</ChallengeName>
        <StatusBadge>Ativo</StatusBadge>
      </CardHeader>

      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>{remainingDays} dias restantes</ProgressLabel>
          <ProgressPercent>{Math.round(progress)}%</ProgressPercent>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
      </ProgressSection>

      {score && (
        <ScoreRow>
          <ScoreCard>
            <ScoreAvatar>{user1.name.charAt(0).toUpperCase()}</ScoreAvatar>
            <ScoreInfo>
              <ScoreName>{user1.name.split(' ')[0]}</ScoreName>
              <ScoreValue>{score1}</ScoreValue>
            </ScoreInfo>
          </ScoreCard>

          <VsDivider>VS</VsDivider>

          <ScoreCard>
            <ScoreAvatar>{user2?.name.charAt(0).toUpperCase() || '?'}</ScoreAvatar>
            <ScoreInfo>
              <ScoreName>{user2?.name.split(' ')[0] || 'Parceiro'}</ScoreName>
              <ScoreValue>{score2}</ScoreValue>
            </ScoreInfo>
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