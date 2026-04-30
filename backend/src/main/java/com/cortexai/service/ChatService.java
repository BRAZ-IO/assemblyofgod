package com.cortexai.service;

import com.cortexai.dto.ChatRequest;
import com.cortexai.dto.ChatResponse;
import com.cortexai.model.Conversation;
import com.cortexai.model.Message;
import com.cortexai.model.User;
import com.cortexai.repository.ConversationRepository;
import com.cortexai.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final AIService aiService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @Transactional
    public ChatResponse processMessage(ChatRequest request, User user) {
        log.info("Processando mensagem do usuário: {}", user.getEmail());

        // Obter ou criar conversação
        Conversation conversation;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversação não encontrada"));
        } else {
            conversation = createNewConversation(user, request.getModel());
        }

        // Salvar mensagem do usuário
        Message userMessage = new Message();
        userMessage.setConversation(conversation);
        userMessage.setRole(Message.Role.USER);
        userMessage.setContent(request.getMessage());
        userMessage = messageRepository.save(userMessage);

        // Obter histórico da conversação
        List<Message> history = messageRepository.findByConversationOrderByCreatedAtAsc(conversation);

        // Chamar IA
        String aiResponse = aiService.getAIResponse(
            request.getModel(),
            history,
            request.getMessage(),
            user
        );

        // Salvar resposta da IA
        Message assistantMessage = new Message();
        assistantMessage.setConversation(conversation);
        assistantMessage.setRole(Message.Role.ASSISTANT);
        assistantMessage.setContent(aiResponse);
        assistantMessage = messageRepository.save(assistantMessage);

        // Atualizar contagem de mensagens
        conversation.setMessageCount(history.size() + 2);
        conversationRepository.save(conversation);

        log.info("Mensagem processada com sucesso. Conversação ID: {}", conversation.getId());

        return new ChatResponse(
            aiResponse,
            conversation.getId(),
            assistantMessage.getId(),
            request.getModel(),
            null // tokens - seria calculado em produção
        );
    }

    private Conversation createNewConversation(User user, String model) {
        Conversation conversation = new Conversation();
        conversation.setTitle("Nova Conversação");
        conversation.setUser(user);
        conversation.setAiModel(model);
        conversation.setMessageCount(0);
        return conversationRepository.save(conversation);
    }

    public List<Conversation> getUserConversations(User user) {
        return conversationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Message> getConversationMessages(Long conversationId, User user) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new RuntimeException("Conversação não encontrada"));

        // Verificar se a conversação pertence ao usuário
        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Acesso não autorizado a esta conversação");
        }

        return messageRepository.findByConversationOrderByCreatedAtAsc(conversation);
    }
}
