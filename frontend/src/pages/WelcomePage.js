import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WelcomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #343541 0%, #202123 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WelcomeCard = styled.div`
  background: #444654;
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  border: 1px solid #565869;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  
  @media (max-width: 767px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const LogoIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10a37f 0%, #0d7f61 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 32px;
  margin: 0 auto 1.5rem;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const LogoSubtitle = styled.p`
  color: #8e8ea0;
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const LoadingText = styled.div`
  color: #10a37f;
  font-size: 1rem;
  margin-top: 1rem;
  
  &::after {
    content: '';
    animation: dots 1.5s infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para login após 2 segundos
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <WelcomeContainer>
      <WelcomeCard>
                <LoadingText>Preparando sua experiência</LoadingText>
      </WelcomeCard>
    </WelcomeContainer>
  );
};

export default WelcomePage;
