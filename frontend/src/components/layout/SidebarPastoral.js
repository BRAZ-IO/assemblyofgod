import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.aside`
  width: 240px;
  height: 100vh;
  height: 100dvh;
  background: #1a0e08;
  border-right: 1px solid rgba(244, 196, 48, 0.15);
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

const Header = styled.div`
  padding: 8px 12px 20px;
  border-bottom: 1px solid rgba(244, 196, 48, 0.1);
  margin-bottom: 12px;
`;

const Brand = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f4c430;
  cursor: pointer;
  margin-bottom: 4px;
  
  &:hover { color: #fff; }
`;

const Greeting = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.4);
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  
  .dot {
    width: 5px;
    height: 5px;
    background: #4caf50;
    border-radius: 50%;
  }
`;

const Section = styled.div`
  margin-bottom: 8px;
`;

const SectionLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255,255,255,0.3);
  padding: 12px 12px 6px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  font-weight: 500;
  
  background: ${props => props.$active ? 'rgba(244, 196, 48, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#f4c430' : 'rgba(255,255,255,0.6)'};
  
  &:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
  }
  
  .icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(244, 196, 48, 0.1);
  margin: 8px 12px;
`;

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 4px 0;
`;

const QuickBtn = styled.div`
  padding: 10px 8px;
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: rgba(244, 196, 48, 0.12);
    border-color: rgba(244, 196, 48, 0.3);
  }
  
  .icon {
    font-size: 18px;
    display: block;
    margin-bottom: 4px;
  }
  
  .label {
    font-size: 10px;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid rgba(244, 196, 48, 0.1);
  text-align: center;
  
  .verse {
    font-size: 11px;
    font-style: italic;
    color: rgba(255,255,255,0.4);
    line-height: 1.4;
    margin-bottom: 4px;
  }
  
  .ref {
    font-size: 10px;
    font-weight: 600;
    color: #f4c430;
  }
`;

const SidebarPastoral = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const go = (path) => {
    navigate(path);
    if (window.innerWidth <= 767) onClose();
  };

  const hour = time.getHours();
  const greeting = hour < 12 ? 'Bom dia, irmão(ã)!' : hour < 18 ? 'Boa tarde, irmão(ã)!' : 'Boa noite, irmão(ã)!';

  const mainNav = [
    { icon: '🏠', label: 'Início', path: '/' },
    { icon: '💬', label: 'Conversar', path: '/chat' },
    { icon: '📖', label: 'Bíblia', path: '/bible' },
    { icon: '🙏', label: 'Orações', path: '/prayers' },
    { icon: '🎵', label: 'Hinos', path: '/hymns' },
  ];

  const moreNav = [
    { icon: '📅', label: 'Eventos', path: '/events' },
    { icon: '👥', label: 'Comunidade', path: '/community' },
    { icon: '👤', label: 'Perfil', path: '/profile' },
    { icon: '⚙️', label: 'Configurações', path: '/settings' },
  ];

  const quickActions = [
    { icon: '🙏', label: 'Orar', action: () => go('/chat?message=Preciso de uma oração') },
    { icon: '📜', label: 'Versículo', action: () => go('/bible?daily=true') },
    { icon: '📖', label: 'Devocional', action: () => go('/devotional') },
    { icon: '❤️', label: 'Ofertar', action: () => go('/donate') },
  ];

  return (
    <Container $isOpen={isOpen}>
      <Header>
        <Brand onClick={() => go('/')}>IA Assembleia de Deus</Brand>
        <Greeting>{greeting}</Greeting>
        <StatusBadge>
          <span className="dot" />
          Pastor online
        </StatusBadge>
      </Header>

      <Section>
        <SectionLabel>Menu</SectionLabel>
        {mainNav.map(item => (
          <Item
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => go(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Item>
        ))}
      </Section>

      <Divider />

      <Section>
        <SectionLabel>Mais</SectionLabel>
        {moreNav.map(item => (
          <Item
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => go(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Item>
        ))}
      </Section>

      <Divider />

      <Section>
        <SectionLabel>Acesso Rápido</SectionLabel>
        <QuickGrid>
          {quickActions.map((a, i) => (
            <QuickBtn key={i} onClick={a.action}>
              <span className="icon">{a.icon}</span>
              <span className="label">{a.label}</span>
            </QuickBtn>
          ))}
        </QuickGrid>
      </Section>

      <Footer>
        <div className="verse">"O Senhor é o meu pastor; nada me faltará."</div>
        <div className="ref">Salmos 23:1</div>
      </Footer>
    </Container>
  );
};

export default SidebarPastoral;
