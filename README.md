# Criptomoedas

Aplicação web para consulta e visualização de informações sobre criptomoedas, desenvolvida com React, TypeScript e Vite. O projeto foi desenvolvido como parte da **Formação em Desenvolvimento Web Fullstack**, com foco na aplicação prática de conceitos de React, TypeScript, consumo de API, gerenciamento de estado, roteamento e organização de código.

## Tecnologias

* React
* TypeScript
* Vite
* React Router
* CoinCap API

## Funcionalidades

* Listar criptomoedas
* Exibir informações das criptomoedas:
  * Ícone
  * Nome
  * Símbolo
  * Market Cap
  * Preço
  * Volume
  * Variação nas últimas 24 horas
* Formatar os valores exibidos
* Indicar visualmente a variação positiva ou negativa das criptomoedas
* Pesquisar criptomoedas
* Filtrar resultados em tempo real
* Carregar mais criptomoedas
* Acessar a página de detalhes de uma criptomoeda
* Interface responsiva
* Tratamento de estados vazios

## Regras de negócio

* Os dados das criptomoedas são obtidos através da CoinCap API.
* A busca filtra os resultados conforme o texto informado pelo usuário.
* Quando não houver criptomoedas correspondentes à busca, a aplicação apresenta um estado vazio.
* O nome da criptomoeda permite acessar sua página de detalhes.
* Os valores numéricos são formatados antes de serem apresentados ao usuário.
* A variação de preço das últimas 24 horas possui indicação visual de acordo com seu valor.

## Estados vazios

Quando não houver criptomoedas para exibir, a aplicação apresenta uma mensagem informando que nenhum resultado foi encontrado.

## Instalação

```bash
git clone https://github.com/pixwell/criptomoeda.git

cd criptomoeda

npm install

npm run dev
```

## Deploy

Projeto será publicado na Vercel.

**Demo:** Em breve
