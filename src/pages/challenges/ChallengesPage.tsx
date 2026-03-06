import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { challengeService } from '../../services/challenge.service';
import { coupleService } from '../../services/couple.service';
import type { Challenge, ChallengeScore } from '../../types/challenge.types';
import type { CoupleWithUsers } from '../../types/couple.types';
import ActiveChallengeCard from './components/ActiveChallengeCard';
import ChallengeHistoryItem from './components/ChallengeHistoryItem';
import CreateChallengeModal from './components/CreateChallengeModal';
import {
  Container, Header, TitleGroup, Title, TitleSub, CreateButton,
  Section, SectionTitle, EmptyState, EmptyIcon, EmptyTitle, EmptySubtitle,
  ErrorMessage,
} from './ChallengesPage.styles';
import { Heart } from 'lucide-react';

const ChallengesPage = () => {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [coupleData, setCoupleData] = useState<CoupleWithUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [active, list, couple] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        challengeService.listChallenges(),
        coupleService.getMyCouple(),
      ]);
      setActiveChallenge(active);
      setChallenges(list);
      setCoupleData(couple);

      if (active) {
        const scoreData = await challengeService.getChallengeScore(active.id);
        setScore(scoreData);
      }
    } catch {
      setError('Erro ao carregar desafios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const historyChallenges = challenges.filter(
    (c) => c.status === 'completed' || c.status === 'cancelled'
  );

  return (
    <Container>
      <Header>
        <TitleGroup>
          <Title>Desafios</Title>
          <TitleSub>Acompanhe seu progresso e supere seus limites em dupla.</TitleSub>
        </TitleGroup>
        {!activeChallenge && (
          <CreateButton onClick={() => setShowModal(true)}>
            <Plus size={15} /> Novo Desafio
          </CreateButton>
        )}
      </Header>

      {activeChallenge && coupleData && (
        <Section>
          <SectionTitle>Desafio Ativo</SectionTitle>
          <ActiveChallengeCard
            challenge={activeChallenge}
            score={score}
            coupleData={coupleData}
          />
        </Section>
      )}

      <Section>
        <SectionTitle>Histórico</SectionTitle>
        {coupleData && historyChallenges.length > 0 ? (
          historyChallenges.map((challenge) => (
            <ChallengeHistoryItem
              key={challenge.id}
              challenge={challenge}
              coupleData={coupleData}
            />
          ))
        ) : (
          <EmptyState>
            <EmptyIcon><Heart size={20} /></EmptyIcon>
            <EmptyTitle>Nenhum desafio concluído ou cancelado</EmptyTitle>
            <EmptySubtitle>Seu histórico de conquistas e marcas aparecerá aqui.</EmptySubtitle>
          </EmptyState>
        )}
      </Section>

      {showModal && (
        <CreateChallengeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </Container>
  );
};

export default ChallengesPage;