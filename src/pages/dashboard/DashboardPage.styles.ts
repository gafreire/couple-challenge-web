import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

// ─── Layout ────────────────────────────────────────────────────────────────

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

// ─── Header ────────────────────────────────────────────────────────────────

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Greeting = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #E63946;
  font-weight: 500;
`;

// ─── Score Cards ────────────────────────────────────────────────────────────

export const ScoreRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ScoreCard = styled.div<{ $isWinning?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: ${({ $isWinning }) =>
    $isWinning
      ? 'linear-gradient(135deg, rgba(230,57,70,0.12) 0%, rgba(230,57,70,0.04) 100%)'
      : 'rgba(255,255,255,0.03)'};
  border: 1px solid ${({ $isWinning }) =>
    $isWinning ? 'rgba(230,57,70,0.3)' : 'rgba(255,255,255,0.06)'};
  border-radius: 14px;
  transition: border-color 0.3s;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const ScoreAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export const ScoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ScoreName = styled.p`
  font-size: 0.75rem;
  color: #b6b6b6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ScoreValue = styled.p`
  font-size: 1.375rem;
  font-weight: 700;
  color: #EAEAEA;
  line-height: 1;

  span {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #b6b6b6;
    margin-left: 3px;
    letter-spacing: 0.5px;
  }
`;

export const ScoreTasks = styled.p`
  font-size: 0.6875rem;
  color: #b6b6b6;
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ─── Challenge Card ─────────────────────────────────────────────────────────

export const ChallengeCard = styled.div`
  padding: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '🏆';
    position: absolute;
    right: 20px;
    top: 35%;
    transform: translateY(-50%);
    font-size: 6rem;
    opacity: 0.06;
    pointer-events: none;
    filter: grayscale(1);

    @media (max-width: 480px) {
      font-size: 4rem;
      right: 10px;
    }
  }
`;

export const ChallengeLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #E63946;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ChallengeName = styled.h3`
  font-size: 1.375rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
  margin-top: -6px;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressTitle = styled.p`
  font-size: 0.75rem;
  color: #555;
`;

export const DaysRemaining = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #E63946;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, #E63946, #FF6B6B);
  border-radius: 999px;
  transition: width 0.6s ease;
`;

export const ProgressSubtext = styled.p`
  font-size: 0.6875rem;
  color: #b6b6b6;
`;

export const ChallengeFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DetailsButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: linear-gradient(135deg, #E63946, #C1121F);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Quick Tasks ─────────────────────────────────────────────────────────────

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #b6b6b6;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SeeAllLink = styled.a`
  font-size: 0.75rem;
  font-weight: 600;
  color: #858585;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    color: #E63946;
  }
`;

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TaskCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(230,57,70,0.2);
  }
`;

export const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TaskIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(230,57,70,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E63946;
`;

export const PointsBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: #E63946;
  background: rgba(230,57,70,0.1);
  padding: 2px 7px;
  border-radius: 999px;
`;

export const TaskCardName = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #EAEAEA;
  line-height: 1.3;
`;

export const TaskCardDesc = styled.p`
  font-size: 0.75rem;
  color: #7a7a7a;
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CompleteButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 8px;
  background: ${({ $disabled }) => $disabled ? 'rgba(255,255,255,0.03)' : 'rgba(230,57,70,0.1)'};
  border: 1px solid ${({ $disabled }) => $disabled ? 'rgba(255,255,255,0.05)' : 'rgba(230,57,70,0.2)'};
  border-radius: 7px;
  color: ${({ $disabled }) => $disabled ? '#444' : '#E63946'};
  font-size: 0.75rem;
  font-weight: 600;
  font-family: inherit;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  margin-top: auto;

  &:hover:not(:disabled) {
    background: rgba(230,57,70,0.18);
  }
`;

// ─── Empty State ─────────────────────────────────────────────────────────────

export const EmptyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  text-align: center;
`;

export const EmptyIconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EmptyIconCircle = styled.div<{ $active?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'rgba(230,57,70,0.15)' : 'rgba(255,255,255,0.04)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(230,57,70,0.3)' : 'rgba(255,255,255,0.07)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => $active ? '#E63946' : '#333'};
`;

export const EmptyDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #333;
    animation: ${shimmer} 1.5s ease-in-out infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

export const EmptyTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #EAEAEA;
`;

export const EmptySubtitle = styled.p`
  font-size: 0.8125rem;
  color: #555;
  line-height: 1.5;
  max-width: 280px;
`;

export const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: linear-gradient(135deg, #E63946, #C1121F);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Bottom Cards ────────────────────────────────────────────────────────────

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div<{ $locked?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  opacity: ${({ $locked }) => $locked ? 0.6 : 1};
`;

export const InfoCardIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(230,57,70,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E63946;
`;

export const InfoCardTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: #EAEAEA;
`;

export const InfoCardDesc = styled.p`
  font-size: 0.75rem;
  color: #555;
  line-height: 1.5;
`;

export const InfoCardButton = styled.button<{ $locked?: boolean }>`
  width: 100%;
  padding: 9px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  color: ${({ $locked }) => $locked ? '#444' : '#EAEAEA'};
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: ${({ $locked }) => $locked ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not([disabled]) {
    border-color: rgba(230,57,70,0.3);
    color: #E63946;
  }
`;

export const InfoCardHint = styled.p`
  font-size: 0.6875rem;
  color: #333;
  text-align: center;
`;

export const HowItWorksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const HowItWorksItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #E63946;
    margin-top: 5px;
    flex-shrink: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.875rem;
  text-align: center;
`;