import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleGroup = styled.div`
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

export const TitleSub = styled.p`
  font-size: 0.875rem;
  color: #555;
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
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #E63946;
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 24px;
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