package com.cortexai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    @NotBlank(message = "Mensagem é obrigatória")
    private String message;

    private Long conversationId;

    private String model = "gpt-3.5-turbo";
}
