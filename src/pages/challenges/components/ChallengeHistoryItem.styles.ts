import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.1);
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StatusDot = styled.div<{ $cancelled?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $cancelled }) => $cancelled ? '#555' : '#E63946'};
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ItemName = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #EAEAEA;
`;

export const ItemDate = styled.p`
  font-size: 0.875rem;
  color: #555;
`;

export const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`;

export const WinnerBadge = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #E63946;
`;

export const ScoreText = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: #666;
  letter-spacing: 1px;
`;

export const CancelledBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;