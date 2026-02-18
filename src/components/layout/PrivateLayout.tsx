import React, { useState } from 'react';
import { Wrapper, Content } from './PrivateLayout.styles';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Wrapper $sidebarCollapsed={sidebarCollapsed}>
      <Sidebar collapsed={sidebarCollapsed} onCollapseChange={setSidebarCollapsed} />
      <Content $sidebarCollapsed={sidebarCollapsed}>{children}</Content>
      <BottomNav />
    </Wrapper>
  );
};

export default PrivateLayout;