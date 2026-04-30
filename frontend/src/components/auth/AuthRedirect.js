import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado, redireciona para login
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Se estiver autenticado (incluindo convidado), renderiza os filhos
  if (isAuthenticated()) {
    return children;
  }

  // Enquanto redireciona, mostra tela de carregamento
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#343541',
      color: 'white'
    }}>
      <div>Redirecionando...</div>
    </div>
  );
};

export default AuthRedirect;
