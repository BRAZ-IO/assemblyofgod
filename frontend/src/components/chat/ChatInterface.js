import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import IAAssembleiaDeDeusEngine from '../../services/IAAssembleiaDeDeusEngine';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

const Message = styled.div`
  display: flex;
  max-width: 70%;
  
  &.user-message {
    align-self: flex-end;
  }
  
  &.ai-message {
    align-self: flex-start;
  }
`;

const MessageBubble = styled.div`
  background: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$isUser ? '#333' : 'white'};
  padding: 1rem 1.5rem;
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  
  p {
    margin: 0;
    line-height: 1.5;
  }
  
  code {
    background: rgba(99, 102, 241, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0.5rem 0;
  
    code {
      background: transparent;
      padding: 0;
    }
  }
  
  .markdown-content {
    position: relative;
    
    h1, h2, h3, h4 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      color: #a5b4fc;
    }
    
    code {
      background: rgba(99, 102, 241, 0.2);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    pre {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 0.5rem 0;
      
      code {
        background: transparent;
        padding: 0;
        color: #a5b4fc;
      }
    }
    
    blockquote {
      border-left: 3px solid #6366f1;
      padding-left: 1rem;
      margin: 0.5rem 0;
      opacity: 0.8;
    }
    
    ul, ol {
      padding-left: 1.5rem;
    }
    
    li {
      margin: 0.25rem 0;
    }
    
    strong {
      color: #a5b4fc;
      font-weight: 600;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 1.5rem;
    bottom: 1rem;
    width: 2px;
    height: 1.2em;
    background: #a5b4fc;
    animation: blink 1s infinite;
    display: none;
  }
  
  &:hover::after {
    display: none;
  }
`;

const StreamingCursor = styled.div`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: #a5b4fc;
  margin-left: 2px;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const EnrichedBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  gap: 4px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: 0.5rem;
  display: block;
`;

const InputContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  max-width: 100%;
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  resize: none;
  min-height: 50px;
  max-height: 120px;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 0.3rem;
  padding: 1rem 1.5rem;
  
  span {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: typing 1.4s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-10px);
    }
  }
`;

const ThinkingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  
  .thinking-text {
    color: #a5b4fc;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .icon {
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
  
  .dots {
    display: flex;
    gap: 0.35rem;
    align-items: center;
    
    .dot {
      width: 8px;
      height: 8px;
      background: #6366f1;
      border-radius: 50%;
      animation: bounce 1.4s ease-in-out infinite;
      
      &:nth-child(1) {
        animation-delay: 0s;
      }
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0.6);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;

const Suggestions = styled.div`
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ChatInterface = () => {
  const location = useLocation();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Paz do Senhor! Sou IA Assembleia de Deus, seu assistente espiritual. Como posso ajudar você hoje?',
      sender: 'ai',
      timestamp: new Date(),
      enriched: false,
      isStreaming: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('IA Assembleia de Deus está orando');
  const [currentChatId, setCurrentChatId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Inicializar o motor de IA
  const [aiEngine] = useState(() => new IAAssembleiaDeDeusEngine());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detectar mudanças de rota e atualizar o chat
  useEffect(() => {
    console.log('🔄 ChatInterface - Rota mudou:', location.pathname, 'chatId:', chatId);
    
    // Se tiver um chatId na URL, atualizar o estado
    if (chatId) {
      setCurrentChatId(chatId);
      localStorage.setItem('iaassembleiaddeus_active_chat', chatId);
      
      // Carregar mensagens do chat específico (se existir)
      const savedChats = JSON.parse(localStorage.getItem('iaassembleiaddeus_chats') || '[]');
      const chat = savedChats.find(c => c.id.toString() === chatId);
      
      if (chat && chat.messages) {
        // Carregar mensagens salvas do chat
        console.log('📝 Carregando mensagens do chat:', chatId);
        // Aqui você poderia carregar as mensagens salvas
      } else {
        // Resetar mensagens para novo chat
        resetChat();
      }
    } else {
      // Se não tiver chatId, verificar se há um chat ativo salvo
      const activeChatId = localStorage.getItem('iaassembleiaddeus_active_chat');
      if (activeChatId) {
        setCurrentChatId(activeChatId);
      } else {
        resetChat();
      }
    }
  }, [location.pathname, chatId]);

  // Ouvir eventos da sidebar
  useEffect(() => {
    const handleNewChat = (event) => {
      console.log('🆕 ChatInterface recebeu novo chat:', event.detail);
      resetChat();
      setCurrentChatId(event.detail.activeChatId);
    };

    const handleChatSelected = (event) => {
      console.log('📝 ChatInterface recebeu chat selecionado:', event.detail);
      setCurrentChatId(event.detail.chatId);
      resetChat();
    };

    window.addEventListener('newChatCreated', handleNewChat);
    window.addEventListener('chatSelected', handleChatSelected);

    return () => {
      window.removeEventListener('newChatCreated', handleNewChat);
      window.removeEventListener('chatSelected', handleChatSelected);
    };
  }, []);

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: 'Paz do Senhor! Sou IA Assembleia de Deus, seu assistente espiritual. Como posso ajudar você hoje?',
        sender: 'ai',
        timestamp: new Date(),
        enriched: false,
        isStreaming: false
      }
    ]);
    setInputText('');
    setIsTyping(false);
    setIsThinking(false);
    setThinkingMessage('IA Assembleia de Deus está orando');
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      enriched: false
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsThinking(true);
    
    // Mensagens de pensamento variadas como ChatGPT
    const thinkingMessages = [
      'IA Assembleia de Deus está orando',
      'Analisando sua pergunta',
      'Processando informações',
      'Buscando a melhor resposta',
      'Considerando o contexto',
      'Organizando ideias',
      'Preparando resposta'
    ];
    setThinkingMessage(thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]);

    // Mudar mensagem de pensamento periodicamente para parecer mais dinâmico
    const thinkingInterval = setInterval(() => {
      setThinkingMessage(thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]);
    }, 1500);

    try {
      // Simular tempo de processamento para parecer mais natural
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Limpar interval de pensamento
      clearInterval(thinkingInterval);
      
      setIsThinking(false);
      setIsTyping(true);
      
      // Usar o motor de IA personalizado
      const context = messages.map(m => ({ message: m.text, role: m.sender }));
      const aiResponse = await aiEngine.processMessage(inputText, context);
      
      // Criar mensagem de IA com streaming
      const responseMessage = {
        id: messages.length + 2,
        text: '',
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type,
        confidence: aiResponse.confidence,
        enriched: aiResponse.enriched || false,
        isStreaming: true
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Streaming de resposta (caracter por caracter)
      await streamResponse(responseMessage.id, aiResponse.text);
      
      // Atualizar sugestões baseadas no contexto
      const newSuggestions = aiEngine.generateSuggestions(context);
      setSuggestions(newSuggestions);
      
    } catch (error) {
      console.error('Erro no motor de IA:', error);
      
      // Limpar interval de pensamento
      clearInterval(thinkingInterval);
      
      setIsThinking(false);
      
      const errorResponse = {
        id: messages.length + 2,
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        sender: 'ai',
        timestamp: new Date(),
        type: 'error',
        confidence: 0,
        enriched: false,
        isStreaming: false
      };
      
      setMessages(prev => [...prev, errorResponse]);
    }
    
    setIsTyping(false);
  };
  
  const streamResponse = async (messageId, fullText) => {
    const chars = fullText.split('');
    let currentText = '';
    
    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, text: currentText } : msg
      ));
      
      // Scroll automático durante streaming
      scrollToBottom();
      
      // Velocidade variável para parecer mais natural (mais rápido como ChatGPT)
      const delay = chars[i] === ' ' || chars[i] === '\n' ? 10 : 5 + Math.random() * 10;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Marcar como não streaming ao terminar
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStreaming: false } : msg
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <Message
            key={message.id}
            className={message.sender === 'user' ? 'user-message' : 'ai-message'}
          >
            <MessageBubble $isUser={message.sender === 'user'}>
              {message.enriched && (
                <EnrichedBadge>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  Pesquisa
                </EnrichedBadge>
              )}
              <div className="markdown-content">
                <ReactMarkdown>{message.text}</ReactMarkdown>
                {message.isStreaming && <StreamingCursor />}
              </div>
              <MessageTime>
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </MessageTime>
            </MessageBubble>
          </Message>
        ))}
        {isThinking && (
          <Message className="ai-message">
            <MessageBubble $isUser={false}>
              <ThinkingIndicator>
                <div className="thinking-text">
                  <span className="icon">💭</span>
                  <span>{thinkingMessage}</span>
                </div>
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </ThinkingIndicator>
            </MessageBubble>
          </Message>
        )}
        {isTyping && (
          <Message className="ai-message">
            <MessageBubble $isUser={false}>
              <TypingIndicator>
                <span></span>
                <span></span>
                <span></span>
              </TypingIndicator>
            </MessageBubble>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <InputWrapper>
          <MessageInput
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={inputText.trim() === '' || isTyping || isThinking}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </SendButton>
        </InputWrapper>
        <Suggestions>
          {suggestions.length > 0 ? (
            <span>Sugestões: {suggestions.join(' | ')}</span>
          ) : (
            <span>Sugestões: Ajuda com código | Criar ideias | Resolver problemas</span>
          )}
        </Suggestions>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
