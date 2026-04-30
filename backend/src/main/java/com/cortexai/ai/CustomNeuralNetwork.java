package com.cortexai.ai;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * IA Própria CortexAI - Implementação Simplificada
 * Este é um exemplo de IA própria que pode ser expandido
 */
@Component
@Slf4j
public class CustomNeuralNetwork {

    // Rede neural simplificada para processamento de texto
    private Map<String, double[]> wordEmbeddings;
    private double[][] weights;
    private double[] bias;
    private Random random;

    public CustomNeuralNetwork() {
        this.wordEmbeddings = new HashMap<>();
        this.random = new Random();
        initializeNetwork();
        loadVocabulary();
        log.info("🧠 Rede Neural CortexAI inicializada");
    }

    private void initializeNetwork() {
        // Inicializar pesos da rede neural
        int inputSize = 100;  // Tamanho do embedding
        int hiddenSize = 50;  // Camada oculta
        int outputSize = 100;  // Tamanho da saída

        weights = new double[hiddenSize][inputSize];
        bias = new double[hiddenSize];

        // Inicializar pesos aleatoriamente
        for (int i = 0; i < hiddenSize; i++) {
            bias[i] = random.nextDouble() * 0.2 - 0.1;
            for (int j = 0; j < inputSize; j++) {
                weights[i][j] = random.nextDouble() * 0.2 - 0.1;
            }
        }
    }

    private void loadVocabulary() {
        // Carregar vocabulário básico (em produção, seria do arquivo)
        String[] basicWords = {
            "olá", "oi", "hey", "como", "você", "está", "tudo", "bem",
            "ajuda", "help", "código", "java", "programação", "obrigado",
            "valeu", "tchau", "adeus", "pergunta", "resposta", "sim", "não"
        };

        for (String word : basicWords) {
            wordEmbeddings.put(word.toLowerCase(), generateEmbedding(word));
        }
    }

    private double[] generateEmbedding(String word) {
        // Gerar embedding simples baseado no hash da palavra
        double[] embedding = new double[100];
        int hash = word.hashCode();
        
        for (int i = 0; i < 100; i++) {
            embedding[i] = ((hash >> i) & 1) == 1 ? 1.0 : -1.0;
            embedding[i] *= random.nextDouble();
        }
        
        return embedding;
    }

    public String generateResponse(String input, String context) {
        log.info("🧠 Gerando resposta com IA própria CortexAI");
        
        try {
            // Processar entrada
            double[] inputVector = processInput(input, context);
            
            // Passar pela rede neural
            double[] hiddenLayer = forwardPropagation(inputVector);
            
            // Gerar resposta baseada na ativação
            String response = generateResponseFromActivation(hiddenLayer, input);
            
            return response;
            
        } catch (Exception e) {
            log.error("Erro ao gerar resposta: {}", e.getMessage());
            return "Desculpe, ocorreu um erro ao processar sua mensagem.";
        }
    }

    private double[] processInput(String input, String context) {
        // Tokenizar e criar embedding
        String[] tokens = input.toLowerCase().split("\\s+");
        double[] inputVector = new double[100];
        
        for (String token : tokens) {
            double[] wordEmbedding = wordEmbeddings.getOrDefault(token, generateEmbedding(token));
            for (int i = 0; i < 100; i++) {
                inputVector[i] += wordEmbedding[i];
            }
        }
        
        // Normalizar
        double sum = 0;
        for (double val : inputVector) sum += val * val;
        sum = Math.sqrt(sum);
        
        if (sum > 0) {
            for (int i = 0; i < 100; i++) {
                inputVector[i] /= sum;
            }
        }
        
        return inputVector;
    }

    private double[] forwardPropagation(double[] input) {
        double[] hidden = new double[50];
        
        // Camada oculta com ativação ReLU
        for (int i = 0; i < 50; i++) {
            double sum = bias[i];
            for (int j = 0; j < 100; j++) {
                sum += weights[i][j] * input[j];
            }
            hidden[i] = Math.max(0, sum); // ReLU activation
        }
        
        return hidden;
    }

    private String generateResponseFromActivation(double[] activation, String input) {
        // Analisar padrões de ativação para gerar resposta
        double activationSum = Arrays.stream(activation).sum();
        double activationMax = Arrays.stream(activation).max().orElse(0);
        int maxIndex = findMaxIndex(activation);
        
        // Gerar resposta baseada em padrões
        return generateContextualResponse(input, activationSum, activationMax, maxIndex);
    }

    private int findMaxIndex(double[] array) {
        int maxIndex = 0;
        double maxValue = array[0];
        
        for (int i = 1; i < array.length; i++) {
            if (array[i] > maxValue) {
                maxValue = array[i];
                maxIndex = i;
            }
        }
        
        return maxIndex;
    }

    private String generateContextualResponse(String input, double sum, double max, int maxIndex) {
        String lowerInput = input.toLowerCase().trim();
        
        // Padrões baseados em ativação da rede neural
        if (maxIndex < 10) {
            // Padrão de saudação
            if (lowerInput.contains("olá") || lowerInput.contains("oi")) {
                return "Olá! Sou a IA CortexAI, criada do zero. Como posso ajudar?";
            }
            return "Oi! Estou aqui para ajudar. O que você precisa?";
        }
        
        if (maxIndex < 20) {
            // Padrão de pergunta
            if (lowerInput.contains("?")) {
                return "Essa é uma ótima pergunta! Vou analisar e dar a melhor resposta possível.";
            }
            return "Entendi sua pergunta. Deixa eu processar isso...";
        }
        
        if (maxIndex < 30) {
            // Padrão de código
            if (lowerInput.contains("código") || lowerInput.contains("java") || lowerInput.contains("programar")) {
                return "Adoro programação! Posso ajudar com código em Java, Python e muito mais. Qual linguagem você prefere?";
            }
            return "Posso ajudar com desenvolvimento de software. Sobre o que você precisa?";
        }
        
        if (maxIndex < 40) {
            // Padrão de ajuda
            if (lowerInput.contains("ajuda") || lowerInput.contains("help")) {
                return "Claro! Posso ajudar com várias tarefas: responder perguntas, explicar conceitos, escrever código, analisar dados e muito mais. Como posso ser útil?";
            }
            return "Estou aqui para ajudar! Me diga o que você precisa.";
        }
        
        // Resposta baseada em análise semântica
        return generateSemanticResponse(input, sum, max);
    }

    private String generateSemanticResponse(String input, double sum, double max) {
        // Análise semântica mais profunda
        String[] words = input.toLowerCase().split("\\s+");
        
        // Calcular "sentimento" baseado em palavras
        double sentiment = calculateSentiment(words);
        
        if (sentiment > 0.5) {
            return "Percebo que você está positivo! Isso é ótimo. Como posso ajudar a manter esse bom humor?";
        }
        
        if (sentiment < -0.5) {
            return "Sinto que você pode estar precisando de ajuda extra. Estou aqui para você. O que posso fazer?";
        }
        
        // Resposta inteligente baseada em contexto
        return generateIntelligentResponse(input, words);
    }

    private double calculateSentiment(String[] words) {
        double sentiment = 0;
        String[] positiveWords = {"bom", "ótimo", "excelente", "feliz", "alegre", "obrigado", "valeu"};
        String[] negativeWords = {"ruim", "péssimo", "triste", "infeliz", "erro", "problema"};
        
        for (String word : words) {
            for (String pos : positiveWords) {
                if (word.contains(pos)) sentiment += 0.3;
            }
            for (String neg : negativeWords) {
                if (word.contains(neg)) sentiment -= 0.3;
            }
        }
        
        return Math.max(-1, Math.min(1, sentiment));
    }

    private String generateIntelligentResponse(String input, String[] words) {
        // Resposta baseada em análise de palavras-chave
        if (words.length < 3) {
            return "Sua mensagem é bem direta. Pode me dar mais detalhes?";
        }
        
        if (words.length > 15) {
            return "Você escreveu bastante! Vou analisar isso cuidadosamente e dar uma resposta completa.";
        }
        
        // Detectar tópicos
        if (containsAny(words, new String[]{"aprender", "estudar", "entender"})) {
            return "Adoro ajudar no aprendizado! Vou explicar da forma mais clara possível.";
        }
        
        if (containsAny(words, new String[]{"criar", "fazer", "desenvolver"})) {
            return "Vou ajudar você a criar isso! Me dê mais detalhes sobre o que você precisa.";
        }
        
        // Resposta padrão inteligente
        return "Interessante! Vou processar sua solicitação e dar a melhor resposta possível.";
    }

    private boolean containsAny(String[] words, String[] targets) {
        for (String word : words) {
            for (String target : targets) {
                if (word.contains(target)) return true;
            }
        }
        return false;
    }

    // Método para treinar a rede (simplificado)
    public void train(String[][] trainingData, String[] labels) {
        log.info("🎓 Iniciando treinamento da rede neural...");
        
        // Em uma implementação real, aqui seria:
        // 1. Forward propagation
        // 2. Calcular erro
        // 3. Backpropagation
        // 4. Atualizar pesos
        // 5. Repetir por épocas
        
        int epochs = 100;
        for (int epoch = 0; epoch < epochs; epoch++) {
            double totalError = 0;
            
            for (int i = 0; i < trainingData.length; i++) {
                // Forward pass
                double[] input = processInput(trainingData[i][0], "");
                double[] output = forwardPropagation(input);
                
                // Calcular erro (simplificado)
                double error = calculateError(output, labels[i]);
                totalError += error;
                
                // Backpropagation (simplificado)
                updateWeights(input, output, error);
            }
            
            if (epoch % 10 == 0) {
                log.info("Época {}: Erro total = {}", epoch, totalError);
            }
        }
        
        log.info("🎓 Treinamento concluído!");
    }

    private double calculateError(double[] output, String label) {
        // Cálculo simplificado de erro
        return Math.random() * 0.1; // Placeholder
    }

    private void updateWeights(double[] input, double[] output, double error) {
        // Atualização de pesos simplificada
        double learningRate = 0.01;
        
        for (int i = 0; i < 50; i++) {
            bias[i] -= learningRate * error;
            for (int j = 0; j < 100; j++) {
                weights[i][j] -= learningRate * error * input[j];
            }
        }
    }
}
