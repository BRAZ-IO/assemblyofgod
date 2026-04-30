import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Container = styled.nav`
  height: 56px;
  background: #1a0e08;
  border-bottom: 1px solid rgba(244, 196, 48, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: rgba(255,255,255,0.7);
    stroke-width: 2;
  }
  
  &:hover svg {
    stroke: #f4c430;
  }
`;

const BrandName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #f4c430;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: #fff;
  }
  
  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(244, 196, 48, 0.2);
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  padding: 6px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }
  
  &.active {
    color: #f4c430;
    background: rgba(244, 196, 48, 0.1);
  }
`;

const OnlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  
  .dot {
    width: 6px;
    height: 6px;
    background: #4caf50;
    border-radius: 50%;
  }
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ActionBtn = styled.button`
  background: rgba(244, 196, 48, 0.1);
  border: 1px solid rgba(244, 196, 48, 0.25);
  border-radius: 8px;
  padding: 6px 14px;
  cursor: pointer;
  color: #f4c430;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: rgba(244, 196, 48, 0.2);
    border-color: rgba(244, 196, 48, 0.5);
    color: #fff;
  }
  
  @media (max-width: 767px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

const AvatarBtn = styled.button`
  background: none;
  border: 1px solid rgba(244, 196, 48, 0.25);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(244, 196, 48, 0.5);
    background: rgba(244, 196, 48, 0.1);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1a0e08;
  border: 1px solid rgba(244, 196, 48, 0.2);
  border-radius: 12px;
  padding: 6px;
  min-width: 180px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  z-index: 1001;
  display: ${props => props.$open ? 'block' : 'none'};
`;

const DropLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const DropDivider = styled.div`
  height: 1px;
  background: rgba(244, 196, 48, 0.15);
  margin: 4px 0;
`;

const UserMenu = styled.div`
  position: relative;
`;

const NavbarPremium = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (menuOpen && !e.target.closest('.user-menu')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  const links = [
    { path: '/', label: 'Início' },
    { path: '/chat', label: 'Conversar' },
    { path: '/bible', label: 'Bíblia' },
    { path: '/prayers', label: 'Orações' },
    { path: '/hymns', label: 'Hinos' },
  ];

  return (
    <Container>
      <Left>
        <Hamburger onClick={onMenuClick}>
          <svg viewBox="0 0 24 24" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Hamburger>
        
        <BrandName onClick={() => navigate('/')}>IA Assembleia de Deus</BrandName>
        
        <Separator />
        
        <Links>
          {links.map(l => (
            <StyledLink
              key={l.path}
              to={l.path}
              className={location.pathname === l.path ? 'active' : ''}
            >
              {l.label}
            </StyledLink>
          ))}
        </Links>
      </Left>

      <Right>
        <OnlineBadge>
          <span className="dot" />
          Pastor online
        </OnlineBadge>

        <ActionBtn onClick={() => navigate('/chat?message=Preciso de uma oração')}>
          🙏 Orar
        </ActionBtn>

        <UserMenu className="user-menu">
          <AvatarBtn onClick={() => setMenuOpen(!menuOpen)}>👤</AvatarBtn>
          <Dropdown $open={menuOpen}>
            <DropLink to="/profile">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              Perfil
            </DropLink>
            <DropLink to="/settings">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              Configurações
            </DropLink>
            <DropDivider />
            <DropLink to="/help">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
              Ajuda
            </DropLink>
            <DropLink to="/logout">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Sair
            </DropLink>
          </Dropdown>
        </UserMenu>
      </Right>
    </Container>
  );
};

export default NavbarPremium;
