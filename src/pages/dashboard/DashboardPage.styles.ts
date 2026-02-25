import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin: 0 auto;
`;

export const Greeting = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xxl};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ScoreRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ScoreCard = styled.div<{ $isWinning?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ $isWinning, theme }) =>
    $isWinning ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ScoreName = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ScoreValue = styled.p`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ScoreTasks = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const CardTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ChallengeName = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

export const ProgressLabel = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyMessage = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-align: center;
`;