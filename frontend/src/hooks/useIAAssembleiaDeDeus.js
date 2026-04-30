import { useState, useEffect, useCallback } from 'react';
import IAAssembleiaDeDeusEngine from '../services/IAAssembleiaDeDeusEngine';

/**
 * Hook personalizado para gerenciar o motor de IA Assembleia de Deus
 */
export const useIAAssembleiaDeDeus = () => {
  const [aiEngine] = useState(() => new IAAssembleiaDeDeusEngine());
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [context, setContext] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [engineInfo, setEngineInfo] = useState(null);

  // Inicializar informações do motor
  useEffect(() => {
    if (aiEngine) {
      setEngineInfo(aiEngine.getInfo());
      // Gerar sugestões iniciais
      const initialSuggestions = aiEngine.generateSuggestions([]);
      setSuggestions(initialSuggestions);
    }
  }, [aiEngine]);

  /**
   * Processa uma mensagem usando o motor de IA
   */
  const processMessage = useCallback(async (message, messageContext = []) => {
    if (!aiEngine || !message || message.trim() === '') {
      return {
        text: 'Por favor, forneça uma mensagem válida.',
        type: 'error',
        confidence: 0
      };
    }

    setIsProcessing(true);
    
    try {
      // Processar a mensagem com o motor de IA
      const response = await aiEngine.processMessage(message, messageContext);
      
      // Atualizar estado
      setLastResponse(response);
      setContext(prev => {
        const newContext = [...prev, { message, role: 'user', timestamp: new Date().toISOString() }];
        const newContextWithAI = [...newContext, { 
          message: response.text, 
          role: 'ai', 
          timestamp: new Date().toISOString(),
          type: response.type,
          confidence: response.confidence
        }];
        
        // Manter apenas as últimas 10 mensagens no contexto
        return newContextWithAI.slice(-10);
      });
      
      // Atualizar sugestões baseadas no contexto
      const newSuggestions = aiEngine.generateSuggestions(newContext);
      setSuggestions(newSuggestions);
      
      return response;
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        type: 'error',
        confidence: 0
      };
    } finally {
      setIsProcessing(false);
    }
  }, [aiEngine]);

  /**
   * Limpa o contexto da conversa
   */
  const clearContext = useCallback(() => {
    setContext([]);
    if (aiEngine) {
      aiEngine.clearContext();
    }
  }, [aiEngine]);

  /**
   * Atualiza sugestões
   */
  const refreshSuggestions = useCallback(() => {
    if (aiEngine) {
      const newSuggestions = aiEngine.generateSuggestions(context);
      setSuggestions(newSuggestions);
    }
  }, [aiEngine, context]);

  return {
    aiEngine,
    isProcessing,
    lastResponse,
    context,
    suggestions,
    engineInfo,
    processMessage,
    clearContext,
    refreshSuggestions
  };
};

export default useIAAssembleiaDeDeus;
