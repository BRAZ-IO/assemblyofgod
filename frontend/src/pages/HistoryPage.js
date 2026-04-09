import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Navigation from '../components/common/Navigation';

const HistoryContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const HistoryContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const HistoryHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const HistoryTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const HistorySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const SearchBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ChatCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ChatTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ChatDate = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`;

const ChatPreview = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChatMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const MessageCount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ChatActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const chatHistory = [
    {
      id: 1,
      title: "React Development Help",
      preview: "I was working on a React component and needed help with state management. The AI provided excellent suggestions on using Context API and custom hooks...",
      date: "2024-04-09",
      messageCount: 24,
      category: "development"
    },
    {
      id: 2,
      title: "API Integration Strategy",
      preview: "We discussed the best practices for implementing REST API endpoints, including authentication methods, error handling, and response formatting...",
      date: "2024-04-08",
      messageCount: 18,
      category: "architecture"
    },
    {
      id: 3,
      title: "Code Review Session",
      preview: "The AI helped me review my JavaScript code and identified several optimization opportunities, including memory leaks and performance bottlenecks...",
      date: "2024-04-07",
      messageCount: 32,
      category: "review"
    },
    {
      id: 4,
      title: "Database Design Consultation",
      preview: "We worked together on designing a scalable database schema for a new application, covering normalization, indexing strategies, and query optimization...",
      date: "2024-04-06",
      messageCount: 28,
      category: "database"
    },
    {
      id: 5,
      title: "UI/UX Design Ideas",
      preview: "Brainstorming session for a new user interface design, exploring color schemes, layout patterns, and accessibility considerations...",
      date: "2024-04-05",
      messageCount: 15,
      category: "design"
    },
    {
      id: 6,
      title: "Debugging Complex Issue",
      preview: "Helped troubleshoot a difficult bug in the application, using systematic debugging approaches and identifying the root cause...",
      date: "2024-04-04",
      messageCount: 41,
      category: "debugging"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Chats' },
    { id: 'development', label: 'Development' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'review', label: 'Code Review' },
    { id: 'database', label: 'Database' },
    { id: 'design', label: 'Design' },
    { id: 'debugging', label: 'Debugging' }
  ];

  const filteredChats = chatHistory.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || chat.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteChat = (chatId) => {
    console.log('Delete chat:', chatId);
    // Implement delete functionality
  };

  const handleExportChat = (chatId) => {
    console.log('Export chat:', chatId);
    // Implement export functionality
  };

  return (
    <HistoryContainer>
      <Navigation />
      <Layout>
        <HistoryContent>
          <HistoryHeader>
            <HistoryTitle>Chat History</HistoryTitle>
            <HistorySubtitle>Browse and manage your conversation history</HistorySubtitle>
          </HistoryHeader>

          <SearchBar>
            <SearchInput
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <FilterTabs>
            {filters.map(filter => (
              <FilterTab
                key={filter.id}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>

          {filteredChats.length > 0 ? (
            <ChatGrid>
              {filteredChats.map(chat => (
                <ChatCard key={chat.id}>
                  <ChatCardHeader>
                    <ChatTitle>{chat.title}</ChatTitle>
                    <ChatDate>{chat.date}</ChatDate>
                  </ChatCardHeader>
                  <ChatPreview>{chat.preview}</ChatPreview>
                  <ChatMeta>
                    <MessageCount>
                      <span>Messages:</span> {chat.messageCount}
                    </MessageCount>
                    <ChatActions>
                      <ActionButton onClick={() => handleExportChat(chat.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteChat(chat.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </ActionButton>
                    </ChatActions>
                  </ChatMeta>
                </ChatCard>
              ))}
            </ChatGrid>
          ) : (
            <EmptyState>
              <EmptyIcon>ð</EmptyIcon>
              <h3>No conversations found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </EmptyState>
          )}
        </HistoryContent>
      </Layout>
    </HistoryContainer>
  );
};

export default HistoryPage;
