import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.4s ease both;
`;

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
`;

export const Avatar = styled.div<{ $imageUrl?: string | null }>`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${({ $imageUrl }) => $imageUrl ? `url(${$imageUrl}) center/cover` : 'linear-gradient(135deg, #E63946, #C1121F)'};
  border: 3px solid #1a1a1a;
  box-shadow: 0 0 0 1px rgba(230,57,70,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
`;

export const UserName = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #EAEAEA;
  letter-spacing: -0.3px;
`;

export const UserStats = styled.p`
  font-size: 0.8125rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: #888;
    font-weight: 500;
  }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #EAEAEA;
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

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: #EAEAEA;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;

  &:focus {
    border-color: rgba(230,57,70,0.5);
    background: rgba(255,255,255,0.06);
  }

  &::placeholder {
    color: #444;
  }
`;

export const SaveButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s, transform 0.1s;

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

// ─── Logout (mobile only) ─────────────────────────────────────────────────────

export const LogoutRow = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(230,57,70,0.3);
    color: #E63946;
  }
`;

export const LogoutLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// ─── Messages ─────────────────────────────────────────────────────────────────

export const SuccessMessage = styled.p`
  color: #4caf50;
  font-size: 0.8125rem;
  text-align: center;
  padding: 10px;
  background: rgba(76,175,80,0.08);
  border-radius: 8px;
  border: 1px solid rgba(76,175,80,0.15);
`;

export const ErrorMessage = styled.p`
  color: #FF4444;
  font-size: 0.8125rem;
  text-align: center;
`;