import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarPastoral from './SidebarPastoral';
import NavbarPremium from './NavbarPremium';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  
  @media (min-width: 768px) {
    margin-left: 240px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 767px) {
    padding-bottom: 60px;
  }
`;

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <SidebarPastoral isOpen={isSidebarOpen} onClose={closeSidebar} />
      <MainContent>
        <NavbarPremium onMenuClick={toggleSidebar} />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
