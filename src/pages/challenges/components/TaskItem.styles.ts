import styled from 'styled-components';

export const Item = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid ${({ $completed }) => $completed ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)'};
  border-radius: 14px;
  gap: 16px;
  transition: border-color 0.2s;
  opacity: ${({ $completed }) => $completed ? 0.6 : 1};

  &:hover {
    border-color: ${({ $completed }) => $completed ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)'};
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

export const TaskIconBox = styled.div<{ $completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
  background: ${({ $completed }) => $completed ? 'rgba(255,255,255,0.03)' : 'rgba(230,57,70,0.1)'};
  border: 1px solid ${({ $completed }) => $completed ? 'rgba(255,255,255,0.05)' : 'rgba(230,57,70,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $completed }) => $completed ? '#444' : '#E63946'};
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const TaskName = styled.p<{ $completed?: boolean }>`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ $completed }) => $completed ? '#555' : '#EAEAEA'};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PointsBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: #E63946;
  background: rgba(230,57,70,0.1);
  padding: 2px 8px;
  border-radius: 999px;
`;

export const CompletionCount = styled.span`
  font-size: 0.6875rem;
  color: #555;
`;

export const CompletedBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #4caf50;
  background: rgba(76,175,80,0.1);
  padding: 2px 8px;
  border-radius: 999px;
`;

export const TaskActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: #555;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.07);
    color: #EAEAEA;
    border-color: rgba(255,255,255,0.1);
  }
`;

export const CompleteButton = styled.button<{ $disabled?: boolean; $completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ $completed }) =>
    $completed
      ? 'rgba(76,175,80,0.15)'
      : 'linear-gradient(135deg, #E63946, #C1121F)'};
  color: ${({ $completed }) => $completed ? '#4caf50' : '#fff'};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $disabled }) => $disabled ? 0.4 : 1};
  transition: opacity 0.2s, transform 0.1s;

  &:hover {
    opacity: ${({ $disabled }) => $disabled ? 0.4 : 0.85};
    transform: ${({ $disabled }) => $disabled ? 'none' : 'scale(1.05)'};
  }
`;