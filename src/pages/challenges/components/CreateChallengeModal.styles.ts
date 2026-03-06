import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
`;

export const StyledCreateChallengeModal = styled.div`
  width: 100%;
  max-width: 440px;
  background: #161616;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #EAEAEA;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #EAEAEA;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;

  &:focus {
    border-color: rgba(230, 57, 70, 0.5);
    background: rgba(255, 255, 255, 0.06);
  }

  &::placeholder {
    color: #444;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(0.4);
    cursor: pointer;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #EAEAEA;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgba(230, 57, 70, 0.5);
  }

  option {
    background: #161616;
    color: #EAEAEA;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #E63946, #C1121F);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  margin-top: 4px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.75rem;
  margin-top: -8px;
`;