import { useState, useEffect } from 'react';
import { challengeService } from '../../services/challenge.service';
import { coupleService } from '../../services/couple.service';
import type { Challenge, ChallengeScore } from '../../types/challenge.types';
import type { CoupleWithUsers } from '../../types/couple.types';
import ActiveChallengeCard from './components/ActiveChallengeCard';
import ChallengeHistoryItem from './components/ChallengeHistoryItem';
import CreateChallengeModal from './components/CreateChallengeModal';
import {
  Container,
  Header,
  Title,
  CreateButton,
  Section,
  SectionTitle,
  EmptyMessage,
  ErrorMessage as ErrorMessageStyled,
} from './ChallengesPage.styles';

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
        coupleService.getMyCouple()
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateChallenge = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSuccess = () => {
    window.location.reload();
  };

  if (loading) return <Container><ErrorMessageStyled>Carregando...</ErrorMessageStyled></Container>;
  if (error) return <Container><ErrorMessageStyled>{error}</ErrorMessageStyled></Container>;

  const historyChallenges = challenges.filter(c => c.status === 'completed' || c.status === 'cancelled');

  return (
    <Container>
      <Header>
        <Title>Desafios</Title>
        {!activeChallenge && (
          <CreateButton onClick={handleCreateChallenge}>Criar</CreateButton>
        )}
      </Header>

      {activeChallenge && coupleData && (
        <ActiveChallengeCard challenge={activeChallenge} score={score} coupleData={coupleData} />
      )}

      <Section>
        <SectionTitle>Histórico</SectionTitle>
        {coupleData && historyChallenges.length > 0 ? (
          historyChallenges.map(challenge => (
            <ChallengeHistoryItem key={challenge.id} challenge={challenge} coupleData={coupleData} />
          ))
        ) : (
          <EmptyMessage>Nenhum desafio concluído ou cancelado</EmptyMessage>
        )}
      </Section>

      {showModal && (
        <CreateChallengeModal onClose={handleCloseModal} onSuccess={handleModalSuccess} />
      )}
    </Container>
  );
};

export default ChallengesPage;
