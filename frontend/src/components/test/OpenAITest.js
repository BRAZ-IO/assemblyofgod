import React, { useState } from 'react';
import styled from 'styled-components';
import OpenAIService from '../../services/OpenAIService';

const TestContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f4c430 0%, #8b4513 100%);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TestTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const TestButton = styled.button`
  background: white;
  color: #8b4513;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultArea = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  min-height: 100px;
  max-height: 400px;
  overflow-y: auto;
`;

const StatusMessage = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-weight: bold;
`;

const SuccessMessage = styled(StatusMessage)`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(StatusMessage)`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #8b4513;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const OpenAITest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await OpenAIService.testConnection();
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testSpiritualResponse = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await OpenAIService.getSpiritualResponse(
        "Como posso fortalecer minha fé em tempos difíceis?"
      );
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testBibleStudy = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await OpenAIService.getBibleStudy("Oração");
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestContainer>
      <TestTitle>🧪 Teste da API OpenAI</TestTitle>
      
      <div style={{ textAlign: 'center' }}>
        <TestButton onClick={testConnection} disabled={loading}>
          🔄 Testar Conexão
        </TestButton>
        <TestButton onClick={testSpiritualResponse} disabled={loading}>
          🙏 Testar Resposta Espiritual
        </TestButton>
        <TestButton onClick={testBibleStudy} disabled={loading}>
          📖 Testar Estudo Bíblico
        </TestButton>
      </div>

      {loading && (
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner />
          <p style={{ color: 'white', marginTop: '10px' }}>Testando API...</p>
        </div>
      )}

      {error && (
        <ErrorMessage>
          ❌ Erro: {error}
        </ErrorMessage>
      )}

      {result && (
        <ResultArea>
          {result.success ? (
            <div>
              <SuccessMessage>
                ✅ Sucesso! Modelo: {result.model || 'N/A'}
              </SuccessMessage>
              
              <h4>Resposta:</h4>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {result.response}
              </p>
              
              {result.usage && (
                <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                  <h5>Estatísticas de Uso:</h5>
                  <p>Tokens usados: {result.usage.total_tokens}</p>
                  <p>Prompt tokens: {result.usage.prompt_tokens}</p>
                  <p>Completion tokens: {result.usage.completion_tokens}</p>
                </div>
              )}
            </div>
          ) : (
            <ErrorMessage>
              ❌ Falha: {result.error}
            </ErrorMessage>
          )}
        </ResultArea>
      )}
    </TestContainer>
  );
};

export default OpenAITest;
