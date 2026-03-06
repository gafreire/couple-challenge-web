import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export const Card = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '🏆';
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 5rem;
    opacity: 0.05;
    pointer-events: none;
    filter: grayscale(1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const ChallengeName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
  flex: 1;
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  background: rgba(230,57,70,0.15);
  color: #E63946;
  font-size: 0.6875rem;
  font-weight: 700;
  border-radius: 999px;
  border: 1px solid rgba(230,57,70,0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
  animation: ${shimmer} 2.5s ease-in-out infinite;
`;

// ─── Progress ────────────────────────────────────────────────────────────────

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

export const ProgressLabel = styled.p`
  font-size: 0.75rem;
  color: #555;
`;

export const ProgressPercent = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
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

// ─── Score ───────────────────────────────────────────────────────────────────

export const ScoreRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
`;

export const ScoreCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
`;

export const ScoreAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  border: 2px solid #1a1a1a;
  box-shadow: 0 0 0 1px rgba(230,57,70,0.2);
`;

export const ScoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ScoreName = styled.p`
  font-size: 0.6875rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ScoreValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #EAEAEA;
  line-height: 1;
`;

export const VsDivider = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #333;
  text-align: center;
`;

// ─── Footer ──────────────────────────────────────────────────────────────────

export const FinishButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: #888;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(230,57,70,0.3);
    color: #E63946;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.75rem;
  text-align: center;
`;