package com.cortexai.service;

import com.cortexai.ai.CustomNeuralNetwork;
import com.cortexai.model.Message;
import com.cortexai.model.User;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIService {

    private final CustomNeuralNetwork neuralNetwork;

    @PostConstruct
    public void init() {
        log.info("🧠 IA Própria CortexAI inicializada - Rede Neural Personalizada!");
    }

    public String getAIResponse(String model, List<Message> conversationHistory, String userMessage, User user) {
        try {
            log.info("🧠 Processando mensagem com IA própria CortexAI - Modelo: {}", model);
            
            // Construir contexto da conversação
            StringBuilder context = new StringBuilder();
            for (Message msg : conversationHistory) {
                context.append(msg.getRole().name()).append(": ").append(msg.getContent()).append("\n");
            }
            
            // Usar rede neural própria para gerar resposta
            String response = neuralNetwork.generateResponse(userMessage, context.toString());
            
            log.info("✅ Resposta gerada pela IA própria CortexAI");
            return response;

        } catch (Exception e) {
            log.error("❌ Erro ao processar mensagem com IA própria: {}", e.getMessage());
            return "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.";
        }
    }
}
