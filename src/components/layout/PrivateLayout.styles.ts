import styled from 'styled-components';

export const Wrapper = styled.div<{ $sidebarCollapsed: boolean }>`
  display: flex;
  min-height: 100vh;
  background-color: #0a0a0a;
  overflow: hidden;
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
  overflow-y: auto;
  height: 100vh;

  /* mobile: desconta a altura do BottomNav (64px) */
  @media (max-width: 767px) {
    height: calc(100vh - 64px);
    padding-bottom: 24px;
  }

  @media (min-width: 768px) {
    margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '72px' : '220px')};
    transition: margin-left 0.2s ease;
  }
`;