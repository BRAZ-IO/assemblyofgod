package com.cortexai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {

    private String response;
    private Long conversationId;
    private Long messageId;
    private String model;
    private Integer tokens;
}
