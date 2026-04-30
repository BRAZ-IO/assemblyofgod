/**
 * Religious API Service - Serviço de API para processamento NLP religioso
 * Consome API externa para análise de linguagem natural com contexto bíblico
 */

class ReligiousAPIService {
  constructor() {
    // Configurações da API
    this.baseURL = process.env.REACT_APP_RELIGIOUS_API_URL || 'https://api.religious-ai.com/v1';
    this.apiKey = process.env.REACT_APP_RELIGIOUS_API_KEY || '';
    this.timeout = 10000; // 10 segundos
    
    // Endpoints disponíveis
    this.endpoints = {
      analyze: '/analyze',
      intent: '/intent',
      sentiment: '/sentiment',
      bible: '/bible',
      prayer: '/prayer',
      counsel: '/counsel',
      verse: '/verse'
    };
  }

  /**
   * Faz requisição HTTP para a API
   */
  async makeRequest(endpoint, data = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Version': '1.0'
      },
      body: JSON.stringify({
        ...data,
        context: 'religious',
        language: 'pt-BR'
      })
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: A requisição demorou muito para responder');
      }
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  /**
   * Analisa mensagem completa (intenção + sentimento + contexto)
   */
  async analyzeMessage(message, userContext = {}) {
    try {
      const response = await this.makeRequest(this.endpoints.analyze, {
        message,
        user_context: userContext,
        features: ['intent', 'sentiment', 'entities', 'keywords', 'biblical_context']
      });

      return {
        intent: response.intent || 'general',
        sentiment: response.sentiment || { score: 0, label: 'neutral' },
        entities: response.entities || [],
        keywords: response.keywords || [],
        biblicalContext: response.biblical_context || null,
        confidence: response.confidence || 0.7,
        suggestions: response.suggestions || []
      };
    } catch (error) {
      console.error('Erro na análise da mensagem:', error);
      return this.getFallbackAnalysis(message);
    }
  }

  /**
   * Classifica intenção da mensagem
   */
  async classifyIntent(message) {
    try {
      const response = await this.makeRequest(this.endpoints.intent, {
        message,
        intents: ['greeting', 'prayer', 'bible', 'praise', 'question', 'help', 'thanks', 'testimony']
      });

      return response.intent || 'general';
    } catch (error) {
      console.error('Erro na classificação de intenção:', error);
      return this.getFallbackIntent(message);
    }
  }

  /**
   * Analisa sentimento da mensagem
   */
  async analyzeSentiment(message) {
    try {
      const response = await this.makeRequest(this.endpoints.sentiment, {
        message
      });

      return response.sentiment || { score: 0, label: 'neutral' };
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      return this.getFallbackSentiment(message);
    }
  }

  /**
   * Busca versículo bíblico baseado no tópico
   */
  async getBibleVerse(topic) {
    try {
      const response = await this.makeRequest(this.endpoints.verse, {
        topic,
        translation: 'nvi'
      });

      return response.verse || null;
    } catch (error) {
      console.error('Erro na busca de versículo:', error);
      return this.getFallbackVerse(topic);
    }
  }

  /**
   * Gera oração personalizada
   */
  async generatePrayer(intention, details = {}) {
    try {
      const response = await this.makeRequest(this.endpoints.prayer, {
        intention,
        details,
        style: 'contemporary'
      });

      return response.prayer || null;
    } catch (error) {
      console.error('Erro na geração de oração:', error);
      return this.getFallbackPrayer(intention);
    }
  }

  /**
   * Gera aconselhamento bíblico
   */
  async generateCounseling(topic, situation = '') {
    try {
      const response = await this.makeRequest(this.endpoints.counsel, {
        topic,
        situation,
        approach: 'biblical'
      });

      return response.counseling || null;
    } catch (error) {
      console.error('Erro no aconselhamento:', error);
      return this.getFallbackCounseling(topic);
    }
  }

  /**
   * Busca passagem bíblica
   */
  async searchBible(query, book = null, chapter = null) {
    try {
      const response = await this.makeRequest(this.endpoints.bible, {
        query,
        book,
        chapter,
        limit: 10
      });

      return response.passages || [];
    } catch (error) {
      console.error('Erro na busca bíblica:', error);
      return this.getFallbackBibleSearch(query);
    }
  }

  /**
   * Análise fallback quando API está indisponível
   */
  getFallbackAnalysis(message) {
    const lowerMessage = message.toLowerCase();
    
    // Detecção simples de intenção
    let intent = 'general';
    if (lowerMessage.includes('oração') || lowerMessage.includes('orar')) intent = 'prayer';
    else if (lowerMessage.includes('bíblia') || lowerMessage.includes('versículo')) intent = 'bible';
    else if (lowerMessage.includes('aleluia') || lowerMessage.includes('louvor')) intent = 'praise';
    else if (lowerMessage.includes('testemunho') || lowerMessage.includes('milagre')) intent = 'testimony';

    // Detecção simples de sentimento
    let sentiment = { score: 0, label: 'neutral' };
    if (lowerMessage.includes('aleluia') || lowerMessage.includes('glória')) {
      sentiment = { score: 0.8, label: 'positive' };
    } else if (lowerMessage.includes('triste') || lowerMessage.includes('difícil')) {
      sentiment = { score: -0.6, label: 'negative' };
    }

    return {
      intent,
      sentiment,
      entities: [],
      keywords: [],
      biblicalContext: null,
      confidence: 0.5,
      suggestions: []
    };
  }

  /**
   * Classificação fallback de intenção
   */
  getFallbackIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('oração') || lowerMessage.includes('orar')) return 'prayer';
    if (lowerMessage.includes('bíblia') || lowerMessage.includes('versículo')) return 'bible';
    if (lowerMessage.includes('aleluia') || lowerMessage.includes('louvor')) return 'praise';
    if (lowerMessage.includes('testemunho') || lowerMessage.includes('milagre')) return 'testimony';
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('conselho')) return 'help';
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('graças')) return 'thanks';
    
    return 'general';
  }

  /**
   * Análise fallback de sentimento
   */
  getFallbackSentiment(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('aleluia') || lowerMessage.includes('glória') || lowerMessage.includes('feliz')) {
      return { score: 0.8, label: 'positive' };
    }
    if (lowerMessage.includes('triste') || lowerMessage.includes('difícil') || lowerMessage.includes('angustiado')) {
      return { score: -0.6, label: 'negative' };
    }
    
    return { score: 0, label: 'neutral' };
  }

  /**
   * Versículo fallback
   */
  getFallbackVerse(topic) {
    const verses = {
      comfort: { reference: 'Mateus 11:28', text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
      strength: { reference: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.' },
      peace: { reference: 'João 14:27', text: 'Deixo-vos a paz, a minha paz vos dou.' },
      guidance: { reference: 'Salmos 119:105', text: 'Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.' }
    };
    
    return verses[topic] || verses.comfort;
  }

  /**
   * Oração fallback
   */
  getFallbackPrayer(intention) {
    const prayers = {
      healing: 'Senhor Deus, toque neste corpo e restaure a saúde. Em nome de Jesus, amém.',
      guidance: 'Pai celestial, ilumina meu caminho e me dá sabedoria para tomar as decisões certas. Amém.',
      protection: 'Deus Todo-Poderoso, cubra-me com seu manto de proteção e guarde-me de todo mal. Amém.',
      thanks: 'Graças te dou, ó Senhor, por tuas bênçãos e por tua infinita misericórdia. Amém.'
    };
    
    return prayers[intention] || prayers.thanks;
  }

  /**
   * Aconselhamento fallback
   */
  getFallbackCounseling(topic) {
    const counseling = {
      anxiety: 'A Bíblia nos ensina em Filipenses 4:6-7 a não andarmos ansiosos por coisa alguma, mas em tudo orar e suplicar com ações de graça.',
      depression: 'Salmos 42:11 nos lembra: "Por que estás abatida, ó minha alma? Espera em Deus, pois ainda o louvarei."',
      relationships: '1 Coríntios 13 nos ensina que o amor é paciente, bondoso, não arde em ciúmes, não se orgulha.',
      faith: 'Hebreus 11:1 define fé como "o firme fundamento das coisas que se esperam e a prova das coisas que não se veem."'
    };
    
    return counseling[topic] || counseling.faith;
  }

  /**
   * Busca bíblica fallback
   */
  getFallbackBibleSearch(query) {
    const passages = [
      { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é meu pastor, nada me faltará.' },
      { book: 'João', chapter: 3, verse: 16, text: 'Porque Deus amou o mundo de tal maneira que deu seu Filho unigênito.' },
      { book: 'Provérbios', chapter: 3, verse: 5, text: 'Confia no Senhor de todo o teu coração.' }
    ];
    
    return passages;
  }

  /**
   * Verifica se API está disponível (com fallback imediato)
   */
  async isAvailable() {
    try {
      // Se não tiver URL configurada ou for URL de exemplo, retorna false imediatamente
      if (!this.baseURL || this.baseURL.includes('api.religious-ai.com')) {
        return false;
      }
      
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Retorna informações da API
   */
  getInfo() {
    return {
      name: 'Religious API Service',
      version: '1.0.0',
      baseURL: this.baseURL,
      endpoints: Object.keys(this.endpoints),
      features: [
        'intent_classification',
        'sentiment_analysis',
        'biblical_context',
        'verse_retrieval',
        'prayer_generation',
        'counseling',
        'bible_search'
      ]
    };
  }
}

export default ReligiousAPIService;
