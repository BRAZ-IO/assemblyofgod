package com.cortexai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CortexAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CortexAiApplication.class, args);
        System.out.println("🚀 CortexAI Backend iniciado com sucesso!");
        System.out.println("📡 API disponível em: http://localhost:8080/api");
    }
}
