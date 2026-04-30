import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  position: relative;
`;

const SelectorButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #10a37f;
  }
  
  @media (max-width: 767px) {
    padding: 6px 10px;
    font-size: 12px;
    gap: 6px;
    
    span {
      display: none;
    }
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const AIIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 4px;
  background: ${props => props.color || '#10a37f'};
  color: white;
  font-size: 12px;
  
  @media (max-width: 767px) {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #2e2f32;
  border: 1px solid #444654;
  border-radius: 8px;
  padding: 8px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (max-width: 767px) {
    position: fixed;
    top: auto;
    bottom: 20px;
    right: 20px;
    left: 20px;
    margin-top: 0;
    min-width: auto;
    max-height: 50vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const AIOption = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #343541;
  }
  
  ${props => props.active && `
    background: #343541;
    border-left: 3px solid #10a37f;
  `}
  
  @media (max-width: 767px) {
    padding: 10px;
    gap: 10px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background: #343541;
    }
  }
`;

const AIInfo = styled.div`
  flex: 1;
`;

const AIName = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const AIDescription = styled.div`
  font-size: 12px;
  color: #8e8ea0;
  
  @media (max-width: 767px) {
    font-size: 11px;
  }
`;

const AIStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'online' ? '#10a37f' : '#ef4444'};
`;

const AI_MODELOS = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Modelo mais avançado',
    color: '#10a37f',
    status: 'online',
    provider: 'OpenAI'
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Assistente inteligente',
    color: '#f59e0b',
    status: 'online',
    provider: 'Anthropic'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal do Google',
    color: '#3b82f6',
    status: 'online',
    provider: 'Google'
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    description: 'Open source da Meta',
    color: '#8b5cf6',
    status: 'online',
    provider: 'Meta'
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'Modelo europeu',
    color: '#ec4899',
    status: 'online',
    provider: 'Mistral AI'
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'IA com humor',
    color: '#ef4444',
    status: 'offline',
    provider: 'xAI'
  }
];

const AISelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState(null);

  useEffect(() => {
    // Carregar IA selecionada do localStorage
    const savedAI = localStorage.getItem('cortexai_selected_ai');
    if (savedAI) {
      const ai = AI_MODELOS.find(model => model.id === savedAI);
      if (ai) setSelectedAI(ai);
    } else {
      // Default para GPT-4
      setSelectedAI(AI_MODELOS[0]);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectAI = (ai) => {
    setSelectedAI(ai);
    localStorage.setItem('cortexai_selected_ai', ai.id);
    setIsOpen(false);
    
    // Disparar evento para notificar mudança de IA
    window.dispatchEvent(new CustomEvent('aiChanged', { detail: ai }));
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.ai-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!selectedAI) return null;

  return (
    <SelectorContainer className="ai-selector">
      <SelectorButton onClick={toggleDropdown}>
        <AIIcon color={selectedAI.color}>
          {selectedAI.name.charAt(0)}
        </AIIcon>
        <span>{selectedAI.name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </SelectorButton>

      <DropdownMenu isOpen={isOpen}>
        {AI_MODELOS.map((ai) => (
          <AIOption
            key={ai.id}
            active={selectedAI.id === ai.id}
            onClick={() => selectAI(ai)}
            style={{ opacity: ai.status === 'offline' ? 0.6 : 1 }}
          >
            <AIIcon color={ai.color}>
              {ai.name.charAt(0)}
            </AIIcon>
            <AIInfo>
              <AIName>{ai.name}</AIName>
              <AIDescription>{ai.description}</AIDescription>
            </AIInfo>
            <AIStatus status={ai.status} />
          </AIOption>
        ))}
      </DropdownMenu>
    </SelectorContainer>
  );
};

export default AISelector;
