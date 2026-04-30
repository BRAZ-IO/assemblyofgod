import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import APIKeyManager from '../components/user/APIKeyManager';

const ProfileContainer = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 60px);
  background-color: #343541;
  
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProfileTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const ProfileSubtitle = styled.p`
  color: #8e8ea0;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const ProfileCard = styled.div`
  background-color: #444654;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #565869;
  
  @media (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  
  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const UserEmail = styled.p`
  color: #8e8ea0;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const UserStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 163, 127, 0.1);
  border: 1px solid #10a37f;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10a37f;
`;

const StatusText = styled.span`
  color: #10a37f;
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: #343541;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #8e8ea0;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: ${props => props.variant === 'danger' ? '#ef4444' : props.variant === 'secondary' ? '#444654' : 'linear-gradient(135deg, #10a37f, #0d7f61)'};
  color: white;
  border: ${props => props.variant === 'secondary' ? '1px solid #565869' : 'none'};
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 767px) {
    flex: 1;
    min-width: 120px;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const QuickActions = styled.div`
  background-color: #444654;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #565869;
  
  @media (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ActionCard = styled.div`
  background-color: #343541;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  
  &:hover {
    border-color: #10a37f;
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10a37f, #0d7f61);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ActionDescription = styled.p`
  color: #8e8ea0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    chats: 0,
    apiKeys: 0,
    modelsUsed: 0,
    lastActive: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Criar usuário padrão para experiência sem login
    const defaultUser = {
      name: 'Usuário CortexAI',
      email: 'usuario@cortexai.com',
      isGuest: true,
      loginTime: new Date().toISOString()
    };
    
    setUser(defaultUser);
    
    // Carregar estatísticas do localStorage
    const chats = JSON.parse(localStorage.getItem('cortexai_chats') || '[]');
    const apiKeys = JSON.parse(localStorage.getItem('cortexai_user_api_keys') || '{}');
    
    setStats({
      chats: chats.length,
      apiKeys: Object.keys(apiKeys).filter(key => apiKeys[key]).length,
      modelsUsed: Object.keys(apiKeys).filter(key => apiKeys[key]).length,
      lastActive: new Date().toISOString()
    });
  }, []);

  const handleLogout = () => {
    // Limpar dados e recarregar página
    localStorage.clear();
    window.location.reload();
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os seus dados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('cortexai_chats');
      localStorage.removeItem('cortexai_user_api_keys');
      localStorage.removeItem('cortexai_selected_ai');
      
      // Recarregar estatísticas
      setStats({
        chats: 0,
        apiKeys: 0,
        modelsUsed: 0,
        lastActive: new Date().toISOString()
      });
      
      alert('Dados limpos com sucesso!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>Meu Perfil</ProfileTitle>
        <ProfileSubtitle>Gerencie sua conta e configurações de IA</ProfileSubtitle>
      </ProfileHeader>

      <ProfileCard>
        <UserInfo>
          <UserAvatar>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </UserAvatar>
          <UserDetails>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserStatus>
              <StatusDot />
              <StatusText>
                {user.isGuest ? 'Convidado' : 'Usuário Logado'}
              </StatusText>
            </UserStatus>
          </UserDetails>
        </UserInfo>

        <StatsGrid>
          <StatCard>
            <StatValue>{stats.chats}</StatValue>
            <StatLabel>Chats Criados</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.apiKeys}</StatValue>
            <StatLabel>API Keys Configuradas</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.modelsUsed}</StatValue>
            <StatLabel>Modelos Disponíveis</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>
              {stats.lastActive ? 
                new Date(stats.lastActive).toLocaleDateString('pt-BR') : 
                'N/A'
              }
            </StatValue>
            <StatLabel>Último Acesso</StatLabel>
          </StatCard>
        </StatsGrid>

        <ActionButtons>
          <Button onClick={() => navigate('/settings')}>
            ⚙️ Configurações
          </Button>
          <Button onClick={() => navigate('/ai-config')}>
            🤖 Modelos IA
          </Button>
          <Button variant="secondary" onClick={() => navigate('/history')}>
            📚 Histórico
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            🚪 Sair
          </Button>
        </ActionButtons>
      </ProfileCard>

      <QuickActions>
        <SectionTitle>🚀 Ações Rápidas</SectionTitle>
        <ActionsGrid>
          <ActionCard onClick={() => navigate('/')}>
            <ActionIcon>💬</ActionIcon>
            <ActionTitle>Novo Chat</ActionTitle>
            <ActionDescription>Inicie uma nova conversa com suas IAs configuradas</ActionDescription>
          </ActionCard>
          <ActionCard onClick={() => navigate('/ai-config')}>
            <ActionIcon>🔑</ActionIcon>
            <ActionTitle>Configurar API</ActionTitle>
            <ActionDescription>Adicione ou atualize suas chaves de API</ActionDescription>
          </ActionCard>
          <ActionCard onClick={handleClearData}>
            <ActionIcon>🧹</ActionIcon>
            <ActionTitle>Limpar Dados</ActionTitle>
            <ActionDescription>Remova todos os seus chats e configurações</ActionDescription>
          </ActionCard>
          <ActionCard onClick={() => window.open('https://github.com', '_blank')}>
            <ActionIcon>📖</ActionIcon>
            <ActionTitle>Documentação</ActionTitle>
            <ActionDescription>Veja a documentação e guias de uso</ActionDescription>
          </ActionCard>
        </ActionsGrid>
      </QuickActions>

      <APIKeyManager />
    </ProfileContainer>
  );
};

export default ProfilePage;
