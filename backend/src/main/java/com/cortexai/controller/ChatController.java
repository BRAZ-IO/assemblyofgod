package com.cortexai.controller;

import com.cortexai.dto.ChatRequest;
import com.cortexai.dto.ChatResponse;
import com.cortexai.model.Conversation;
import com.cortexai.model.Message;
import com.cortexai.model.User;
import com.cortexai.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    @Operation(summary = "Enviar mensagem para IA", description = "Envia uma mensagem para a IA própria CortexAI e recebe resposta")
    public ResponseEntity<ChatResponse> sendMessage(
            @Valid @RequestBody ChatRequest request) {
        log.info("Recebendo mensagem do usuário");
        
        // Criar usuário temporário para teste
        User tempUser = new User();
        tempUser.setId(1L);
        tempUser.setEmail("temp@cortexai.com");
        tempUser.setName("Usuário Temporário");
        
        ChatResponse response = chatService.processMessage(request, tempUser);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    @Operation(summary = "Listar conversas", description = "Lista todas as conversas do usuário")
    public ResponseEntity<List<Conversation>> getUserConversations() {
        log.info("Buscando conversações do usuário");
        
        // Criar usuário temporário para teste
        User tempUser = new User();
        tempUser.setId(1L);
        tempUser.setEmail("temp@cortexai.com");
        tempUser.setName("Usuário Temporário");
        
        List<Conversation> conversations = chatService.getUserConversations(tempUser);
        
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversations/{conversationId}/messages")
    @Operation(summary = "Listar mensagens", description = "Lista todas as mensagens de uma conversação específica")
    public ResponseEntity<List<Message>> getConversationMessages(
            @PathVariable Long conversationId) {
        log.info("Buscando mensagens da conversação: {}", conversationId);
        
        // Criar usuário temporário para teste
        User tempUser = new User();
        tempUser.setId(1L);
        tempUser.setEmail("temp@cortexai.com");
        tempUser.setName("Usuário Temporário");
        
        List<Message> messages = chatService.getConversationMessages(conversationId, tempUser);
        
        return ResponseEntity.ok(messages);
    }
}
