class GeminiAPIService {
  constructor() {
    // Configurações da API Google Gemini
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    this.model = 'gemini-1.5-flash'; // Modelo correto para v1beta
    this.timeout = 10000; // 10 segundos
  }

  async generateResponse(prompt) {
    try {
      if (!this.apiKey) {
        throw new Error('API Key não configurada. Verifique as variáveis de ambiente.');
      }

      const response = await fetch(`${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API: ${response.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Nenhuma resposta gerada pela API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout: A requisição demorou muito para responder');
      }
      console.error('Erro no GeminiAPIService:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const testResponse = await this.generateResponse('Olá, você está funcionando?');
      return { success: true, response: testResponse };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new GeminiAPIService();
