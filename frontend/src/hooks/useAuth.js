import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado
    const userData = localStorage.getItem('cortexai_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userWithTimestamp = {
      ...userData,
      loginTime: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    localStorage.setItem('cortexai_user', JSON.stringify(userWithTimestamp));
    setUser(userWithTimestamp);
    return userWithTimestamp;
  };

  const logout = () => {
    localStorage.removeItem('cortexai_user');
    setUser(null);
    navigate('/login');
  };

  const updateLastActive = () => {
    if (user) {
      const updatedUser = {
        ...user,
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('cortexai_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isGuest = () => {
    return user?.isGuest || false;
  };

  const canAccessFeatures = () => {
    // Convidados podem acessar funcionalidades básicas
    return isAuthenticated();
  };

  const getUserAPIKeys = () => {
    if (!user) return {};
    
    const userApiKeys = localStorage.getItem('cortexai_user_api_keys');
    return userApiKeys ? JSON.parse(userApiKeys) : {};
  };

  const hasAPIKey = (provider) => {
    const keys = getUserAPIKeys();
    return keys[provider] && keys[provider].trim() !== '';
  };

  const getAvailableProviders = () => {
    const keys = getUserAPIKeys();
    return Object.keys(keys).filter(key => keys[key] && keys[key].trim() !== '');
  };

  return {
    user,
    loading,
    login,
    logout,
    updateLastActive,
    isAuthenticated,
    isGuest,
    canAccessFeatures,
    getUserAPIKeys,
    hasAPIKey,
    getAvailableProviders
  };
};

export default useAuth;
