import GoogleSearchService from './GoogleSearchService';

class GroqService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY || '';
    this.baseURL = 'https://api.groq.com/openai/v1/chat/completions';
    this.defaultModel = 'llama-3.3-70b-versatile'; // Modelo mais potente atual
    this.timeout = 30000; // 30 segundos
    this.googleSearch = new GoogleSearchService();
  }

  async generateResponse(prompt, options = {}) {
    try {
      if (!this.apiKey) {
        throw new Error('Groq API Key não configurada. Verifique REACT_APP_GROQ_API_KEY no arquivo .env');
      }

      const {
        model = this.defaultModel,
        maxTokens = 1000,
        temperature = 0.7,
        systemPrompt = 'Você é um assistente espiritual cristão da Assembleia de Deus. Responda com base na Bíblia e sempre com amor e sabedoria.'
      } = options;

      const requestBody = {
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
        stream: false
      };

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Tratar erros comuns
        if (response.status === 429) {
          throw new Error('Limite de requisições atingido. Tente novamente em alguns segundos.');
        } else if (response.status === 401) {
          throw new Error('API Key inválida. Verifique sua configuração.');
        } else if (response.status === 402) {
          throw new Error('Créditos insuficientes. Verifique seu saldo no Groq.');
        } else {
          throw new Error(`Erro ${response.status}: ${errorData.error?.message || 'Erro desconhecido'}`);
        }
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('Nenhuma resposta gerada pela API');
      }

      return {
        success: true,
        response: data.choices[0].message.content,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      console.error('Erro no GroqService:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Timeout: A requisição demorou muito para responder');
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  async testConnection() {
    try {
      const result = await this.generateResponse('Olá, você está funcionando?', {
        maxTokens: 50,
        temperature: 0.1
      });
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Método para resposta espiritual específica
  async getSpiritualResponse(question) {
    const systemPrompt = `Você é um assistente espiritual da Assembleia de Deus.
    Suas respostas devem:
    1. Ser baseadas na Bíblia (cite versículos quando possível)
    2. Ter um tom pastoral e acolhedor
    3. Ser claras e objetivas
    4. Incluir uma palavra de encorajamento
    5. Manter-se fiel aos princípios cristãos
    
    Responda em português, a menos que o usuário pergunte em outro idioma.`;

    return await this.generateResponse(question, {
      systemPrompt,
      temperature: 0.6,
      maxTokens: 800
    });
  }

  // Método para estudo bíblico
  async getBibleStudy(topic) {
    const systemPrompt = `Você é um professor de Bíblia da Assembleia de Deus.
    Forneça um estudo bíblico sobre o tópico solicitado, incluindo:
    1. Versículos-chave relacionados ao tópico
    2. Explicação do contexto bíblico
    3. Aplicação prática para a vida cristã
    4. Uma reflexão final
    
    Use linguagem clara e acessível.`;

    return await this.generateResponse(`Estudo bíblico sobre: ${topic}`, {
      systemPrompt,
      temperature: 0.5,
      maxTokens: 1200
    });
  }

  // Método para oração do dia
  async getDailyPrayer() {
    const systemPrompt = `Você é um pastor da Assembleia de Deus.
    
    Crie uma oração simples e poderosa para o dia. Seja direto e do coração.
    
    **ESTRUTURA:**
    - Comece com "Pai Celestial" ou "Senhor Deus"
    - Agradecimento breve
    - Pedidos específicos (força, direção, proteção)
    - Um versículo bíblico no meio
    - Termine com "Em nome de Jesus, amém"
    
    **TOM:**
    - Simples e direto
    - Do coração, não formal
    - 150-250 palavras
    - Linguagem pastoral natural
    
    **EXEMPLO:**
    "Pai Celestial, agradeço por este novo dia. Peço tua direção e força.
    
    Salmos 23:1 - 'O Senhor é meu pastor, nada me faltará.'
    
    Guia meus passos hoje. Em nome de Jesus, amém."`;

    return await this.generateResponse('Me dê uma oração simples e poderosa para hoje', {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 600
    });
  }

  // Método que combina Groq com busca no Google
  async generateResponseWithSearch(prompt, options = {}) {
    try {
      // Primeiro, buscar no Google
      console.log('🔍 Buscando no Google...');
      const searchResults = await this.googleSearch.searchGoogle(prompt, 5);
      
      // Se encontrar resultados, enriquecer o prompt
      let enrichedPrompt = prompt;
      if (searchResults && searchResults.length > 0) {
        console.log(`📊 Encontrados ${searchResults.length} resultados no Google`);
        
        // Extrair informações relevantes da busca
        const searchInfo = searchResults.slice(0, 3).map(result => 
          `Fonte: ${result.title}\nTrecho: ${result.snippet}`
        ).join('\n\n');
        
        enrichedPrompt = `${prompt}

\n=== INFORMAÇÕES RELEVANTES DA INTERNET ===
${searchInfo}

\n=== INSTRUÇÕES ===
Use as informações acima para enriquecer sua resposta, mas mantenha seu papel de assistente espiritual. 
Se as informações forem úteis, incorpore-as naturalmente. Se não forem relevantes, ignore-as.
Sempre cite as fontes quando usar informações da busca.`;
      }
      
      // Gerar resposta com o prompt enriquecido
      const response = await this.generateResponse(enrichedPrompt, options);
      
      // Adicionar informações sobre a busca
      if (response.success && searchResults && searchResults.length > 0) {
        response.searchResults = searchResults;
        response.enriched = true;
        response.searchPerformed = true;
      }
      
      return response;
      
    } catch (error) {
      console.error('Erro na busca com Google:', error);
      // Fallback para resposta sem busca
      return await this.generateResponse(prompt, options);
    }
  }

  // Método espiritual com busca
  async getSpiritualResponseWithSearch(question) {
    const lowerQuestion = question.toLowerCase();
    const asksForVerse = lowerQuestion.includes('versículo') || 
                        lowerQuestion.includes('versiculo') || 
                        lowerQuestion.includes('me dê um versículo') ||
                        lowerQuestion.includes('me de um versiculo') ||
                        lowerQuestion.includes('bíblia') ||
                        lowerQuestion.includes('biblia');
    
    let searchQuery = question;
    
    // Se pedir versículo, buscar especificamente versículos
    if (asksForVerse) {
      searchQuery = `versículo bíblico sobre ${question}`;
    }
    
    const systemPrompt = `Você é um pastor da Assembleia de Deus, com anos de experiência cuidando do rebanho.
    
    **COMO DEVE FALAR:**
    - Seja direto, simples e acolhedor
    - Use linguagem de pastor real, não de robô
    - Evite explicações longas e formais
    - Seja breve e prático
    - Demonstre amor e cuidado genuíno
    
    **SE O USUÁRIO PEDIR VERSÍCULO:**
    - Use as informações da busca para encontrar versículos relevantes
    - Inclua o versículo completo com referência
    - Explique brevemente o contexto se relevante
    - Cite a fonte se usar informações da internet
    
    **SE NÃO PEDIR VERSÍCULO:**
    - Responda diretamente à pergunta
    - Não inclua versículo automaticamente
    - Seja breve e prático
    
    **ESTRUTURA SIMPLES:**
    1. Saudação pastoral curta (ex: "Paz do Senhor!")
    2. Resposta direta à pergunta
    3. Versículo bíblico (se pedido)
    4. Aplicação prática breve
    5. Bênção final curta
    
    **NÃO FAÇA:**
    - Não explique que é uma IA
    - Não use linguagem técnica
    - Não faça explicações longas
    - Não diga "não encontrei informações na internet"
    - Não seja excessivamente formal
    
    **EXEMPLO DE RESPOSTA (sem versículo):**
    "Paz do Senhor! Que bom falar com você.
    
    [Resposta direta e simples]
    
    Que Deus te abençoe!"
    
    **EXEMPLO DE RESPOSTA (com versículo - quando pedido):**
    "Paz do Senhor! Aqui está um versículo para você.
    
    Filipenses 4:13 - 'Posso todas as coisas naquele que me fortalece.'
    
    [Breve explicação se necessário]
    
    Que Deus te abençoe!"`;

    return await this.generateResponseWithSearch(searchQuery, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 800
    });
  }

  // Método para estudo bíblico com busca
  async getBibleStudyWithSearch(topic) {
    const systemPrompt = `Você é um professor de Bíblia da Assembleia de Deus.
    Forneça um estudo bíblico sobre o tópico solicitado, incluindo:
    1. Versículos-chave relacionados ao tópico
    2. Explicação do contexto bíblico
    3. Aplicação prática para a vida cristã
    4. Uma reflexão final
    5. Use fontes confiáveis da internet quando disponível, sempre citando-as
    
    Use linguagem clara e acessível.`;

    return await this.generateResponseWithSearch(`Estudo bíblico sobre: ${topic}`, {
      systemPrompt,
      temperature: 0.5,
      maxTokens: 1500
    });
  }

  // Lista de modelos disponíveis
  getAvailableModels() {
    return [
      {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B Versatile',
        description: 'Modelo mais potente, qualidade GPT-4',
        context: 131072
      },
      {
        id: 'llama-3.1-70b-versatile',
        name: 'Llama 3.1 70B Versatile',
        description: 'Modelo versátil de alta qualidade',
        context: 131072
      },
      {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B Instant',
        description: 'Modelo rápido e eficiente',
        context: 131072
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        description: 'Excelente para tarefas complexas',
        context: 32768
      },
      {
        id: 'gemma2-9b-it',
        name: 'Gemma 2 9B',
        description: 'Modelo leve do Google',
        context: 8192
      }
    ];
  }
}

export default new GroqService();
