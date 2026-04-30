package com.cortexai.controller;

import com.cortexai.model.User;
import com.cortexai.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        log.info("Buscando informações do usuário");
        
        // Retornar usuário temporário para teste
        User tempUser = new User();
        tempUser.setId(1L);
        tempUser.setEmail("temp@cortexai.com");
        tempUser.setName("Usuário Temporário");
        
        return ResponseEntity.ok(tempUser);
    }

    @PutMapping("/me/api-keys")
    public ResponseEntity<User> updateApiKeys(
            @RequestParam(required = false) String openaiKey,
            @RequestParam(required = false) String googleKey,
            @RequestParam(required = false) String anthropicKey) {
        log.info("Atualizando API keys do usuário");
        
        User updatedUser = userService.updateUserApiKeys(1L, openaiKey, googleKey, anthropicKey);
        
        return ResponseEntity.ok(updatedUser);
    }
}
