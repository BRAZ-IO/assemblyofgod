import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SimpleAuth = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  console.log('🔐 SimpleAuth - isAuthenticated:', isAuthenticated());
  console.log('👤 SimpleAuth - user:', user);
  
  // Se estiver autenticado (incluindo convidado), mostra o conteúdo
  if (isAuthenticated()) {
    console.log('✅ Usuário autenticado, mostrando conteúdo');
    return children;
  }
  
  // Senão, redireciona para login
  console.log('❌ Usuário não autenticado, redirecionando para login');
  return <Navigate to="/login" replace />;
};

export default SimpleAuth;
