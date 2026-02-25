import { useState, useEffect } from 'react';
import { coupleService } from '../../services/couple.service';
import { challengeService } from '../../services/challenge.service';
import { useAuthStore } from '../../store/authStore';
import type { Challenge, ChallengeScore } from '../../types/challenge.types';
import type { CoupleWithUsers } from '../../types/couple.types';
import {
  Container,
  Greeting,
  ScoreRow,
  ScoreCard,
  ScoreName,
  ScoreValue,
  ScoreTasks,
  Card,
  CardTitle,
  ChallengeName,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  EmptyMessage,
  ErrorMessage,
} from './DashboardPage.styles';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [couple, setCouple] = useState<CoupleWithUsers | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coupleData, challengeData] = await Promise.all([
          coupleService.getMyCouple().catch(() => null),
          challengeService.getActiveChallenge().catch(() => null),
        ]);

        setCouple(coupleData);
        setChallenge(challengeData);

        if (challengeData) {
          const scoreData = await challengeService.getChallengeScore(challengeData.id);
          setScore(scoreData);
        }
      } catch {
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Container>Carregando...</Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const userName = user?.name || 'Usuário';

  // Calculate challenge progress
  let progress = 0;
  let daysRemaining = 0;
  if (challenge) {
    const start = new Date(challenge.start_date);
    const end = new Date(challenge.end_date);
    const now = new Date();
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const elapsedDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    progress = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
    daysRemaining = Math.max(Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)), 0);
  }

  // Determine scores
  const user1Score = score?.user_id_1_score || 0;
  const user2Score = score?.user_id_2_score || 0;
  const user1Name = couple?.user_1.name || 'Usuário 1';
  const user2Name = couple?.user_2?.name || 'Usuário 2';

  const hasData = couple && challenge;

  return (
    <Container>
      <Greeting>Olá, {userName}! 👋</Greeting>

      {score && couple && (
        <ScoreRow>
          <ScoreCard $isWinning={user1Score > user2Score}>
            <ScoreName>{user1Name}</ScoreName>
            <ScoreValue>{user1Score}</ScoreValue>
            <ScoreTasks>{score.user_id_1_tasks} tarefas</ScoreTasks>
          </ScoreCard>
          <ScoreCard $isWinning={user2Score > user1Score}>
            <ScoreName>{user2Name}</ScoreName>
            <ScoreValue>{user2Score}</ScoreValue>
            <ScoreTasks>{score.user_id_2_tasks} tarefas</ScoreTasks>
          </ScoreCard>
        </ScoreRow>
      )}

      {challenge && (
        <Card>
          <CardTitle>Desafio Atual</CardTitle>
          <ChallengeName>{challenge.name}</ChallengeName>
          <ProgressBar>
            <ProgressFill $progress={progress} />
          </ProgressBar>
          <ProgressLabel>{daysRemaining} dias restantes</ProgressLabel>
        </Card>
      )}

      {!hasData && (
        <EmptyMessage>
          {!couple && !challenge && 'Você ainda não tem um casal ou desafio ativo.'}
          {!couple && challenge && 'Você precisa estar em um casal para participar de desafios.'}
          {couple && !challenge && 'Crie um desafio para começar a competir!'}
        </EmptyMessage>
      )}
    </Container>
  );
};

export default DashboardPage;