import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #343541 0%, #202123 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: #444654;
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  border: 1px solid #565869;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 767px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10a37f 0%, #0d7f61 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  margin: 0 auto 1rem;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const LogoSubtitle = styled.p`
  color: #8e8ea0;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const QuickAccess = styled.div`
  margin-bottom: 2rem;
`;

const QuickAccessTitle = styled.h3`
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background-color: #343541;
  color: white;
  border: 1px solid #565869;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  
  &::placeholder {
    color: #8e8ea0;
  }
  
  &:focus {
    border-color: #10a37f;
  }
  
  @media (max-width: 767px) {
    font-size: 16px; /* Previne zoom no iOS */
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #10a37f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #10a37f, #0d7f61);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (hover: none) {
    &:active {
      transform: translateY(0);
    }
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #8e8ea0;
  border: 1px solid #565869;
  border-radius: 8px;
  padding: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #343541;
    color: white;
    border-color: #10a37f;
  }
  
  @media (hover: none) {
    &:active {
      background-color: #343541;
      color: white;
    }
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #565869;
  }
`;

const DividerText = styled.span`
  background: #444654;
  padding: 0 1rem;
  color: #8e8ea0;
  font-size: 0.9rem;
  position: relative;
`;

const GuestButton = styled.button`
  background: transparent;
  color: #8e8ea0;
  border: 1px solid #565869;
  border-radius: 8px;
  padding: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #343541;
    color: white;
    border-color: #10a37f;
  }
  
  @media (hover: none) {
    &:active {
      background-color: #343541;
      color: white;
    }
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulação de login (em produção, conectar com backend)
      if (formData.email && formData.password) {
        // Simular autenticação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Salvar dados do usuário no localStorage
        const userData = {
          email: formData.email,
          name: formData.email.split('@')[0],
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('cortexai_user', JSON.stringify(userData));
        
        setSuccess('Login realizado com sucesso!');
        
        // Redirecionar após 1 segundo
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError('Por favor, preencha todos os campos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    console.log('🚀 Iniciando acesso como convidado...');
    setLoading(true);
    
    // Acesso como convidado
    const guestData = {
      email: 'guest@cortexai.com',
      name: 'Guest User',
      isLoggedIn: false,
      isGuest: true,
      loginTime: new Date().toISOString()
    };
    
    console.log('📝 Dados do convidado:', guestData);
    
    // Salvar diretamente no localStorage
    localStorage.setItem('cortexai_user', JSON.stringify(guestData));
    console.log('💾 Salvo no localStorage');
    
    // Usar o hook para atualizar o estado
    login(guestData);
    console.log('✅ Hook login chamado');
    
    // Redirecionar imediatamente
    console.log('🔄 Redirecionando para dashboard...');
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginCard>
        
        <QuickAccess>
          <QuickAccessTitle>🚀 Acesso Rápido</QuickAccessTitle>
          <LoginButton onClick={handleGuestAccess} disabled={loading}>
            {loading ? 'Preparando...' : '🎉 Entrar como Convidado'}
          </LoginButton>
        </QuickAccess>

        <Divider>
          <DividerText>ou faça login com sua conta</DividerText>
        </Divider>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <SecondaryButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : '📧 Entrar com E-mail'}
          </SecondaryButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginForm;
