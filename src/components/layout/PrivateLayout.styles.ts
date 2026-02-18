import styled from 'styled-components';

export const Wrapper = styled.div<{ $sidebarCollapsed: boolean }>`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 80px;

  @media (min-width: 768px) {
    margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '72px' : '220px')};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    transition: margin-left 0.2s ease;
  }
`;