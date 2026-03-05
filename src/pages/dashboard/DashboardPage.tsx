import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coupleService } from '../../services/couple.service';
import { challengeService } from '../../services/challenge.service';
import { taskService } from '../../services/task.service';
import { useAuthStore } from '../../store/authStore';
import type { Challenge, ChallengeScore } from '../../types/challenge.types';
import type { CoupleWithUsers } from '../../types/couple.types';
import type { TaskWithCount } from '../../types/task.types';
import {
  Container, Header, Greeting, Subtitle,
  ScoreRow, ScoreCard, ScoreAvatar, ScoreInfo, ScoreName, ScoreValue, ScoreTasks,
  ChallengeCard, ChallengeLabel, ChallengeName, ProgressSection, ProgressHeader,
  ProgressTitle, DaysRemaining, ProgressBar, ProgressFill, ProgressSubtext,
  ChallengeFooter, DetailsButton,
  SectionHeader, SectionTitle, SeeAllLink,
  TasksGrid, TaskCard, TaskCardHeader, TaskIcon, PointsBadge, TaskCardName,
  TaskCardDesc, CompleteButton,
  EmptyCard, EmptyIconRow, EmptyIconCircle, EmptyDots, EmptyTitle, EmptySubtitle, InviteButton,
  BottomGrid, InfoCard, InfoCardIcon, InfoCardTitle, InfoCardDesc, InfoCardButton,
  InfoCardHint, HowItWorksList, HowItWorksItem,
  ErrorMessage,
} from './DashboardPage.styles';
import { Heart, Target, Zap, Lock, Share2, CheckCircle } from 'lucide-react';
import { taskService as ts } from '../../services/task.service';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [couple, setCouple] = useState<CoupleWithUsers | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [tasks, setTasks] = useState<TaskWithCount[]>([]);
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
          const [scoreData, tasksData] = await Promise.all([
            challengeService.getChallengeScore(challengeData.id),
            taskService.listChallengesTasks(challengeData.id),
          ]);
          setScore(scoreData);
          setTasks(tasksData.slice(0, 3));
        }
      } catch {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await ts.completeTask(taskId);
      if (challenge) {
        const [scoreData, tasksData] = await Promise.all([
          challengeService.getChallengeScore(challenge.id),
          taskService.listChallengesTasks(challenge.id),
        ]);
        setScore(scoreData);
        setTasks(tasksData.slice(0, 3));
      }
    } catch {
      // silent fail
    }
  };

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const userName = user?.name?.split(' ')[0] || 'Usuário';
  const hasCouple = !!couple;
  const hasChallenge = !!challenge;

  // Challenge progress
  let progress = 0;
  let daysRemaining = 0;
  let progressPercent = '0%';
  if (challenge) {
    const start = new Date(challenge.start_date);
    const end = new Date(challenge.end_date);
    const now = new Date();
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const elapsed = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    progress = Math.min(Math.max((elapsed / totalDays) * 100, 0), 100);
    daysRemaining = Math.max(Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)), 0);
    progressPercent = `${Math.round(progress)}% do tempo percorrido`;
  }

  const user1Score = score?.user_id_1_score || 0;
  const user2Score = score?.user_id_2_score || 0;

  return (
    <Container>
      {/* Header */}
      <Header>
        <Greeting>Olá, {userName}! 👋</Greeting>
        {hasChallenge && <Subtitle>Pronto para superar o desafio de hoje?</Subtitle>}
      </Header>

      {/* ── Estado com desafio ativo ── */}
      {hasChallenge && couple && score ? (
        <>
          {/* Score */}
          <ScoreRow>
            <ScoreCard $isWinning={user1Score > user2Score}>
              <ScoreAvatar>{couple.user_1.name.charAt(0)}</ScoreAvatar>
              <ScoreInfo>
                <ScoreName>{couple.user_1.name.split(' ')[0]}</ScoreName>
                <ScoreValue>{user1Score}<span>PTS</span></ScoreValue>
                <ScoreTasks>⊙ {score.user_id_1_tasks} tarefas concluídas</ScoreTasks>
              </ScoreInfo>
            </ScoreCard>
            <ScoreCard $isWinning={user2Score > user1Score}>
              <ScoreAvatar>{couple.user_2?.name.charAt(0) || '?'}</ScoreAvatar>
              <ScoreInfo>
                <ScoreName>{couple.user_2?.name.split(' ')[0] || 'Parceiro'}</ScoreName>
                <ScoreValue>{user2Score}<span>PTS</span></ScoreValue>
                <ScoreTasks>⊙ {score.user_id_2_tasks} tarefas concluídas</ScoreTasks>
              </ScoreInfo>
            </ScoreCard>
          </ScoreRow>

          {/* Challenge card */}
          <ChallengeCard>
            <ChallengeLabel>Desafio atual</ChallengeLabel>
            <ChallengeName>{challenge.name}</ChallengeName>
            <ProgressSection>
              <ProgressHeader>
                <ProgressTitle>Progresso do Desafio</ProgressTitle>
                <DaysRemaining>{daysRemaining} dias restantes</DaysRemaining>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill $progress={progress} />
              </ProgressBar>
              <ProgressSubtext>{progressPercent}</ProgressSubtext>
            </ProgressSection>
            <ChallengeFooter>
              <DetailsButton onClick={() => navigate('/challenges')}>
                Ver Detalhes →
              </DetailsButton>
            </ChallengeFooter>
          </ChallengeCard>

          {/* Quick tasks */}
          {tasks.length > 0 && (
            <>
              <SectionHeader>
                <SectionTitle><Zap size={16} color="#E63946" /> Tarefas Rápidas</SectionTitle>
                <SeeAllLink onClick={() => navigate('/tasks')}>VER TODAS</SeeAllLink>
              </SectionHeader>
              <TasksGrid>
                {tasks.map(({ task, completion_count }) => {
                  const isCompleted = task.max_completions
                    ? completion_count >= task.max_completions
                    : false;
                  return (
                    <TaskCard key={task.id}>
                      <TaskCardHeader>
                        <TaskIcon><CheckCircle size={16} /></TaskIcon>
                        <PointsBadge>+{task.points}PTS</PointsBadge>
                      </TaskCardHeader>
                      <TaskCardName>{task.name}</TaskCardName>
                      <TaskCardDesc>{task.description || 'Sem descrição'}</TaskCardDesc>
                      <CompleteButton
                        $disabled={isCompleted}
                        disabled={isCompleted}
                        onClick={() => !isCompleted && handleCompleteTask(task.id)}
                      >
                        {isCompleted ? 'Concluída ✓' : 'Concluir'}
                      </CompleteButton>
                    </TaskCard>
                  );
                })}
              </TasksGrid>
            </>
          )}
        </>
      ) : (
        <>
          {/* ── Estado sem casal / sem desafio ── */}
          {!hasCouple && (
            <EmptyCard>
              <EmptyIconRow>
                <EmptyIconCircle $active>
                  <Heart size={20} />
                </EmptyIconCircle>
                <EmptyDots>
                  <span /><span /><span />
                </EmptyDots>
                <EmptyIconCircle>
                  <span style={{ fontSize: '1.1rem' }}>👤</span>
                </EmptyIconCircle>
              </EmptyIconRow>
              <EmptyTitle>Você ainda não tem um casal conectado.</EmptyTitle>
              <EmptySubtitle>
                Conecte-se com sua pessoa especial para começar a completar desafios e registrar momentos inesquecíveis juntos.
              </EmptySubtitle>
              <InviteButton onClick={() => navigate('/couple')}>
                <Share2 size={15} /> Convidar Parceiro(a)
              </InviteButton>
            </EmptyCard>
          )}

          {hasCouple && !hasChallenge && (
            <EmptyCard>
              <EmptyIconCircle $active>
                <Target size={20} />
              </EmptyIconCircle>
              <EmptyTitle>Nenhum desafio ativo.</EmptyTitle>
              <EmptySubtitle>Crie um desafio para começar a competir com seu parceiro!</EmptySubtitle>
              <InviteButton onClick={() => navigate('/challenges')}>
                <Target size={15} /> Criar Desafio
              </InviteButton>
            </EmptyCard>
          )}

          {/* Bottom cards */}
          <BottomGrid>
            <InfoCard $locked={!hasCouple}>
              <InfoCardIcon><Target size={16} /></InfoCardIcon>
              <InfoCardTitle>Desafios Mensais</InfoCardTitle>
              <InfoCardDesc>
                Desafios tornam tudo mais divertido! Gamifique seu relacionamento com metas mensais.
              </InfoCardDesc>
              <InfoCardButton
                $locked={!hasCouple}
                disabled={!hasCouple}
                onClick={() => hasCouple && navigate('/challenges')}
              >
                <Lock size={13} /> Criar Desafio
              </InfoCardButton>
              {!hasCouple && <InfoCardHint>Conecte um parceiro primeiro para desbloquear</InfoCardHint>}
            </InfoCard>

            <InfoCard>
              <InfoCardIcon><Zap size={16} /></InfoCardIcon>
              <InfoCardTitle>Como funciona?</InfoCardTitle>
              <HowItWorksList>
                <HowItWorksItem>Envie o convite para seu parceiro</HowItWorksItem>
                <HowItWorksItem>Escolha um desafio ou crie o seu próprio</HowItWorksItem>
                <HowItWorksItem>Marquem tarefas como concluídas e ganhem pontos</HowItWorksItem>
              </HowItWorksList>
            </InfoCard>
          </BottomGrid>
        </>
      )}
    </Container>
  );
};

export default DashboardPage;