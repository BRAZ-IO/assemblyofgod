/**
 * NLP Service - Serviço de Processamento de Linguagem Natural
 * Implementação com API externa para contexto religioso - IA Assembleia de Deus
 * Utiliza ReligiousAPIService para análise avançada com fallback local
 */

import GeminiAPIService from './GeminiAPIService';
import Sentiment from 'sentiment';

class NLPService {
  constructor() {
    // Inicializar API Gemini
    this.geminiService = new GeminiAPIService();
    this.sentiment = new Sentiment();
    
    // Flag para controlar uso da API
    this.useAPI = true;
    
    // Verificar disponibilidade da API
    this.checkAPIAvailability();
    
    // Classificador simples de intenções religiosas
    this.intentPatterns = {
      greeting: /^(oi|olá|hello|hi|hey|bom dia|boa tarde|boa noite|tudo bem|como está|como vai|paz do senhor|graça e paz)/i,
      prayer: /^(orar|oração|ore|orei|preciso orar|vamos orar|interceder|intercessão)/i,
      bible: /^(bíblia|biblia|versículo|versiculo|palavra|deus|jesus|senhor|espirito santo|livro|capítulo|capitulo)/i,
      praise: /^(aleluia|glória a deus|gloŕia|louvado seja|amém|louvor|adorar|adoração|cântico|cantico|hino)/i,
      question: /^(o que|como|onde|quando|por que|qual|qual é|quem|será que|explique|por favor)/i,
      help: /^(ajuda|ajudar|preciso de ajuda|socorro|me ajuda|preciso|dúvida|conselho|orientação|aconselhamento)/i,
      thanks: /^(obrigado|valeu|agradecido|thanks|obrigada|glória a deus|graças a deus)/i,
      testimony: /^(testemunho|testemunhar|milagre|benção|bênção|cur|curou|libertou|salvou)/i,
      frustration: /^(frustrado|chateado|irritado|não funciona|erro|bug|problema|difícil|tentação|luta|aflição)/i,
      happy: /^(ótimo|maravilhoso|excelente|perfeito|adorei|consegui|funcionou|bom|aleluia|glória|amém)/i
    };
    
    // Palavras positivas (contexto religioso)
    this.positiveWords = [
      'ótimo', 'maravilhoso', 'excelente', 'perfeito', 'adorei', 'consegui', 'funcionou',
      'bom', 'feliz', 'alegre', 'contente', 'satisfeito', 'grato', 'obrigado',
      'aleluia', 'amém', 'glória', 'benção', 'bênção', 'milagre', 'paz', 'alegria',
      'esperança', 'fé', 'amor', 'misericórdia', 'graça', 'vitória'
    ];
    
    // Palavras negativas (contexto espiritual)
    this.negativeWords = [
      'frustrado', 'chateado', 'irritado', 'não funciona', 'erro', 'bug', 'problema',
      'difícil', 'ruim', 'péssimo', 'horrível', 'triste', 'infeliz', 'decepcionado',
      'tentação', 'luta', 'aflição', 'sofrimento', 'dor', 'medo', 'ansiedade', 'angústia'
    ];
    
    // Expressões pastorais (contexto de pastor e rebanho)
    this.conversationalExpressions = [
      'Paz do Senhor, amado(a) irmão(ã)! ',
      'Graça e paz, meu filho(a) em Cristo! ',
      'Que bom ter você aqui na casa do Senhor! ',
      'Seja bem-vindo(a) ao nosso pastoreio! ',
      'Amém! Como pastor, estou à sua disposição. ',
      'Que a bênção do Pastor esteja sobre você! ',
      'É uma alegria pastorear sua vida! ',
      'Receba meu abraço pastoral em Cristo! ',
      'Como servo do Senhor, cuidarei de você. ',
      'Bem-vindo(a) ao rebanho do Senhor! '
    ];
    
    // Conectivos pastorais para autoridade espiritual
    this.connectors = [
      'como pastor do rebanho de Cristo',
      'pela autoridade que me foi conferida',
      'sob a unção do Espírito Santo',
      'como servo e ministro do Altíssimo',
      'na responsabilidade de meu pastoreio',
      'com o zelo de pastor de almas',
      'pela sabedoria que vem de Deus',
      'como guardador de suas ovelhas',
      'em obediência ao chamado pastoral',
      'com o amor de Cristo por Suas ovelhas'
    ];
    
    // Expansões de resposta pastorais
    this.responseExpansions = [
      'Que o Senhor continue usando este ministério para abençoar sua vida. ',
      'Como seu pastor, intercedo diariamente por suas necessidades. ',
      'O pastoreio de Cristo sobre nós é maravilhoso e fiel. ',
      'Receba esta palavra pastoral com fé e gratidão. ',
      'Meu coração de pastor se alegra com sua caminhada. ',
      'Deus me chamou para cuidar de você com amor divino. ',
      'A bênção pastoral do Senhor está sobre sua vida. ',
      'Continuo orando por você e seu crescimento espiritual. '
    ];
    
    // Versículos bíblicos para diferentes situações
    this.bibleVerses = {
      comfort: [
        { reference: 'Mateus 11:28', text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
        { reference: 'Salmos 23:4', text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.' },
        { reference: 'Isaías 41:10', text: 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.' }
      ],
      strength: [
        { reference: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.' },
        { reference: 'Isaías 40:31', text: 'Mas os que esperam no Senhor renovarão as suas forças.' },
        { reference: 'Josué 1:9', text: 'Não to mandei eu? Esforça-te, e tem bom ânimo; não pasmes, nem te espantes.' }
      ],
      guidance: [
        { reference: 'Provérbios 3:5-6', text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.' },
        { reference: 'Salmos 119:105', text: 'Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.' }
      ],
      peace: [
        { reference: 'João 14:27', text: 'Deixo-vos a paz, a minha paz vos dou.' },
        { reference: 'Filipenses 4:7', text: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.' }
      ]
    };
  }

  
  /**
   * Verifica se API está disponível (com timeout e fallback)
   */
  async checkAPIAvailability() {
    // Assumir que API está disponível por padrão (chave configurada)
    this.useAPI = true;
    console.log('Usando Google Gemini API (chave configurada)');
    
    // Teste assíncrono em background
    this.testAPIInBackground();
  }
  
  /**
   * Testa API em background sem bloquear inicialização
   */
  async testAPIInBackground() {
    try {
      const isAvailable = await this.geminiService.isAvailable();
      if (!isAvailable) {
        console.log('API Gemini não disponível, usando fallback local');
        this.useAPI = false;
      } else {
        console.log('API Gemini funcionando normalmente!');
      }
    } catch (error) {
      console.log('Erro ao testar API Gemini, continuando com fallback local');
      this.useAPI = false;
    }
  }

  /**
   * Classifica a intenção da mensagem (usando Gemini ou fallback)
   */
  async classifyIntent(message) {
    if (this.useAPI) {
      try {
        const analysis = await this.geminiService.analyzeMessage(message);
        return analysis.intent || 'general';
      } catch (error) {
        console.log('Falha na API Gemini, usando fallback local');
        this.useAPI = false;
      }
    }
    
    // Fallback local
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      if (pattern.test(lowerMessage)) {
        return intent;
      }
    }
    
    return 'general';
  }

  /**
   * Analisa o sentimento da mensagem (usando Gemini ou fallback)
   */
  async analyzeSentiment(message) {
    if (this.useAPI) {
      try {
        const analysis = await this.geminiService.analyzeMessage(message);
        const sentiment = analysis.sentiment || { score: 0, label: 'neutral' };
        return {
          score: sentiment.score || 0,
          comparative: sentiment.score || 0,
          positive: sentiment.label === 'positive',
          negative: sentiment.label === 'negative',
          neutral: sentiment.label === 'neutral',
          confidence: Math.abs(sentiment.score || 0),
          tokens: [],
          words: []
        };
      } catch (error) {
        console.log('Falha na API Gemini de sentimento, usando fallback local');
      }
    }
    
    // Fallback local com sentiment
    const result = this.sentiment.analyze(message);
    
    return {
      score: result.score,
      comparative: result.comparative,
      positive: result.score > 0,
      negative: result.score < 0,
      neutral: result.score === 0,
      confidence: Math.abs(result.comparative),
      tokens: result.tokens || [],
      words: result.words || []
    };
  }

  /**
   * Extrai palavras-chave relevantes (usando Gemini ou fallback)
   */
  async extractKeywords(message) {
    if (this.useAPI) {
      try {
        const analysis = await this.geminiService.analyzeMessage(message);
        return {
          topics: [],
          nouns: [],
          verbs: [],
          adjectives: [],
          religious: analysis.keywords || [],
          all: analysis.keywords || []
        };
      } catch (error) {
        console.log('Falha na API Gemini de keywords, usando fallback local');
      }
    }
    
    // Fallback local - palavras-chave religiosas
    const religiousKeywords = ['deus', 'jesus', 'senhor', 'espirito santo', 'bíblia', 'biblia',
                              'oração', 'orar', 'louvor', 'aleluia', 'amém', 'igreja',
                              'fé', 'esperança', 'amor', 'paz', 'benção', 'bênção',
                              'milagre', 'cur', 'salvação', 'céu', 'inferno', 'pecado',
                              'perdão', 'misericórdia', 'graça', 'santo', 'anjo', 'diabo',
                              'igreja', 'pastor', 'pastora', 'irmão', 'irmã', 'congregação'];
    
    const lowerMessage = message.toLowerCase();
    const religiousMatches = religiousKeywords.filter(keyword => lowerMessage.includes(keyword));
    
    return {
      topics: [],
      nouns: [],
      verbs: [],
      adjectives: [],
      religious: religiousMatches,
      all: religiousMatches
    };
  }

  /**
   * Extrai entidades (usando Gemini ou fallback)
   */
  async extractEntities(message) {
    if (this.useAPI) {
      try {
        const analysis = await this.geminiService.analyzeMessage(message);
        return {
          people: [],
          places: [],
          organizations: [],
          dates: [],
          money: [],
          phoneNumbers: [],
          emails: [],
          urls: [],
          biblical: [] // Gemini já inclui na análise
        };
      } catch (error) {
        console.log('Falha na API Gemini de entidades, usando fallback local');
      }
    }
    
    // Fallback local - entidades básicas
    return {
      people: [],
      places: [],
      organizations: [],
      dates: [],
      money: [],
      phoneNumbers: [],
      emails: [],
      urls: []
    };
  }

  /**
   * Detecta tópicos religiosos na mensagem
   */
  detectReligiousTopic(message) {
    const topics = {
      prayer: ['oração', 'orar', 'interceder', 'intercessão', 'clamor', 'súplica'],
      bible: ['bíblia', 'biblia', 'versículo', 'versiculo', 'palavra', 'escrituras', 'livro', 'capítulo'],
      praise: ['louvor', 'aleluia', 'amém', 'glória', 'adoração', 'cantico', 'hino', 'adorar'],
      faith: ['fé', 'crer', 'confiança', 'esperança', 'crença'],
      god: ['deus', 'senhor', 'pai', 'todo poderoso', 'criador'],
      jesus: ['jesus', 'cristo', 'messias', 'salvador', 'redentor'],
      holySpirit: ['espirito santo', 'espírito santo', 'consolador', 'paracleto'],
      church: ['igreja', 'congregação', 'comunidade', 'corpo de cristo'],
      salvation: ['salvação', 'salvo', 'céu', 'vida eterna', 'redenção'],
      miracle: ['milagre', 'sinal', 'prodígio', 'maravilha', 'cur'],
      blessing: ['benção', 'bênção', 'favorecido', 'prosperidade'],
      forgiveness: ['perdão', 'perdoar', 'misericórdia', 'graça']
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return topic;
      }
    }
    
    return null;
  }

  /**
   * Gera variações de uma frase para parecer mais natural
   */
  generateVariations(basePhrase) {
    const variations = [];
    
    // Adicionar expressões conversacionais
    this.conversationalExpressions.forEach(expression => {
      variations.push(expression + basePhrase.charAt(0).toLowerCase() + basePhrase.slice(1));
    });
    
    // Adicionar variação original
    variations.push(basePhrase);
    
    return variations;
  }

  /**
   * Torna a resposta mais conversacional
   */
  makeConversational(response) {
    // Aleatoriamente adicionar expressões naturais
    if (Math.random() > 0.7) {
      const randomExpression = this.conversationalExpressions[
        Math.floor(Math.random() * this.conversationalExpressions.length)
      ];
      return randomExpression + response.charAt(0).toLowerCase() + response.slice(1);
    }
    
    return response;
  }

  /**
   * Adiciona empatia espiritual à resposta baseada no sentimento
   */
  addSpiritualEmpathy(response, sentiment) {
    if (sentiment.positive) {
      const spiritualResponses = [
        'Aleluia! ',
        'Gloria a Deus! ',
        'Que bom! Deus é fiel! ',
        'Maravilhoso! Deus te abençoe! '
      ];
      const randomResponse = spiritualResponses[Math.floor(Math.random() * spiritualResponses.length)];
      return randomResponse + response;
    }
    
    if (sentiment.negative) {
      const empatheticResponses = [
        'Deus te conforta. ',
        'Vamos orar sobre isso. ',
        'Deus tem um plano para você. ',
        'Não se desanime, Deus está contigo. '
      ];
      const randomResponse = empatheticResponses[Math.floor(Math.random() * empatheticResponses.length)];
      return randomResponse + response;
    }
    
    return response;
  }

  /**
   * Gera resposta mais natural (usando Gemini ou sistema local)
   */
  async generateNaturalResponse(baseResponse, userMessage) {
    if (this.useAPI) {
      try {
        // Usar Gemini para gerar resposta mais natural
        const geminiResponse = await this.geminiService.generateSpiritualResponse(userMessage);
        return geminiResponse;
      } catch (error) {
        console.log('Falha na API Gemini, usando sistema local');
        this.useAPI = false;
      }
    }
    
    // Sistema local (mantido como fallback)
    const sentiment = await this.analyzeSentiment(userMessage);
    const intent = await this.classifyIntent(userMessage);
    const religiousTopic = this.detectReligiousTopic(userMessage);
    
    // Iniciar com a resposta base
    let naturalResponse = baseResponse;
    
    // Adicionar expressão espiritual apenas algumas vezes (menos frequente)
    if (Math.random() > 0.7) {
      const randomExpression = this.conversationalExpressions[
        Math.floor(Math.random() * this.conversationalExpressions.length)
      ];
      naturalResponse = randomExpression + naturalResponse.charAt(0).toLowerCase() + naturalResponse.slice(1);
    }
    
    // Adicionar versículo bíblico se apropriado (mais seletivo)
    if (religiousTopic && Math.random() > 0.8) {
      const verse = await this.getBibleVerse(religiousTopic);
      if (verse) {
        naturalResponse = naturalResponse + `\n\n*${verse.reference}: "${verse.text}"*`;
      }
    }
    
    // Adicionar expansão espiritual com menos frequência
    if (Math.random() > 0.8) {
      const randomExpansion = this.responseExpansions[
        Math.floor(Math.random() * this.responseExpansions.length)
      ];
      naturalResponse = naturalResponse + ' ' + randomExpansion;
    }
    
    // Adicionar conectivo espiritual raramente
    if (Math.random() > 0.9) {
      const randomConnector = this.connectors[
        Math.floor(Math.random() * this.connectors.length)
      ];
      naturalResponse = naturalResponse + ' ' + randomConnector + '.';
    }
    
    return naturalResponse;
  }

  /**
   * Retorna versículo bíblico (usando Gemini ou fallback)
   */
  async getBibleVerse(topic) {
    if (this.useAPI) {
      try {
        const verse = await this.geminiService.getBibleVerse(topic);
        if (verse) {
          return verse;
        }
      } catch (error) {
        console.log('Falha na API Gemini de versículos, usando fallback local');
      }
    }
    
    // Fallback local
    const topicMapping = {
      prayer: 'comfort',
      faith: 'strength',
      bible: 'guidance',
      praise: 'peace',
      miracle: 'strength',
      blessing: 'peace',
      forgiveness: 'peace'
    };
    
    const verseCategory = topicMapping[topic] || 'comfort';
    const verses = this.bibleVerses[verseCategory];
    
    if (verses && verses.length > 0) {
      return verses[Math.floor(Math.random() * verses.length)];
    }
    
    return null;
  }

  /**
   * Detecta se a mensagem é uma pergunta
   */
  isQuestion(message) {
    const hasQuestionMark = message.includes('?');
    const questionWords = ['o que', 'como', 'onde', 'quando', 'por que', 'qual', 'quem', 'explique'];
    const lowerMessage = message.toLowerCase();
    
    return hasQuestionMark || questionWords.some(word => lowerMessage.includes(word));
  }

  /**
   * Gera follow-up apropriado (contexto religioso com API)
   */
  async generateFollowUp(message, response) {
    const isQuestion = this.isQuestion(message);
    const sentiment = await this.analyzeSentiment(message);
    const intent = await this.classifyIntent(message);
    const religiousTopic = this.detectReligiousTopic(message);
    
    if (religiousTopic === 'prayer' || intent === 'prayer') {
      const followups = [
        'Quer que eu ore por você?',
        'Podemos orar juntos agora?',
        'Como posso interceder por você?',
        'Deixe seu pedido de oração.'
      ];
      return followups[Math.floor(Math.random() * followups.length)];
    }
    
    if (religiousTopic === 'bible' || intent === 'bible') {
      const followups = [
        'Quer estudar outro versículo?',
        'Posso explicar melhor essa passagem?',
        'Qual livro da Bíblia quer estudar?',
        'Quer meditar mais na Palavra?'
      ];
      return followups[Math.floor(Math.random() * followups.length)];
    }
    
    if (isQuestion) {
      const followups = [
        'Isso responde sua pergunta espiritual?',
        'Quer que eu explique mais sobre isso?',
        'Faz sentido para sua caminhada?',
        'Precisa de mais orientação?'
      ];
      return followups[Math.floor(Math.random() * followups.length)];
    }
    
    if (sentiment.positive) {
      const followups = [
        'Aleluia! Quer compartilhar mais bênçãos?',
        'Gloria a Deus! Mais algo para celebrar?',
        'Deus é bom! Quer testemunhar mais?'
      ];
      return followups[Math.floor(Math.random() * followups.length)];
    }
    
    if (sentiment.negative) {
      const followups = [
        'Quer que eu ore por você?',
        'Posso te ajudar com mais orações?',
        'Vamos buscar a Deus juntos?',
        'Quer um versículo de conforto?'
      ];
      return followups[Math.floor(Math.random() * followups.length)];
    }
    
    const spiritualFollowups = [
      'Quer que eu ore por você?',
      'Posso compartilhar um versículo?',
      'Como está sua vida espiritual?',
      'Quer meditar na Palavra juntos?'
    ];
    
    return spiritualFollowups[Math.floor(Math.random() * spiritualFollowups.length)];
  }

  /**
   * Retorna informações sobre o serviço religioso com API
   */
  getInfo() {
    return {
      name: 'NLP Service - IA Assembleia de Deus',
      version: '5.0.0',
      type: 'Religious AI (Google Gemini + Fallback)',
      libraries: ['sentiment', 'GeminiAPIService'],
      focus: 'Religious/Spiritual Context',
      useAPI: this.useAPI,
      apiAvailable: false, // Verificação assíncrona não disponível neste contexto
      capabilities: [
        'sentiment_analysis',
        'intent_classification',
        'religious_keyword_extraction',
        'entity_extraction',
        'religious_topic_detection',
        'bible_verse_integration',
        'spiritual_response_generation',
        'empathy_adaptation',
        'prayer_support',
        'biblical_guidance',
        'api_integration',
        'fallback_support'
      ]
    };
  }
}

export default NLPService;
