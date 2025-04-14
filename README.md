# React Calculator 🧮

Uma calculadora simples desenvolvida em React, feita como exercício pessoal de aprendizado. O foco principal foi aplicar boas práticas de organização de projeto, modularização de componentes e utilização da Context API para o gerenciamento de estado global.

> Projeto criado por **Guilherme Torres.** ([guibbers](https://github.com/guibbers)).

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- Context API
- JavaScript (ES6+)
- CSS Modules (ou estilização separada por componente)

## 📁 Estrutura do projeto

```bash
react-calculator/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Componentes reutilizáveis (Button, Display, etc.)
│   ├── context/           # Provider e contexto global da calculadora
│   ├── styles/            # Estilização modular
│   ├── utils/             # Funções auxiliares (como lógica de cálculo)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## ⚙️ Como rodar o projeto
1 - Clone o repositório:

```bash
git clone https://github.com/guibbers/react-calculator.git
```

2 - Instale as dependências:
```bash
npm install
# ou
yarn
```
3 - Rode o projeto:
```bash
npm run dev
# ou
yarn dev
```

4 - Acesse no navegador:
```bash
http://localhost:5173
```
### Este projeto usa [Vite](https://vite.dev/) para um ambiente de desenvolvimento rápido.
