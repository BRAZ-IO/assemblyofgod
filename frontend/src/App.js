import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import BiblePage from './pages/BiblePage';
import ChatPage from './pages/ChatPage';
import EventsPage from './pages/EventsPage';
import HymnsPage from './pages/HymnsPage';
import PrayersPage from './pages/PrayersPage';
import AIConfigPage from './pages/AIConfigPage';
import WelcomePage from './pages/WelcomePage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
  }
  
  #root {
    height: 100vh;
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:chatId" element={<ChatPage />} />
            <Route path="bible" element={<BiblePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="hymns" element={<HymnsPage />} />
            <Route path="prayers" element={<PrayersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="ai-config" element={<AIConfigPage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="images" element={<HomePage />} />
            <Route path="apps" element={<HomePage />} />
            <Route path="research" element={<HomePage />} />
            <Route path="codex" element={<HomePage />} />
            <Route path="projects" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppContainer>
  );
}

export default App;
