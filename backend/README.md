# 🚀 CortexAI Backend - Spring Boot

Backend completo em Java + Spring Boot para a plataforma CortexAI.

---

## 📋 Pré-requisitos

- **Java 17+** instalado
- **Maven 3.6+** instalado
- **PostgreSQL** (opcional, usa H2 por padrão)
- **API Keys** das IAs (OpenAI, Google, Anthropic)

---

## ⚡ Setup Rápido

### **1. Clonar e Navegar**
```bash
cd backend
```

### **2. Configurar application.properties**
```properties
# Editar src/main/resources/application.properties
openai.api.key=sk-sua-chave-openai
google.api.key=sua-chave-google
anthropic.api.key=sua-chave-anthropic
```

### **3. Compilar e Executar**
```bash
# Compilar
mvn clean install

# Executar
mvn spring-boot:run

# Ou executar o JAR
java -jar target/cortexai-backend-1.0.0.jar
```

### **4. Verificar Funcionamento**
```
🚀 Backend iniciado em: http://localhost:8080/api
📊 H2 Console: http://localhost:8080/api/h2-console
```

---

## 🔌 Endpoints da API

### **Autenticação**
```
POST /api/auth/login
Body: { "email": "user@email.com", "password": "senha" }
Response: { "token": "jwt-token", "userId": 1, "email": "user@email.com" }

POST /api/auth/register
Params: name, email, password
Response: "Usuário registrado com sucesso"
```

### **Chat**
```
POST /api/chat
Headers: Authorization: Bearer {token}
Body: { "message": "Olá!", "model": "gpt-3.5-turbo" }
Response: { "response": "Resposta da IA", "conversationId": 1 }

GET /api/chat/conversations
Headers: Authorization: Bearer {token}
Response: [ Lista de conversações ]

GET /api/chat/conversations/{id}/messages
Headers: Authorization: Bearer {token}
Response: [ Lista de mensagens ]
```

### **Usuários**
```
GET /api/users/me
Headers: Authorization: Bearer {token}
Response: { "id": 1, "email": "user@email.com", "name": "Nome" }

PUT /api/users/me/api-keys
Headers: Authorization: Bearer {token}
Params: openaiKey, googleKey, anthropicKey
Response: { "id": 1, "apiKeyOpenAI": "sk-..." }
```

---

## 🗄️ Banco de Dados

### **Desenvolvimento (H2)**
- **URL:** `jdbc:h2:mem:cortexai`
- **Console:** http://localhost:8080/api/h2-console
- **User:** `sa`
- **Password:** (vazio)

### **Produção (PostgreSQL)**
```properties
# No application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cortexai
spring.datasource.username=postgres
spring.datasource.password=sua-senha
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

---

## 🔐 Segurança

### **JWT Authentication**
- **Secret:** Configurável em `application.properties`
- **Expiration:** 24 horas (padrão)
- **Algoritmo:** HS512

### **Endpoints Públicos**
- `/api/auth/login`
- `/api/auth/register`
- `/api/h2-console/**`

### **Endpoints Protegidos**
- Todos os outros requerem token JWT

---

## 🧪 Testes

### **Testar Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@email.com","password":"senha123"}'
```

### **Testar Chat**
```bash
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"message":"Olá!","model":"gpt-3.5-turbo"}'
```

---

## 📦 Estrutura do Projeto

```
backend/
├── src/main/java/com/cortexai/
│   ├── CortexAiApplication.java    # Classe principal
│   ├── config/                     # Configurações
│   │   └── SecurityConfig.java
│   ├── controller/                 # Controladores REST
│   │   ├── AuthController.java
│   │   ├── ChatController.java
│   │   └── UserController.java
│   ├── dto/                        # Data Transfer Objects
│   │   ├── ChatRequest.java
│   │   ├── ChatResponse.java
│   │   ├── LoginRequest.java
│   │   └── LoginResponse.java
│   ├── model/                      # Entidades JPA
│   │   ├── User.java
│   │   ├── Conversation.java
│   │   └── Message.java
│   ├── repository/                 # Repositórios JPA
│   │   ├── UserRepository.java
│   │   ├── ConversationRepository.java
│   │   └── MessageRepository.java
│   ├── security/                   # Segurança
│   │   ├── JwtAuthenticationFilter.java
│   │   └── CustomUserDetailsService.java
│   ├── ai/                         # IA Própria
│   │   └── CustomNeuralNetwork.java
│   └── service/                    # Serviços de negócio
│       ├── AIService.java
│       ├── AuthService.java
│       ├── ChatService.java
│       └── UserService.java
└── src/main/resources/
    └── application.properties       # Configurações
```

---

## 🚀 Deploy

### **Execução Local (Recomendado)**
```bash
# Compilar
mvn clean install

# Executar
mvn spring-boot:run

# Ou executar o JAR
java -jar target/cortexai-backend-1.0.0.jar
```

### **Heroku**
```bash
# Login
heroku login

# Criar app
heroku create cortexai-backend

# Deploy
git push heroku main
```

### **AWS EC2**
```bash
# Instalar Java 17
sudo apt install openjdk-17-jdk

# Instalar Maven
sudo apt install maven

# Clonar e executar
git clone seu-repo
cd backend
mvn spring-boot:run
```

---

## 📊 Monitoramento

### **Logs**
- **Nível:** Configurável em `application.properties`
- **Local:** Console (desenvolvimento)
- **Produção:** Arquivo ou serviço de logs

### **Métricas**
- Spring Boot Actuator (para adicionar)
- Prometheus + Grafana (recomendado)
- New Relic / Datadog (enterprise)

---

## 🔧 Troubleshooting

### **Erro: Porta 8080 em uso**
```properties
# Mudar porta em application.properties
server.port=8081
```

### **Erro: Conexão com banco de dados**
```properties
# Verificar configuração do banco
spring.datasource.url=...
spring.datasource.username=...
spring.datasource.password=...
```

### **Erro: API key inválida**
```properties
# Verificar API keys no application.properties
openai.api.key=sk-sua-chave-correta
```

---

## 📝 Próximos Passos

1. **Integração completa** com APIs de IA
2. **Sistema de rate limiting**
3. **Webhooks** para integrações
4. **Admin panel** para gestão
5. **Analytics** e métricas avançadas
6. **Cache** com Redis
7. **Message queue** com RabbitMQ

---

## 🎯 Suporte

Para dúvidas ou problemas:
- Verificar logs do console
- Consultar documentação do Spring Boot
- Revisar configurações no `application.properties`

**Backend Spring Boot completo e funcional!** 🚀
