import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  animation: ${fadeIn} 0.4s ease both;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 48px 32px 36px;
  text-align: center;
`;

export const EmojiWrapper = styled.div`
  font-size: 3.5rem;
  line-height: 1;
  animation: ${float} 3s ease-in-out infinite;
  margin-bottom: 4px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
  max-width: 260px;
  margin-top: -8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 14px;
  color: #555;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 13px 14px 13px 40px;
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
`;

export const Button = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecurityNote = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  color: #444;
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.75rem;
  text-align: center;
  padding: 8px 12px;
  background: rgba(255, 68, 68, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.15);
  width: 100%;
`;