# Clutch Chat

O Clutch Chat é um aplicativo de chatbot full-stack desenvolvido com React no frontend, Node.js com Express no backend e MongoDB como banco de dados. Ele integra a API do PandaScore para fornecer informações históricas sobre a organização Fúria, além de utilizar a API da OpenAI para oferecer capacidades de processamento de linguagem natural (NLP) com RAG (Retrieval-Augmented Generation), treinado com dados históricos da Fúria. Isso permite interações conversacionais mais ricas e contextuais com os usuários. O chatbot também inclui funcionalidades de autenticação (login e registro), configuração de avatar e uma interface de chat interativa.

![Login](https://github.com/marcub/chat-bot-node-react/blob/main/images/login.png)

![Register](https://github.com/marcub/chat-bot-node-react/blob/main/images/register.png)

![SetAvatar](https://github.com/marcub/chat-bot-node-react/blob/main/images/setAvatar.png)

![Chat](https://github.com/marcub/chat-bot-node-react/blob/main/images/chat.png)

## Funcionalidades

- **Frontend Interativo**: Interface de usuário construída com React, com rotas para registro, login, configuração de avatar e chat.
- **Processamento de Linguagem Natural**: Integração com a API da OpenAI para respostas contextuais e conversas naturais.
- **Autenticação**: Páginas de login e registro para gerenciar usuários.
- **Configuração de Avatar**: Funcionalidade para personalizar o avatar do usuário.
- **RAG (Retrieval-Augmented Generation)**: Suporte para processamento de documentos (PDFs) e geração de respostas baseadas em contexto.

## Tecnologias Utilizadas

- **Frontend**:
  - React.js
- **Backend**:
  - Node.js
  - Express.js

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:
- Node.js 
- npm 
- MongoDB
- Uma chave de API da OpenAI (obtida em [OpenAI Dashboard](https://platform.openai.com/account/api-keys))
- Uma chave de API do PandaScore (obtida em [Panda Score](https://app.pandascore.co/))

Todos precisam estar instalados e tenha certeza que o serviço do MongoDB esteja rodando.

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

### 1. Clone o Repositório
```bash
git clone https://github.com/marcub/chat-bot-node-react.git
cd chat-bot-node-react
```

### 2. Configure o Backend
1. Navegue até o diretório do servidor:
   ```bash
   cd server
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na pasta `server` e adicione as variáveis abaixo:
   ```
   PORT=5000
   MONGO_URL=sua-conexão-aqui
   ACCESS_TOKEN_PANDA=sua-chave-aqui
   OPENAI_API_KEY=sua-chave-aqui
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor estará rodando em `http://localhost:5000`.

### 3. Configure o Frontend
1. Em outro terminal, navegue até o diretório do frontend:
   ```bash
   cd public
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o aplicativo React:
   ```bash
   npm start
   ```
   O frontend estará rodando em `http://localhost:3000` e redirecionará automaticamente para a página de login.

### 4. Acesse o Aplicativo
- Abra seu navegador e vá para `http://localhost:3000`.
- Registre-se ou faça login para começar a interagir com o chatbot.

## Estrutura do Projeto

- **`/public`**: Contém o frontend React.
  - `/src/pages`: Páginas principais (`Chat.jsx`, `Login.jsx`, `Register.jsx`, `SetAvatar.jsx`).
  - `/src/utils`: Utilitários (ex.: `ApiROUTES.js` para chamadas de API).
- **`/server`**: Contém o backend Node.js.
  - `/controller`: Controladores (ex.: `chatController.js`, `pandaController.js`).
  - `/routes`: Rotas da API (ex.: `ragRoutes.js`).
  - `/service`: Serviços (ex.: `ragService.js` para integração com OpenAI).
  - `/rag`: Arquivos relacionados a RAG (ex.: `docs/` para PDFs, `model/` para modelos).

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).