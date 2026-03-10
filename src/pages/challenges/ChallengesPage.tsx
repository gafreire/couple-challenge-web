/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { challengeService } from '../../services/challenge.service';
import { coupleService } from '../../services/couple.service';
import { useAppCache } from '../../store/appCache';
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
  const cache = useAppCache();

  const hasCache = cache.challengesCouple !== null || cache.challenges.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const [active, list, couple] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        challengeService.listChallenges(),
        coupleService.getMyCouple(),
      ]);

      let scoreData = null;
      if (active) {
        scoreData = await challengeService.getChallengeScore(active.id);
      }

      cache.setChallenges({
        activeChallenge: active,
        challenges: list,
        challengeScore: scoreData,
        challengesCouple: couple,
      });
    } catch {
      if (!silent) setError('Erro ao carregar desafios');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(hasCache);
  }, []);

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const { activeChallenge, challenges, challengeScore, challengesCouple } = cache;

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

      {activeChallenge && challengesCouple && (
        <Section>
          <SectionTitle>Desafio Ativo</SectionTitle>
          <ActiveChallengeCard
            challenge={activeChallenge}
            score={challengeScore}
            coupleData={challengesCouple}
          />
        </Section>
      )}

      <Section>
        <SectionTitle>Histórico</SectionTitle>
        {challengesCouple && historyChallenges.length > 0 ? (
          historyChallenges.map((challenge) => (
            <ChallengeHistoryItem
              key={challenge.id}
              challenge={challenge}
              coupleData={challengesCouple}
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