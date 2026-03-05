import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #0f0f0f;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  padding: 0 8px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #555;
  text-decoration: none;
  flex: 1;
  height: 100%;
  transition: color 0.2s;
  position: relative;

  &.active {
    color: #E63946;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 2px;
      background-color: #E63946;
      border-radius: 0 0 4px 4px;
    }
  }

  &:not(.active):hover {
    color: #999;
  }
`;

export const NavLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
`;