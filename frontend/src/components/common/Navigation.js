import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const Brand = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1rem;
`;

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Chat' },
    { path: '/history', label: 'History' },
    { path: '/settings', label: 'Settings' }
  ];

  return (
    <NavigationContainer>
      <Brand>
        <BrandIcon>C</BrandIcon>
        CortexAI
      </Brand>
      <NavLinks>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
    </NavigationContainer>
  );
};

export default Navigation;
