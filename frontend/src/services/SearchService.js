/**
 * IA Assembleia de Deus Search Service - Serviço de pesquisa para enriquecer respostas
 * Implementa pesquisa no Google e outras fontes para validação de conteúdo
 */

class SearchService {
  constructor() {
    this.name = "IA Assembleia de Deus Search";
    this.version = "1.0.0";
    this.sources = {
      google: true,
      github: true,
      stackoverflow: true,
      documentation: true
    };
  }

  /**
   * Pesquisa no Google (simulado - em produção usar Google Custom Search API)
   */
  async searchGoogle(query) {
    try {
      // Simulação de pesquisa - em produção usar Google Custom Search API
      // const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`);
      
      // Para demonstração, retornamos resultados simulados baseados na query
      return this.generateSimulatedResults(query, 'google');
    } catch (error) {
      console.error('Erro na pesquisa Google:', error);
      return [];
    }
  }

  /**
   * Pesquisa específica para código
   */
  async searchCode(query, language = 'javascript') {
    const codeResults = [];
    
    // Simulação de resultados de código
    const codeSnippets = {
      javascript: [
        {
          title: 'JavaScript ES6 Features',
          snippet: 'const arrowFunction = (params) => { return params * 2; };',
          source: 'MDN Web Docs',
          url: 'https://developer.mozilla.org'
        },
        {
          title: 'React Hooks Tutorial',
          snippet: 'useEffect(() => { console.log("Effect ran"); }, [dependency]);',
          source: 'React Documentation',
          url: 'https://react.dev'
        },
        {
          title: 'Async/Await Pattern',
          snippet: 'async function fetchData() { const data = await fetch(url); return data.json(); }',
          source: 'JavaScript.info',
          url: 'https://javascript.info'
        }
      ],
      python: [
        {
          title: 'Python List Comprehension',
          snippet: '[x * 2 for x in range(10)]',
          source: 'Python Documentation',
          url: 'https://docs.python.org'
        },
        {
          title: 'Django Models',
          snippet: 'class User(models.Model): name = models.CharField(max_length=100)',
          source: 'Django Docs',
          url: 'https://docs.djangoproject.com'
        }
      ],
      react: [
        {
          title: 'React Component',
          snippet: 'function MyComponent({ props }) { return <div>{props.text}</div>; }',
          source: 'React Documentation',
          url: 'https://react.dev'
        },
        {
          title: 'useState Hook',
          snippet: 'const [count, setCount] = useState(0);',
          source: 'React Documentation',
          url: 'https://react.dev'
        }
      ]
    };

    const languageResults = codeSnippets[language.toLowerCase()] || codeSnippets.javascript;
    
    // Filtrar resultados baseados na query
    const filteredResults = languageResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.snippet.toLowerCase().includes(query.toLowerCase())
    );

    return filteredResults.length > 0 ? filteredResults : languageResults.slice(0, 3);
  }

  /**
   * Pesquisa em Stack Overflow (simulada)
   */
  async searchStackOverflow(query) {
    // Simulação - em produção usar Stack Exchange API
    const stackResults = [
      {
        title: `Como resolver: ${query}`,
        snippet: 'Esta é uma solução comprovada para o problema mencionado.',
        source: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        votes: Math.floor(Math.random() * 100) + 10,
        accepted: true
      }
    ];

    return stackResults;
  }

  /**
   * Pesquisa em documentações (simulada)
   */
  async searchDocumentation(query, tech = 'javascript') {
    const docs = {
      javascript: [
        {
          title: 'MDN JavaScript Guide',
          snippet: 'Comprehensive JavaScript documentation and tutorials.',
          source: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        }
      ],
      react: [
        {
          title: 'React Documentation',
          snippet: 'Official React documentation with examples and best practices.',
          source: 'React.dev',
          url: 'https://react.dev'
        }
      ],
      nodejs: [
        {
          title: 'Node.js Documentation',
          snippet: 'Official Node.js documentation and API reference.',
          source: 'Node.js',
          url: 'https://nodejs.org/docs'
        }
      ]
    };

    return docs[tech.toLowerCase()] || docs.javascript;
  }

  /**
   * Gera resultados simulados para demonstração
   */
  generateSimulatedResults(query, source) {
    const lowerQuery = query.toLowerCase();
    
    // Detectar hello world específicamente
    if (lowerQuery.includes('hello world') || lowerQuery.includes('helloworld')) {
      return [
        {
          title: 'Hello World em JavaScript',
          snippet: 'console.log("Hello World!");',
          source: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
          title: 'Hello World em React',
          snippet: 'function App() { return <div>Hello World</div>; }',
          source: 'React Documentation',
          url: 'https://react.dev'
        },
        {
          title: 'Hello World em Python',
          snippet: 'print("Hello World!")',
          source: 'Python Documentation',
          url: 'https://docs.python.org'
        },
        {
          title: 'Hello World Tutorial Completo',
          snippet: 'Guia passo a passo para criar seu primeiro programa em várias linguagens.',
          source: 'W3Schools',
          url: 'https://www.w3schools.com'
        }
      ];
    }
    
    // Detectar tipo de query e gerar resultados relevantes
    if (lowerQuery.includes('react') || lowerQuery.includes('component')) {
      return [
        {
          title: 'React Components Documentation',
          snippet: 'Learn how to create and use React components effectively.',
          source: 'React Documentation',
          url: 'https://react.dev'
        },
        {
          title: 'React Hooks Guide',
          snippet: 'Complete guide to React Hooks with examples.',
          source: 'React.dev',
          url: 'https://react.dev/reference/react'
        }
      ];
    }
    
    if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) {
      return [
        {
          title: 'JavaScript MDN Documentation',
          snippet: 'Comprehensive JavaScript reference and tutorials.',
          source: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
          title: 'JavaScript.info',
          snippet: 'Modern JavaScript tutorial from simple to advanced.',
          source: 'JavaScript.info',
          url: 'https://javascript.info'
        }
      ];
    }
    
    if (lowerQuery.includes('css') || lowerQuery.includes('style')) {
      return [
        {
          title: 'CSS Tricks',
          snippet: 'Daily articles about CSS, HTML, JavaScript, and more.',
          source: 'CSS-Tricks',
          url: 'https://css-tricks.com'
        },
        {
          title: 'MDN CSS Documentation',
          snippet: 'Complete CSS reference with examples.',
          source: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
        }
      ];
    }
    
    // Resultados genéricos
    return [
      {
        title: `Information about ${query}`,
        snippet: `Here is relevant information about ${query} from trusted sources.`,
        source: source === 'google' ? 'Google Search' : 'Web Search',
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
      }
    ];
  }

  /**
   * Pesquisa combinada de múltiplas fontes
   */
  async searchAll(query, options = {}) {
    const { includeGoogle = true, includeCode = false, language = 'javascript' } = options;
    
    const results = {
      query,
      timestamp: new Date().toISOString(),
      sources: []
    };
    
    if (includeGoogle) {
      const googleResults = await this.searchGoogle(query);
      results.sources.push({
        name: 'Google',
        results: googleResults
      });
    }
    
    if (includeCode) {
      const codeResults = await this.searchCode(query, language);
      results.sources.push({
        name: 'Code',
        results: codeResults
      });
    }
    
    // Adicionar Stack Overflow
    const stackResults = await this.searchStackOverflow(query);
    results.sources.push({
      name: 'Stack Overflow',
      results: stackResults
    });
    
    return results;
  }

  /**
   * Valida resposta com base em pesquisas
   */
  async validateResponse(response, query) {
    const searchResults = await this.searchAll(query, { includeCode: true });
    
    const validation = {
      isValid: true,
      confidence: 0.7,
      sources: [],
      suggestions: []
    };
    
    // Analisar resultados para validar resposta
    searchResults.sources.forEach(source => {
      source.results.forEach(result => {
        validation.sources.push({
          title: result.title,
          source: result.source,
          url: result.url,
          relevance: this.calculateRelevance(query, result)
        });
      });
    });
    
    // Aumentar confiança se houver fontes relevantes
    const relevantSources = validation.sources.filter(s => s.relevance > 0.5);
    if (relevantSources.length > 0) {
      validation.confidence = Math.min(0.9, validation.confidence + 0.2);
    }
    
    return validation;
  }

  /**
   * Calcula relevância de um resultado
   */
  calculateRelevance(query, result) {
    const queryWords = query.toLowerCase().split(' ');
    const resultText = (result.title + ' ' + result.snippet).toLowerCase();
    
    let matchCount = 0;
    queryWords.forEach(word => {
      if (resultText.includes(word)) matchCount++;
    });
    
    return matchCount;
  }

  /**
   * Gera resposta enriquecida (estilo DeepSeek - mais detalhada e estruturada)
   */
  async generateEnrichedResponse(query, baseResponse) {
    console.log('🔍 SearchService: Gerando resposta enriquecida para:', query);
    
    const lowerQuery = query.toLowerCase();
    
    // Detecção específica para hello world
    if (lowerQuery.includes('hello world') || lowerQuery.includes('helloworld')) {
      console.log('✅ Detectado: Hello World');
      return this.generateHelloWorldResponse(baseResponse);
    }
    
    // Para outras perguntas técnicas, usar validação normal
    const validation = await this.validateResponse(baseResponse, query);
    
    let enrichedResponse = baseResponse;
    
    if (validation.sources.length > 0) {
      const topSource = validation.sources[0];
      enrichedResponse += `\n\n📚 Fonte: ${topSource.title} (${topSource.source})`;
      
      if (topSource.snippet) {
        enrichedResponse += `\n💡 ${topSource.snippet}`;
      }
    }
    
    if (validation.confidence > 0.8) {
      enrichedResponse += `\n✅ Confiança: Alta (${Math.round(validation.confidence * 100)}%)`;
    }
    
    return enrichedResponse;
  }

  /**
   * Gera resposta específica para Hello World (estilo DeepSeek)
   */
  generateHelloWorldResponse(baseResponse) {
    let response = baseResponse;
    
    response += '\n\n**Vamos criar um Hello World passo a passo:**\n\n';
    
    response += '### O que é Hello World?\n';
    response += 'Hello World é o programa tradicionalmente usado para introduzir uma nova linguagem de programação. ';
    response += 'É simples, mas fundamental para entender a sintaxe básica.\n\n';
    
    response += '### Exemplos em diferentes linguagens:\n\n';
    
    response += '**JavaScript:**\n';
    response += '```javascript\nconsole.log("Hello, World!");\n```\n\n';
    
    response += '**Python:**\n';
    response += '```python\nprint("Hello, World!")\n```\n\n';
    
    response += '**Java:**\n';
    response += '```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n```\n\n';
    
    response += '### Por que começar com Hello World?\n';
    response += '- **Simplicidade**: Foca no essencial sem distrações\n';
    response += '- **Validação**: Confirma que o ambiente está configurado corretamente\n';
    response += '- **Fundamentos**: Introduz conceitos básicos da linguagem\n';
    response += '- **Confiança**: Primeiro sucesso motiva a continuar aprendendo\n\n';
    
    response += '### Próximos passos:\n';
    response += 'Depois do Hello World, você pode explorar:\n';
    response += '- Variáveis e tipos de dados\n';
    response += '- Estruturas de controle (if, for, while)\n';
    response += '- Funções e módulos\n';
    response += '- Estruturas de dados (arrays, objetos)\n\n';
    
    response += '**Quer que eu explique mais sobre alguma dessas linguagens ou conceitos?**';
    
    return response;
  }
}

export default SearchService;
