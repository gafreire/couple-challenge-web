import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const ChallengeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChallengeLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: #E63946;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(230,57,70,0.1);
  border: 1px solid rgba(230,57,70,0.2);
  padding: 3px 8px;
  border-radius: 999px;
`;

export const ChallengeName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #EAEAEA;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #E63946, #C1121F);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const FilterTab = styled.button<{ $active?: boolean }>`
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $active }) => $active ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.07)'};
  background: ${({ $active }) => $active ? 'rgba(230,57,70,0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? '#E63946' : '#555'};

  &:hover {
    color: ${({ $active }) => $active ? '#E63946' : '#999'};
    border-color: ${({ $active }) => $active ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.12)'};
  }
`;

// ─── Task List ────────────────────────────────────────────────────────────────

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// ─── Empty / Error ────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(230,57,70,0.1);
  border: 1px solid rgba(230,57,70,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E63946;
`;

export const EmptyTitle = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #EAEAEA;
`;

export const EmptySubtitle = styled.p`
  font-size: 0.8125rem;
  color: #555;
`;

export const EmptyMessage = styled.p`
  font-size: 0.875rem;
  color: #444;
  text-align: center;
  padding: 32px;
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.875rem;
  text-align: center;
`;