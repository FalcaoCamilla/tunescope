# 🎵 TuneScope

**TuneScope** é um projeto desenvolvido para navegar entre artistas, álbuns e músicas, utilizando a API Web do Spotify como fonte de dados. Este README fornece uma visão geral da estrutura do projeto e das principais funcionalidades.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── app/                           # Lógica da aplicação e componentes principais
│   ├── app-routing.module.ts      # Configuração de rotas da aplicação
│   ├── app.component.scss         # Estilos do componente principal
│   ├── app.component.ts           # Lógica do componente principal
│   ├── app.module.ts              # Módulo raiz da aplicação
│   ├── core/                      # Funcionalidades centrais e serviços globais
│   │   ├── guards/                # Guardas de rotas para controle de acesso
│   │   ├── interceptors/          # Interceptores HTTP para manipulação de requisições e respostas
│   │   ├── interfaces/            # Mapeamento e tipagem de services
│   │   ├── models/                # Tipagens específicas da pasta core
│   │   └── services/              # Serviços centrais (ex.: autenticação, tokens)
│   ├── pages/                     # Páginas principais da aplicação
│   └── shared/                    # Recursos reutilizáveis
│       ├── components/            # Componentes compartilhados (ex.: cards, skeletons)
│       ├── interfaces/            # Mapeamento e tipagem de services
│       ├── models/                # Tipagens específicas da pasta compartilhada
│       ├── pipes/                 # Pipes customizados para transformação de dados
│       └── services/              # Serviços compartilhados (ex.: manipulação de listas)
├── assets/                        # Recursos estáticos (imagens, ícones, estilos)
│   ├── styles/                    # Estilos globais e auxiliares
│   │   ├── _animations.scss       # Animações reutilizáveis
│   │   ├── _base.scss             # Estilos base e resets globais
│   │   ├── _colors.scss           # Paleta de cores do projeto
│   │   ├── _mixins.scss           # Conjunto de mixins SCSS reutilizáveis
│   │   └── _variables.scss        # Variáveis globais para cores, fontes, etc.
│   ├── icons/                     # Ícones SVG ou outros formatos
│   └── images/                    # Imagens utilizadas na interface
├── environments/                  # Configurações de ambiente
│   ├── environment.prod.ts        # Configuração para produção
│   └── environment.ts             # Configuração para desenvolvimento
├── favicon.ico                    # Ícone do site
├── index.html                     # Estrutura principal da página inicial
├── main.ts                        # Ponto de entrada da aplicação
└── styles.scss                    # Estilos globais do projeto
```
---

## 🌟 Funcionalidades
- **Listagem de Artistas:** Explore artistas populares diretamente da API do Spotify.
- **Detalhes de Artistas:** Visualize informações detalhadas sobre cada artista, incluindo seus álbuns e músicas.
- **Visualização de Álbuns:** Acesse capas, títulos e faixas de álbuns de cada artista.
- **Detalhes de Músicas:** Veja os dados das faixas disponíveis em cada álbum.
- **Autenticação com Spotify:** Permite login via Spotify para acessar dados personalizados do usuário.
- **Artistas Favoritos:** Exibe os artistas seguidos pelo usuário autenticado.

---

## 🚀 Tecnologias Utilizadas

- **Linguagens:** TypeScript, SCSS, HTML, JavaScript.
- **Framework:** Angular16.
- **Estilização:** SCSS com organização modular.

---

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/FalcaoCamilla/tunescope.git
   cd tunescope

2. **Instale as dependências:**
   ```bash
   npm install

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm start

3. **Acesse a aplicação no navegador:**
   ```code
   http://localhost:4200

