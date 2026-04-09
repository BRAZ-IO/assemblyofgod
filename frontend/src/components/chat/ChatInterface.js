import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

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
  background: ${props => props.isUser ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isUser ? '#333' : 'white'};
  padding: 1rem 1.5rem;
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  p {
    margin: 0;
    line-height: 1.5;
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

const Suggestions = styled.div`
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m CortexAI, your intelligent assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      'I understand! I can help you with that task. Let\'s analyze the problem together.',
      'Great question! Based on your request, I suggest exploring these approaches...',
      'That sounds interesting! Let me think of some creative solutions for you.',
      'Absolutely! I can automate that task for you. Let\'s get started?',
      'Excellent idea! I can help structure your thinking and find the best solution.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
            <MessageBubble isUser={message.sender === 'user'}>
              <p>{message.text}</p>
              <MessageTime>
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </MessageTime>
            </MessageBubble>
          </Message>
        ))}
        {isTyping && (
          <Message className="ai-message">
            <MessageBubble isUser={false}>
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
            disabled={inputText.trim() === '' || isTyping}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </SendButton>
        </InputWrapper>
        <Suggestions>
          Suggestions: Help with code | Create ideas | Solve problems
        </Suggestions>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
