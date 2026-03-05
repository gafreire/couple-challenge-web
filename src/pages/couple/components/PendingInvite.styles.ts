import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
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
  max-width: 420px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 48px 36px 36px;
  text-align: center;
`;

export const EnvelopeWrapper = styled.div`
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  margin-bottom: 8px;
`;

export const EnvelopeIcon = styled.div`
  font-size: 4rem;
  line-height: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
`;

export const HeartBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(230, 57, 70, 0.5);
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
  max-width: 280px;
  margin-top: -8px;
`;

export const EmailBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: #EAEAEA;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const EmailIcon = styled.span`
  color: #555;
  display: flex;
  align-items: center;
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 28px;
  border: 1px solid rgba(230, 57, 70, 0.4);
  border-radius: 999px;
  color: #E63946;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    background: rgba(230, 57, 70, 0.08);
    border-color: #E63946;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatusBadge = styled.p`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 4px;
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.75rem;
  text-align: center;
`;