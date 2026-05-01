import React, { useState } from 'react';
import styled from 'styled-components';
import GroqService from '../../services/GroqService';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const TestButton = styled.button`
  background: white;
  color: #f97316;
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

const GroqTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await GroqService.testConnection();
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
      const response = await GroqService.getSpiritualResponse(
        "Como posso fortalecer minha fé em tempos difíceis?"
      );
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testDailyPrayer = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await GroqService.getDailyPrayer();
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
      const response = await GroqService.getBibleStudy("Oração");
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>🚀 Teste da API Groq</Title>
      
      <div style={{ textAlign: 'center' }}>
        <TestButton onClick={testConnection} disabled={loading}>
          ⚡ Testar Conexão
        </TestButton>
        <TestButton onClick={testSpiritualResponse} disabled={loading}>
          🙏 Testar Resposta Espiritual
        </TestButton>
        <TestButton onClick={testDailyPrayer} disabled={loading}>
          📖 Testar Oração do Dia
        </TestButton>
        <TestButton onClick={testBibleStudy} disabled={loading}>
          📚 Testar Estudo Bíblico
        </TestButton>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div>Testando API...</div>
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
    </Container>
  );
};

export default GroqTest;
