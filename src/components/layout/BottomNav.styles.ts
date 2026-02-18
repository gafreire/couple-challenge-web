import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  flex: 1;
  height: 100%;
  transition: color 0.2s;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavLabel = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;