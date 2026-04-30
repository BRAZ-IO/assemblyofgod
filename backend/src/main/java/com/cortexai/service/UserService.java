package com.cortexai.service;

import com.cortexai.model.User;
import com.cortexai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public User updateUserApiKeys(Long userId, String openaiKey, String googleKey, String anthropicKey) {
        User user = getUserById(userId);
        
        if (openaiKey != null) user.setApiKeyOpenAI(openaiKey);
        if (googleKey != null) user.setApiKeyGoogle(googleKey);
        if (anthropicKey != null) user.setApiKeyAnthropic(anthropicKey);
        
        return userRepository.save(user);
    }
}
