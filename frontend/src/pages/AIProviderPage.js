import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OpenAIService from '../services/OpenAIService';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f4c430 0%, #8b4513 100%);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const ProviderCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 2px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  ${props => props.$active && `
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
  `}
`;

const ProviderName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProviderDescription = styled.p`
  margin: 0.5rem 0;
  opacity: 0.9;
  line-height: 1.5;
`;

const StatusBadge = styled.span`
  background: ${props => props.$online ? '#10b981' : '#ef4444'};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: auto;
`;

const TestButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TestResult = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.$success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border: 1px solid ${props => props.$success ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
  font-size: 0.9rem;
`;

const ToggleSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Switch = styled.input`
  display: none;
`;

const Slider = styled.div`
  width: 60px;
  height: 30px;
  background: ${props => props.$checked ? '#10b981' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 15px;
  position: relative;
  transition: background 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.$checked ? '32px' : '2px'};
    transition: left 0.3s ease;
  }
`;

const AIProviderPage = () => {
  const [useOpenAI, setUseOpenAI] = useState(() => {
    return localStorage.getItem('iaassembleiaddeus_use_openai') === 'true';
  });
  const [openaiStatus, setOpenaiStatus] = useState('unknown');
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    localStorage.setItem('iaassembleiaddeus_use_openai', useOpenAI.toString());
  }, [useOpenAI]);

  useEffect(() => {
    checkOpenAIStatus();
  }, []);

  const checkOpenAIStatus = async () => {
    try {
      const result = await OpenAIService.testConnection();
      if (result.success) {
        setOpenaiStatus('online');
      } else {
        setOpenaiStatus('offline');
      }
    } catch (error) {
      setOpenaiStatus('offline');
    }
  };

  const testOpenAI = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const result = await OpenAIService.getSpiritualResponse('Olá, como você está?');
      setTestResult({
        success: result.success,
        message: result.success ? 
          `✅ OpenAI funcionando! Modelo: ${result.model || 'N/A'}` : 
          `❌ Erro: ${result.error}`
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `❌ Erro ao testar: ${error.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleProviderSelect = (provider) => {
    if (provider === 'openai' && openaiStatus === 'online') {
      setUseOpenAI(true);
    } else if (provider === 'local') {
      setUseOpenAI(false);
    }
  };

  return (
    <Container>
      <Title>🤖 Configuração de IA</Title>
      
      <ProviderCard 
        $active={useOpenAI}
        onClick={() => handleProviderSelect('openai')}
      >
        <ProviderName>
          🧠 OpenAI GPT
          <StatusBadge $online={openaiStatus === 'online'}>
            {openaiStatus === 'online' ? 'Online' : 'Offline'}
          </StatusBadge>
        </ProviderName>
        <ProviderDescription>
          Use a poderosa API do OpenAI com modelos GPT-4 e GPT-3.5 para respostas mais avançadas e contextualizadas. 
          Requer conexão com internet e créditos na OpenAI.
        </ProviderDescription>
        <TestButton 
          onClick={testOpenAI} 
          disabled={testing || openaiStatus !== 'online'}
        >
          {testing ? 'Testando...' : 'Testar Conexão'}
        </TestButton>
        {testResult && (
          <TestResult $success={testResult.success}>
            {testResult.message}
          </TestResult>
        )}
      </ProviderCard>

      <ProviderCard 
        $active={!useOpenAI}
        onClick={() => handleProviderSelect('local')}
      >
        <ProviderName>
          🏛️ Motor Local
          <StatusBadge $online={true}>Sempre Online</StatusBadge>
        </ProviderName>
        <ProviderDescription>
          Motor de IA próprio desenvolvido para contexto religioso. Funciona offline, 
          sem custos e com respostas baseadas em conhecimento bíblico programado.
        </ProviderDescription>
      </ProviderCard>

      <ToggleSection>
        <h3>⚙️ Configuração Rápida</h3>
        <ToggleSwitch>
          <Switch 
            type="checkbox" 
            checked={useOpenAI}
            onChange={(e) => setUseOpenAI(e.target.checked)}
          />
          <Slider $checked={useOpenAI}></Slider>
          <span>
            {useOpenAI ? 'Usando OpenAI' : 'Usando Motor Local'}
          </span>
        </ToggleSwitch>
        <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
          {useOpenAI ? 
            '🌐 As respostas virão da OpenAI (requer créditos)' : 
            '🏛️ As respostas virão do motor local (grátis e offline)'
          }
        </p>
      </ToggleSection>
    </Container>
  );
};

export default AIProviderPage;
