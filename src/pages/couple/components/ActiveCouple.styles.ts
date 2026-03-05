import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heartbeat = keyframes`
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

export const CoupleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 48px 40px;
`;

export const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E63946, #C1121F);
  border: 4px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 0 1px rgba(230, 57, 70, 0.3);
`;

export const MembersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

export const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const MemberName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #EAEAEA;
  text-align: center;
`;

export const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${heartbeat} 2s ease-in-out infinite;
  color: #E63946;
  margin-bottom: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
`;

export const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const DateLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #777777;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const DateValue = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const LeaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: 1px solid rgba(230, 57, 70, 0.4);
  border-radius: 999px;
  color: #E63946;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(230, 57, 70, 0.08);
    border-color: #E63946;
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