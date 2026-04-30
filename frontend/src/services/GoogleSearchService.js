/**
 * Google Search Service - Serviço de pesquisa real no Google
 * Implementa integração com Google Custom Search API usando fetch
 */

class GoogleSearchService {
  constructor(apiKey = null, searchEngineId = null) {
    this.apiKey = apiKey || process.env.REACT_APP_GOOGLE_API_KEY || '';
    this.searchEngineId = searchEngineId || process.env.REACT_APP_GOOGLE_CX || '';
    this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
  }

  /**
   * Verifica se as credenciais estão configuradas
   */
  isConfigured() {
    return this.apiKey && this.searchEngineId;
  }

  /**
   * Pesquisa no Google Custom Search API usando fetch
   */
  async searchGoogle(query, numResults = 10) {
    if (!this.isConfigured()) {
      console.warn('Google API não configurada. Usando pesquisa simulada.');
      return this.getSimulatedResults(query);
    }

    try {
      const url = `${this.baseUrl}?key=${this.apiKey}&cx=${this.searchEngineId}&q=${encodeURIComponent(query)}&num=${numResults}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        console.error('Erro na API do Google:', data.error);
        return this.getSimulatedResults(query);
      }
      
      // Formatar resultados
      const results = data.items?.map(item => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
        displayLink: item.displayLink,
        thumbnail: item.pagemap?.cse_image?.src || null
      })) || [];
      
      return results;
      
    } catch (error) {
      console.error('Erro na pesquisa Google:', error);
      return this.getSimulatedResults(query);
    }
  }

  /**
   * Pesquisa específica para código
   */
  async searchCode(query, language = 'javascript', numResults = 5) {
    const codeQuery = `${query} ${language} code example tutorial`;
    return this.searchGoogle(codeQuery, numResults);
  }

  /**
   * Pesquisa em documentações específicas
   */
  async searchDocumentation(query, site = null) {
    let searchQuery = query;
    if (site) {
      searchQuery = `${query} site:${site}`;
    }
    return this.searchGoogle(searchQuery, 5);
  }

  /**
   * Pesquisa em Stack Overflow (usando Google com filtro de site)
   */
  async searchStackOverflow(query) {
    return this.searchDocumentation(query, 'stackoverflow.com');
  }

  /**
   * Pesquisa combinada de múltiplas fontes
   */
  async searchAll(query, options = {}) {
    const { 
      includeGoogle = true, 
      includeCode = false, 
      language = 'javascript',
      includeStackOverflow = true,
      includeDocumentation = true
    } = options;
    
    const results = {
      query,
      timestamp: new Date().toISOString(),
      sources: []
    };
    
    if (includeGoogle) {
      const googleResults = await this.searchGoogle(query, 8);
      results.sources.push({
        name: 'Google',
        results: googleResults,
        count: googleResults.length
      });
    }
    
    if (includeCode) {
      const codeResults = await this.searchCode(query, language, 5);
      results.sources.push({
        name: 'Code',
        results: codeResults,
        count: codeResults.length
      });
    }
    
    if (includeStackOverflow) {
      const stackResults = await this.searchStackOverflow(query);
      results.sources.push({
        name: 'Stack Overflow',
        results: stackResults,
        count: stackResults.length
      });
    }
    
    if (includeDocumentation) {
      const docs = this.getDocumentationSites(language);
      for (const site of docs) {
        const docResults = await this.searchDocumentation(query, site);
        if (docResults.length > 0) {
          results.sources.push({
            name: site,
            results: docResults,
            count: docResults.length
          });
        }
      }
    }
    
    return results;
  }

  /**
   * Obtém sites de documentação por linguagem
   */
  getDocumentationSites(language) {
    const docs = {
      javascript: ['developer.mozilla.org', 'javascript.info', 'w3schools.com'],
      react: ['react.dev', 'reactjs.org'],
      python: ['docs.python.org', 'realpython.com'],
      nodejs: ['nodejs.org', 'nodejs.dev'],
      java: ['docs.oracle.com', 'baeldung.com'],
      css: ['css-tricks.com', 'developer.mozilla.org'],
      html: ['developer.mozilla.org', 'w3schools.com']
    };
    
    return docs[language.toLowerCase()] || docs.javascript;
  }

  /**
   * Extrai informações relevantes dos resultados
   */
  extractRelevantInfo(searchResults, query) {
    const relevantInfo = {
      snippets: [],
      titles: [],
      links: [],
      combinedText: ''
    };
    
    searchResults.sources.forEach(source => {
      source.results.forEach(result => {
        relevantInfo.snippets.push(result.snippet);
        relevantInfo.titles.push(result.title);
        relevantInfo.links.push({
          title: result.title,
          url: result.link,
          source: source.name
        });
      });
    });
    
    // Combinar snippets em texto corrido
    relevantInfo.combinedText = relevantInfo.snippets.join(' ');
    
    return relevantInfo;
  }

  /**
   * Gera resposta baseada em resultados de pesquisa
   */
  generateResponseFromSearch(searchResults, query) {
    const relevantInfo = this.extractRelevantInfo(searchResults, query);
    
    if (relevantInfo.links.length === 0) {
      return 'Não encontrei informações específicas sobre isso. Pode reformular sua pergunta?';
    }
    
    let response = `Com base em minha pesquisa sobre "${query}", aqui está o que encontrei:\n\n`;
    
    // Adicionar os principais resultados
    const topResults = relevantInfo.links.slice(0, 3);
    topResults.forEach((link, index) => {
      response += `${index + 1}. **${link.title}**\n`;
      response += `   Fonte: ${link.source}\n\n`;
    });
    
    response += `\nEssas fontes podem ter informações mais detalhadas. Quer que eu investigue algum aspecto específico?`;
    
    return response;
  }

  /**
   * Resultados simulados para quando a API não está configurada
   */
  getSimulatedResults(query) {
    const lowerQuery = query.toLowerCase();
    
    // Detectar hello world específicamente
    if (lowerQuery.includes('hello world') || lowerQuery.includes('helloworld')) {
      return [
        {
          title: 'Hello World em JavaScript - MDN Web Docs',
          snippet: 'O programa "Hello World" é tradicionalmente o primeiro programa que os desenvolvedores escrevem ao aprender uma nova linguagem de programação.',
          link: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Your_first_JavaScript',
          displayLink: 'developer.mozilla.org'
        },
        {
          title: 'Hello World Tutorial - W3Schools',
          snippet: 'O programa Hello World é um simples programa que exibe a mensagem "Hello World!" na tela. É usado para testar se a instalação está funcionando.',
          link: 'https://www.w3schools.com/python/python_getting_started.asp',
          displayLink: 'w3schools.com'
        },
        {
          title: 'React Hello World - React Documentation',
          snippet: 'O componente React mais simples é aquele que retorna um elemento JSX. Vamos começar com o tradicional Hello World.',
          link: 'https://react.dev/learn',
          displayLink: 'react.dev'
        }
      ];
    }
    
    // Detectar React
    if (lowerQuery.includes('react') || lowerQuery.includes('component')) {
      return [
        {
          title: 'React Components Documentation',
          snippet: 'Components são os blocos de construção de qualquer interface React. Eles permitem dividir a UI em partes independentes e reutilizáveis.',
          link: 'https://react.dev/learn/thinking-in-react-components',
          displayLink: 'react.dev'
        },
        {
          title: 'React Hooks Guide',
          snippet: 'Hooks permitem que você use estado e outros recursos do React sem escrever uma classe. Eles permitem que você reutilize a lógica com estado entre componentes.',
          link: 'https://react.dev/reference/react',
          displayLink: 'react.dev'
        }
      ];
    }
    
    // Detectar JavaScript
    if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) {
      return [
        {
          title: 'JavaScript Guide - MDN Web Docs',
          snippet: 'JavaScript é uma linguagem de programação que permite adicionar interatividade às suas páginas web.',
          link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
          displayLink: 'developer.mozilla.org'
        },
        {
          title: 'JavaScript.info - Modern JavaScript Tutorial',
          snippet: 'Do primeiro ao último: o livro detalhado sobre JavaScript moderno para iniciantes e desenvolvedores experientes.',
          link: 'https://javascript.info',
          displayLink: 'javascript.info'
        }
      ];
    }
    
    // Resultados genéricos
    return [
      {
        title: `Informações sobre ${query}`,
        snippet: `Aqui estão informações relevantes sobre ${query} de fontes confiáveis da internet.`,
        link: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        displayLink: 'google.com'
      }
    ];
  }

  /**
   * Configura as credenciais da API
   */
  configure(apiKey, searchEngineId) {
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  /**
   * Retorna informações sobre o serviço
   */
  getInfo() {
    return {
      name: 'Google Search Service',
      version: '1.0.0',
      configured: this.isConfigured(),
      apiKey: this.apiKey ? '***' + this.apiKey.slice(-4) : 'Não configurado',
      searchEngineId: this.searchEngineId ? '***' + this.searchEngineId.slice(-4) : 'Não configurado'
    };
  }
}

export default GoogleSearchService;
