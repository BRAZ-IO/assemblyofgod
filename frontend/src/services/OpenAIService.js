class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    this.baseURL = 'https://api.openai.com/v1';
    this.defaultModel = 'gpt-4o-mini'; // Modelo mais econômico
    this.timeout = 30000; // 30 segundos
  }

  async generateResponse(prompt, options = {}) {
    try {
      if (!this.apiKey) {
        throw new Error('OpenAI API Key não configurada. Verifique REACT_APP_OPENAI_API_KEY no arquivo .env');
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

      const response = await fetch(`${this.baseURL}/chat/completions`, {
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
          throw new Error('Limite de requisições atingido. Tente novamente em alguns minutos.');
        } else if (response.status === 401) {
          throw new Error('API Key inválida. Verifique sua configuração.');
        } else if (response.status === 402) {
          throw new Error('Créditos insuficientes. Verifique seu saldo na OpenAI.');
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
      console.error('Erro no OpenAIService:', error);
      
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
}

export default new OpenAIService();
