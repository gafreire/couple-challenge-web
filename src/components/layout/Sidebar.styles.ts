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
    background-color: ${({ theme }) => theme.colors.surface};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.md} 0;
    transition: width 0.2s ease;
    z-index: 100;
    overflow: hidden;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  min-height: 48px;
  justify-content: center;
`;

export const SidebarLogo = styled.div<{ $collapsed: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  line-height: 1.3;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.15s ease;
  pointer-events: none;
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

export const SidebarItem = styled(NavLink)<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
    min-width: 20px;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const SidebarLabel = styled.span<{ $collapsed: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: opacity 0.15s ease;
  pointer-events: none;
  white-space: nowrap;
`;

export const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  position: absolute;
  right: 5px;
  top: 28px;
  transition: all 0.2s;
  z-index: 101;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LogoutButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.error};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.error};
  width: calc(100% - ${({ theme }) => theme.spacing.md});
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
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
    background-color: ${({ theme }) => theme.colors.error};
    color: #fff;
  }
`;