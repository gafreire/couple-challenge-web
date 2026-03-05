import styled from 'styled-components';

export const Wrapper = styled.div<{ $sidebarCollapsed: boolean }>`
  display: flex;
  min-height: 100vh;
  background-color: #0a0a0a;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 40px,
    rgba(255, 255, 255, 0.012) 40px,
    rgba(255, 255, 255, 0.012) 41px
  );
`;

export const Content = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 80px;
  height: 100vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '72px' : '220px')};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    transition: margin-left 0.2s ease;
  }
`;