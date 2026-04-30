package com.cortexai.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CortexAI Backend API")
                        .description("Backend da plataforma CortexAI com IA própria")
                        .version("1.0.0")
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT"))
                        .contact(new io.swagger.v3.oas.models.info.Contact()
                                .email("contato@cortexai.com")
                                .name("CortexAI Team")))
                .servers(List.of(
                    new Server().url("http://localhost:8080/api").description("Servidor de desenvolvimento"),
                    new Server().url("https://api.cortexai.com").description("Servidor de produção")
                ))
                .tags(List.of(
                    new Tag().name("Chat").description("Operações de chat com IA"),
                    new Tag().name("Users").description("Gerenciamento de usuários"),
                    new Tag().name("Conversations").description("Gerenciamento de conversas")
                ));
    }
}
