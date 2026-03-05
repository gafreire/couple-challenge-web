import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
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
  max-width: 360px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 48px 32px 36px;
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  position: relative;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  border: 3px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 0 1px rgba(230, 57, 70, 0.3);
`;

export const HeartBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(230, 57, 70, 0.5);
  border: 2px solid #0a0a0a;
`;

export const Title = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-top: -12px;
`;

export const AcceptButton = styled.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const RejectButton = styled.button`
  width: 100%;
  padding: 13px;
  background: transparent;
  color: #666;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Tagline = styled.p`
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
  padding: 8px 12px;
  background: rgba(255, 68, 68, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.15);
  width: 100%;
`;