import React from 'react';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Navigation from '../components/common/Navigation';
import ChatInterface from '../components/chat/ChatInterface';

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Navigation />
      <Layout>
        <ChatInterface />
      </Layout>
    </HomeContainer>
  );
};

export default HomePage;
