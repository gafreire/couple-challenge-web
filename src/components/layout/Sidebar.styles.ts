import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarWrapper = styled.aside<{ $collapsed: boolean }>`
  display: none;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: ${({ $collapsed }) => ($collapsed ? '72px' : '220px')};
    background-color: #0f0f0f;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    padding: 24px 0 20px;
    transition: width 0.25s ease;
    z-index: 100;
    overflow: hidden;
  }
`;

export const SidebarHeader = styled.div`
  padding: 0 20px;
  margin-bottom: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
`;

export const SidebarLogo = styled.div<{ $collapsed: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.15s ease;
  pointer-events: none;
  letter-spacing: -0.3px;

  span:first-child {
    color: #EAEAEA;
  }

  span:last-child {
    color: #E63946;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2px;
  padding: 0 12px;
`;

export const SidebarItem = styled(NavLink)<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 8px;
  color: #555;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
  border-left: 2px solid transparent;

  svg {
    flex-shrink: 0;
    min-width: 20px;
  }

  &.active {
    color: #E63946;
    background-color: rgba(230, 57, 70, 0.08);
    border-left-color: #E63946;
  }

  &:not(.active):hover {
    color: #999;
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const SidebarLabel = styled.span<{ $collapsed: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.15s ease;
  pointer-events: none;
  white-space: nowrap;
`;

export const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #444;
  position: absolute;
  right: 8px;
  top: 26px;
  transition: all 0.2s;
  z-index: 101;
  cursor: pointer;

  &:hover {
    color: #E63946;
    border-color: rgba(230, 57, 70, 0.3);
    background-color: rgba(230, 57, 70, 0.06);
  }
`;

export const LogoutButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  margin: 0 12px;
  border-radius: 8px;
  color: #E63946;
  background-color: transparent;
  border: 1px solid rgba(230, 57, 70, 0.3);
  width: calc(100% - 24px);
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: inherit;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
    min-width: 20px;
  }

  span {
    opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
    transition: opacity 0.15s ease;
    pointer-events: none;
  }

  &:hover {
    background-color: rgba(230, 57, 70, 0.1);
    border-color: #E63946;
  }
`;