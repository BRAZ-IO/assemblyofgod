import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: ${props => props.isOpen ? '280px' : '0px'};
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChatItem = styled.div`
  padding: 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: translateX(4px);
  }
`;

const ChatTitle = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatPreview = styled.div`
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatTime = styled.div`
  font-size: 0.7rem;
  color: #999;
  margin-top: 0.3rem;
`;

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const SettingLabel = styled.label`
  color: #333;
  font-size: 0.9rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  width: 48px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background: #667eea;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  transition: 0.3s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const NewChatButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const chatHistory = [
    {
      id: 1,
      title: "React Development Help",
      preview: "How to optimize React components...",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "API Integration",
      preview: "Best practices for REST API design...",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Code Review",
      preview: "Can you review this JavaScript function...",
      time: "2 days ago"
    },
    {
      id: 4,
      title: "Database Design",
      preview: "What's the best way to structure...",
      time: "3 days ago"
    }
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>CortexAI</SidebarTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </SidebarHeader>
      
      <SidebarContent>
        <Section>
          <NewChatButton>
            + New Chat
          </NewChatButton>
        </Section>

        <Section>
          <SectionTitle>Recent Chats</SectionTitle>
          <ChatHistory>
            {chatHistory.map(chat => (
              <ChatItem key={chat.id}>
                <ChatTitle>{chat.title}</ChatTitle>
                <ChatPreview>{chat.preview}</ChatPreview>
                <ChatTime>{chat.time}</ChatTime>
              </ChatItem>
            ))}
          </ChatHistory>
        </Section>

        <Section>
          <SectionTitle>Settings</SectionTitle>
          <SettingsList>
            <SettingItem>
              <SettingLabel>Dark Mode</SettingLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Notifications</SettingLabel>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </SettingItem>
          </SettingsList>
        </Section>

        <Section>
          <SectionTitle>About</SectionTitle>
          <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.5' }}>
            <p>CortexAI v1.0.0</p>
            <p>Your intelligent assistant for coding, creativity, and problem-solving.</p>
            <p style={{ marginTop: '1rem' }}>
              Made with React & Styled Components
            </p>
          </div>
        </Section>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
