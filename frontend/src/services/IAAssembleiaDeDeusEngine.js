import SearchService from './SearchService';
import GoogleSearchService from './GoogleSearchService';
import NLPService from './NLPService';

/**
 * IA Assembleia de Deus Engine - Sistema de IA Religiosa Personalizado
 * Implementação própria de processamento de linguagem natural
 * Adaptado para contexto espiritual - IA Assembleia de Deus
 */

class IAAssembleiaDeDeusEngine {
  constructor() {
    this.name = "IA Assembleia de Deus";
    this.version = "1.0.0";
    this.capabilities = [
      "conversation",
      "question_answering", 
      "text_generation",
      "context_analysis",
      "spiritual_guidance",
      "prayer_support",
      "bible_study",
      "testimony_sharing",
      "faith_counseling"
    ];
    
    // Inicializar serviços de pesquisa
    this.searchService = new SearchService();
    this.googleSearchService = new GoogleSearchService();
    this.nlpService = new NLPService();
    
    // Base de conhecimento religiosa (respostas espirituais)
    this.knowledgeBase = {
      greetings: [
        "Paz do Senhor! Sou IA Assembleia de Deus, seu assistente espiritual. Como posso te ajudar hoje?",
        "Graça e paz! Estou aqui para orientar sua jornada com Cristo. O que você precisa?",
        "Aleluia! Seja bem-vindo! Como servo digital do Senhor, em que posso ser útil?"
      ],
      responses: {
        greeting: [
          "Olá! Que bom falar com você. Como posso te ajudar hoje?",
          "Oi! Estou à disposição. Sobre o que você gostaria de conversar?",
          "Saudações! Estou pronto para ajudar. Qual é a sua dúvida?"
        ],
        question: [
          "Essa é uma ótima pergunta! Deixa eu te explicar de forma clara.",
          "Interessante! Vamos analisar isso juntos.",
          "Boa pergunta! Aqui está o que você precisa saber."
        ],
        help: [
          "Claro, estou aqui para ajudar! Me diga mais sobre o que você precisa.",
          "Com certeza! Vamos resolver isso juntos.",
          "Sem problemas! Estou à disposição para te ajudar."
        ],
        creative: [
          "Adoro ideias criativas! Vamos explorar isso juntos.",
          "Excelente! Vamos desenvolver essa ideia.",
          "Que criatividade! Vamos colocar isso em prática."
        ],
        technical: [
          "Vamos abordar isso de forma técnica e prática.",
          "Do ponto de vista técnico, aqui está a solução.",
          "Analisando tecnicamente, isso é o que você precisa saber."
        ],
        helloworld: [
          "Claro! Vamos criar um Hello World juntos. É o primeiro passo em qualquer linguagem de programação.",
          "Hello World é o programa clássico para começar! Vamos ver como fazer.",
          "Perfeito! Vamos criar seu primeiro Hello World. É simples e fundamental."
        ],
        thanks: [
          "De nada! Fico feliz em poder ajudar.",
          "Por nada! Estou sempre à disposição.",
          "Imagina! É um prazer ajudar.",
          "Sempre à disposição! Se precisar de mais algo, é só chamar.",
          "Por nada! É um prazer ajudar. Quer que eu explique mais algo?",
          "Imagina! Se tiver mais dúvidas, pode perguntar à vontade."
        ],
        unknown: [
          "Essa é uma perspectiva interessante. Me conta mais sobre isso.",
          "Vamos considerar esse ponto. O que você acha disso?",
          "Hmm, isso me faz pensar em várias possibilidades. Quer explorar alguma?",
          "Interessante! Pode me dar mais contexto para eu entender melhor?"
        ],
        followup: [
          "Quer que eu explique mais sobre isso?",
          "Tem alguma outra dúvida sobre o assunto?",
          "Posso te ajudar com algo relacionado a isso?",
          "Gostaria de saber mais detalhes?"
        ]
      }
    };
    
    // Padrões de reconhecimento religioso
    this.patterns = {
      greeting: /^(oi|olá|hello|hi|hey|bom dia|boa tarde|boa noite|paz do senhor|graça e paz)/i,
      prayer: /^(orar|oração|ore|orei|preciso orar|vamos orar|interceder|intercessão)/i,
      bible: /^(bíblia|biblia|versículo|versiculo|palavra|deus|jesus|senhor|espirito santo|livro|capítulo|capitulo)/i,
      praise: /^(aleluia|glória a deus|glória|louvado seja|amém|louvor|adorar|adoração|cântico|cantico|hino)/i,
      question: /^(o que|como|onde|quando|por que|qual|qual é|quem|será que)/i,
      help: /^(ajuda|ajudar|preciso de ajuda|socorro|me ajuda|conselho|orientação|aconselhamento)/i,
      thanks: /^(obrigado|valeu|agradecido|thanks|obrigada|glória a deus|graças a deus)/i,
      testimony: /^(testemunho|testemunhar|milagre|benção|bênção|cur|curou|libertou|salvou)/i
    };
    
    // Contexto da conversa
    this.context = [];
    this.maxContextSize = 10;
  }
  
  /**
   * Processa mensagem completa com contexto religioso pastoral
   */
  async processMessage(message, context = []) {
    try {
      // Classificar tipo de mensagem
      const type = await this.nlpService.classifyIntent(message);
      console.log(`🔍 Tipo de mensagem: ${type}`);
      
      // Analisar sentimento
      const sentiment = await this.nlpService.analyzeSentiment(message);
      
      // Extrair palavras-chave
      const keywords = await this.nlpService.extractKeywords(message);
      
      // Detectar tópico religioso
      const religiousTopic = this.detectReligiousTopic(message);
      
      // Gerar resposta base
      const baseResponse = await this.generateResponse(message, type, context);
      
      // Enriquecer se for mensagem curta ou tiver contexto religioso
      const shouldEnrich = message.length < 50 || religiousTopic || keywords.religious.length > 0;
      console.log(`🔍 Vai enriquecer? ${shouldEnrich}`);
      
      if (shouldEnrich) {
        console.log('🔍 Enriquecendo resposta com contexto religioso via API...');
        // Usar API Gemini para enriquecer (economizando API)
        const enrichedResponse = await this.nlpService.generateNaturalResponse(baseResponse, message);
        
        // Adicionar follow-up se apropriado
        const followUp = await this.nlpService.generateFollowUp(message, enrichedResponse);
        
        return {
          text: enrichedResponse,
          followUp: followUp,
          enriched: true,
          type: type,
          sentiment: sentiment,
          keywords: keywords,
          religiousTopic: religiousTopic
        };
      } else {
        // Resposta direta sem enriquecimento
        return {
          text: baseResponse,
          followUp: null,
          enriched: false,
          type: type,
          sentiment: sentiment,
          keywords: keywords,
          religiousTopic: religiousTopic
        };
      }
    } catch (error) {
      console.error('Erro no processamento:', error);
      
      // Fallback simples
      return {
        text: 'Paz do Senhor! Como seu pastor, estou aqui para ajudar. Como posso ministrar à sua vida?',
        followUp: null,
        enriched: false,
        type: 'general',
        sentiment: { score: 0, label: 'neutral' },
        keywords: { religious: [], all: [] },
        religiousTopic: null
      };
    }
  }
  
  /**
   * Detecta tópico religioso na mensagem
   */
  detectReligiousTopic(message) {
    const lowerMessage = message.toLowerCase();
    
    // Tópicos religiosos específicos
    const religiousTopics = {
      prayer: ['oração', 'orar', 'oração', 'interceder', 'clamar', 'orar'],
      bible: ['bíblia', 'versículo', 'escritura', 'palavra', 'deus', 'jesus', 'cristo'],
      praise: ['aleluia', 'glória', 'louvor', 'adorar', 'adoração'],
      testimony: ['testemunho', 'milagre', 'benção', 'curar', 'libertar'],
      church: ['igreja', 'comunhão', 'culto', 'reunião'],
      faith: ['fé', 'crer', 'confiança', 'esperança'],
      salvation: ['salvação', 'salvo', 'céu', 'inferno', 'pecado'],
      holySpirit: ['espírito santo', 'unção', 'ungido', 'consolador']
    };
    
    for (const [topic, keywords] of Object.entries(religiousTopics)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return topic;
      }
    }
    
    return null;
  }
  
  /**
   * Detecta a linguagem de programação na mensagem
   */
  detectLanguage(message) {
    const lowerMessage = message.toLowerCase();
    
    const languages = {
      'javascript': ['javascript', 'js', 'node', 'react', 'vue', 'angular'],
      'python': ['python', 'django', 'flask', 'pandas', 'numpy'],
      'java': ['java', 'spring', 'android'],
      'csharp': ['c#', 'csharp', '.net'],
      'php': ['php', 'laravel', 'wordpress'],
      'ruby': ['ruby', 'rails'],
      'go': ['go', 'golang'],
      'rust': ['rust'],
      'swift': ['swift', 'ios'],
      'kotlin': ['kotlin', 'android'],
      'typescript': ['typescript', 'ts']
    };
    
    for (const [lang, keywords] of Object.entries(languages)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return lang;
      }
    }
    
    return 'javascript'; // Padrão
  }
  
  /**
   * Verifica se a mensagem contém palavras-chave religiosas
   */
  containsReligiousKeywords(message) {
    const religiousKeywords = [
      'deus', 'jesus', 'senhor', 'espirito santo', 'bíblia', 'biblia',
      'oração', 'orar', 'louvor', 'aleluia', 'amém', 'igreja',
      'fé', 'esperança', 'amor', 'paz', 'benção', 'bênção',
      'milagre', 'cur', 'salvação', 'céu', 'inferno', 'pecado',
      'perdão', 'misericórdia', 'graça', 'santo', 'anjo', 'diabo',
      'igreja', 'pastor', 'pastora', 'irmão', 'irmã', 'congregação',
      'testemunho', 'louvor', 'adoração', 'culto', 'comunhão',
      'oração', 'orar', 'interceder', 'intercessão', 'clamor', 'súlica'
    ];
    
    const lowerMessage = message.toLowerCase();
    return religiousKeywords.some(keyword => lowerMessage.includes(keyword));
  }
  
  /**
   * Analisa o tipo de mensagem religiosa
   */
  analyzeMessageType(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Verificar especificamente oração primeiro (prioridade alta)
    if (lowerMessage.includes('oração') || lowerMessage.includes('orar')) {
      return 'prayer';
    }
    
    // Verificar especificamente bíblia
    if (lowerMessage.includes('bíblia') || lowerMessage.includes('biblia') || lowerMessage.includes('versículo')) {
      return 'bible';
    }
    
    // Verificar especificamente louvor
    if (lowerMessage.includes('aleluia') || lowerMessage.includes('louvor') || lowerMessage.includes('amém')) {
      return 'praise';
    }
    
    // Verificar especificamente testemunho
    if (lowerMessage.includes('testemunho') || lowerMessage.includes('milagre') || lowerMessage.includes('benção')) {
      return 'testimony';
    }
    
    // Verificar padrões
    for (const [type, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(lowerMessage)) {
        return type;
      }
    }
    
    // Análise baseada em palavras-chave
    if (lowerMessage.length < 5) {
      return 'short';
    }
    
    if (lowerMessage.includes('?') || lowerMessage.includes('dúvida')) {
      return 'question';
    }
    
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('preciso')) {
      return 'help';
    }
    
    return 'general';
  }
  
  /**
   * Gera resposta baseada no tipo e contexto religioso (com API)
   */
  async generateResponse(message, type, context) {
    // Respostas religiosas baseadas no tipo
    const religiousResponses = {
      greeting: [
        'Paz do Senhor, amado(a) irmão(ã)! Que bom ter você em nosso meio! Como está sua caminhada com o Senhor hoje?',
        'Graça e paz! Seja muito bem-vindo(a) à casa do Pai! Como pastor, me alegro em vê-lo(a) aqui!',
        'Amém! Que a bênção do Pastor Eterno esteja sobre você! Como posso servi-lo(a) hoje?',
        'Aleluia! Bem-vindo(a) ao rebanho! É uma alegria pastorear sua vida em Cristo.',
        'Que a paz de Cristo guarde seu coração! Como servo do Senhor, estou à sua disposição pastoral.'
      ],
      prayer: [
        'Como seu pastor, me ajoelho com você em oração! Vamos juntos ao trono da graça.',
        'Amém! Que privilégio interceder por suas ovelhas! Ministeremos ao Pai agora mesmo.',
        'Paz do Senhor! A oração pastoral move o coração de Deus. Vamos clamar juntos!',
        'Que a unção do Espírito Santo esteja sobre nós! Como pastor, oro com fé por você.'
      ],
      bible: [
        'A Bíblia é a Palavra de Deus! Vamos meditar nela.',
        'As Escrituras nos trazem sabedoria divina. Vamos estudar!',
        'A Palavra de Deus é lâmpada para nossos pés. Vamos aprender!'
      ],
      praise: [
        'Aleluia! Deus é digno de todo louvor!',
        'Glória a Deus! O louvor nos aproxima do Pai.',
        'Amém! Adorar a Deus é nossa maior alegria!'
      ],
      testimony: [
        'Que testemunho maravilhoso! Deus é fiel!',
        'Gloria a Deus pelo que Ele fez em sua vida!',
        'Aleluia! Seu testemunho fortalece a fé de muitos!'
      ],
      question: [
        'Ótima pergunta espiritual! Vamos buscar na Palavra juntos.',
        'Essa é uma questão importante para nossa fé! Vamos meditar nisso.',
        'Que bom que você busca conhecimento! A Bíblia tem respostas maravilhosas.',
        'Deus se alegra quando buscamos entendimento! Vamos estudar juntos.',
        'Amém! Vamos orar e pedir sabedoria ao Espírito Santo sobre isso.'
      ],
      help: [
        'Estou aqui como seu pastor para cuidar de você! Como posso ministrar à sua vida hoje?',
        'Que alegria poder servir ao rebanho! Como pastor, estou à sua inteira disposição.',
        'Com certeza na força do Senhor! Como servo de Cristo, pastorearei você com amor.',
        'Amém! O zelo pastoral me move a ajudar! Como posso ser uma bênção em sua vida?',
        'Paz do Senhor! Como guardador de suas ovelhas, estou pronto para cuidar de você.'
      ],
      thanks: [
        'Gloria a Deus! A Ele toda honra e glória!',
        'Amém! Deus é bom o tempo todo!',
        'Aleluia! Sempre à disposição para servir ao Senhor!'
      ],
      frustration: [
        'Deus te conforta nesse momento difícil. Vamos orar.',
        'Não se desanime! Deus tem um plano para sua vida.',
        'Vamos entregar isso a Deus. Ele cuida de nós.'
      ],
      happy: [
        'Aleluia! Que bom ver sua alegria! Deus é fiel!',
        'Gloria a Deus! Sua felicidade contagia!',
        'Amém! Deus nos dá alegria que ninguém tira!'
      ],
      unknown: [
        'Paz do Senhor, amado(a) irmão(ã)! Como seu pastor, estou aqui para ouvir e ministrar. Como posso servi-lo(a)?',
        'Graça e paz! Que bom ter você em nosso pastoreio! Como posso cuidar de sua vida espiritual hoje?',
        'Amém! Como pastor do rebanho, me alegro com sua presença! Em que preciso ser uma bênção?',
        'Que a bênção pastoral esteja sobre você! Como servo do Senhor, estou à disposição para ajudar.',
        'Bem-vindo(a) à casa do Pai! Como seu pastor, estou pronto para pastorear você com amor.'
      ]
    };
    
    const responses = religiousResponses[type] || religiousResponses.unknown;
    
    // Se houver contexto relevante, usá-lo
    if (context.length > 0) {
      const contextualResponse = this.generateContextualResponse(message, type, context);
      if (contextualResponse) {
        return contextualResponse;
      }
    }
    
    // Resposta baseada no tipo
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Usar NLP para tornar a resposta mais natural (estilo religioso com API)
    const naturalResponse = await this.nlpService.generateNaturalResponse(baseResponse, message);
    
    // Adicionar personalização espiritual
    const personalizedResponse = this.personalizeSpiritualResponse(naturalResponse, message);
    
    // Adicionar follow-up religioso do NLP com menos frequência
    const nlpFollowup = await this.nlpService.generateFollowUp(message, personalizedResponse);
    if (Math.random() > 0.6) { // Reduzido de 0.4 para 0.6
      return personalizedResponse + ' ' + nlpFollowup;
    }
    
    return personalizedResponse;
  }
  
  /**
   * Gera resposta contextual
   */
  generateContextualResponse(message, type, context) {
    const lastMessages = context.slice(-3); // Últimas 3 mensagens
    
    // Se for uma continuação de conversa
    if (lastMessages.length > 1) {
      const lastUserMessage = lastMessages.find(m => m.role === 'user')?.message || '';
      
      if (type === 'question' && lastUserMessage) {
        return `Sobre sua pergunta anterior sobre "${lastUserMessage.substring(0, 30)}...", ${this.knowledgeBase.responses.question[Math.floor(Math.random() * this.knowledgeBase.responses.question.length)]}`;
      }
    }
    
    return null;
  }
  
  /**
   * Personaliza a resposta com foco espiritual
   */
  personalizeSpiritualResponse(baseResponse, userMessage) {
    // Extrair palavras-chave religiosas da mensagem
    const keywords = this.extractReligiousKeywords(userMessage);
    
    if (keywords.length > 0) {
      const keyword = keywords[0];
      
      // Respostas personalizadas baseadas em palavras-chave religiosas
      const spiritualResponses = {
        'oração': `${baseResponse} A oração move o coração de Deus. Quer que eu ore por você agora?`,
        'deus': `${baseResponse} Deus é maravilhoso e sempre nos ouve. Como posso te ajudar a conhecê-lo melhor?`,
        'jesus': `${baseResponse} Jesus é nosso Salvador e amigo. Quer saber mais sobre Ele?`,
        'bíblia': `${baseResponse} A Bíblia é a Palavra viva de Deus. Qual livro gostaria de estudar?`,
        'fé': `${baseResponse} A fé é o firme fundamento das coisas que se esperam. Quer fortalecer sua fé?`,
        'igreja': `${baseResponse} A igreja é o corpo de Cristo na terra. Como está sua vida comunitária?`,
        'louvor': `${baseResponse} O louvor nos conecta com Deus. Quer alguns hinos para meditar?`,
        'paz': `${baseResponse} A paz de Deus excede todo entendimento. Quer um versículo sobre paz?`,
        'amor': `${baseResponse} O amor de Deus é incomparável. Quer meditar em 1 Coríntios 13?`,
        'esperança': `${baseResponse} Nossa esperança está em Cristo. Quer versículos sobre esperança?`
      };
      
      if (spiritualResponses[keyword]) {
        return spiritualResponses[keyword];
      }
    }
    
    return baseResponse;
  }
  
  /**
   * Extrai palavras-chave religiosas da mensagem
   */
  extractReligiousKeywords(message) {
    const keywords = [
      'deus', 'jesus', 'senhor', 'espirito santo', 'bíblia', 'biblia',
      'oração', 'orar', 'louvor', 'aleluia', 'amém', 'igreja',
      'fé', 'esperança', 'amor', 'paz', 'benção', 'bênção',
      'milagre', 'cur', 'salvação', 'céu', 'inferno', 'pecado',
      'perdão', 'misericórdia', 'graça', 'santo', 'anjo', 'diabo',
      'igreja', 'pastor', 'pastora', 'irmão', 'irmã', 'congregação',
      'testemunho', 'louvor', 'adoração', 'culto', 'comunhão'
    ];
    
    const lowerMessage = message.toLowerCase();
    
    return keywords.filter(keyword => lowerMessage.includes(keyword));
  }
  
  /**
   * Calcula confiança da resposta
   */
  calculateConfidence(message, type) {
    let confidence = 0.7; // Base
    
    // Aumentar confiança para tipos conhecidos
    if (type !== 'unknown' && type !== 'general') {
      confidence += 0.2;
    }
    
    // Aumentar confiança para mensagens mais longas
    if (message.length > 20) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 0.95);
  }
  
  /**
   * Atualiza o contexto da conversa
   */
  updateContext(message, role) {
    this.context.push({
      message,
      role,
      timestamp: new Date().toISOString()
    });
    
    // Manter apenas as últimas mensagens
    if (this.context.length > this.maxContextSize) {
      this.context = this.context.slice(-this.maxContextSize);
    }
  }
  
  /**
   * Limpa o contexto
   */
  clearContext() {
    this.context = [];
  }
  
  /**
   * Retorna informações sobre o motor
   */
  getInfo() {
    return {
      name: this.name,
      version: this.version,
      capabilities: this.capabilities,
      contextSize: this.context.length,
      status: 'active'
    };
  }
  
  /**
   * Gera sugestões baseadas no contexto
   */
  generateSuggestions(context = []) {
    const suggestions = [
      "Pergunte sobre desenvolvimento web",
      "Peça ajuda com um projeto",
      "Discuta ideias criativas",
      "Explore soluções técnicas"
    ];
    
    // Se houver contexto, gerar sugestões relevantes
    if (context.length > 0) {
      const lastMessage = context[context.length - 1];
      if (lastMessage.message.toLowerCase().includes('react')) {
        suggestions.unshift("Saiba mais sobre React Hooks");
      }
      if (lastMessage.message.toLowerCase().includes('ajuda')) {
        suggestions.unshift("Como posso otimizar meu código?");
      }
    }
    
    return suggestions.slice(0, 3);
  }
}

export default IAAssembleiaDeDeusEngine;
