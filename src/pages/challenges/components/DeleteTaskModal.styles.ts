export {
  Overlay,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ErrorMessage,
} from './CreateChallengeModal.styles';

import styled from 'styled-components';

export const Modal = styled.div`
  width: 100%;
  max-width: 400px;
  background: #161616;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;

export const TaskName = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #EAEAEA;
  padding: 12px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: #666;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.15);
    color: #999;
  }
`;

export const DeleteButton = styled.button`
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #E63946, #C1121F);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;