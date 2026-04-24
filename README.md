# 💱 Conversor de Moedas

> Conversor de câmbio em tempo real com taxas atualizadas via API, fallback offline e interface Glassmorphism.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
<img width="1131" height="847" alt="{0515D184-234E-4070-95FD-327E98346596}" src="https://github.com/user-attachments/assets/6f87cf5a-c0eb-433d-b42f-77ae414db739" />

---

## 🌍 Sobre o Projeto

Projeto desenvolvido em JavaScript puro que converte valores entre as principais moedas do mundo com taxas de câmbio em tempo real, consumindo a [Frankfurter API](https://www.frankfurter.app/).

O foco foi ir além do básico — além de fazer funcionar, o projeto foi completamente redesenhado com atenção à experiência do usuário, qualidade do código e detalhes criativos de interface.

---

## 🚀 Funcionalidades

- 🌐 Taxas de câmbio em tempo real via Frankfurter API
- 🪙 Botão animado em formato de moeda com efeito 3D (CSS rotateY)
- ⇄ Botão para inverter as moedas instantaneamente
- 📊 Cards de taxas gerados dinamicamente via DOM
- 🕐 Timestamp da última atualização das taxas
- 📶 Fallback offline com taxas locais caso a API falhe
- 📱 Layout responsivo para mobile e desktop

---

## 🛠 Tecnologias Utilizadas

- HTML5
- CSS3 (Glassmorphism, animações 3D, Flexbox, Grid)
- JavaScript Vanilla (Async/Await, Promise.all, Fetch API, DOM Manipulation)
- [Frankfurter API](https://www.frankfurter.app/) — gratuita, sem necessidade de chave

---

## ▶️ Como Rodar Localmente

```bash
git clone https://github.com/Dvd-2405/Conversor-de-moedas.git
```

Abra o arquivo `index.html` no navegador. Sem dependências, sem instalação.

---

## 📚 O que eu aprendi

- Consumir APIs externas com Fetch e tratar erros com try/catch
- Requisições assíncronas em paralelo com Promise.all
- Criar animações 3D com CSS (rotateY + perspective)
- Gerar elementos HTML dinamicamente via DOM
- Separar responsabilidades no código (buscar, converter, renderizar)
- Aplicar Glassmorphism com backdrop-filter e rgba

---

## 🔗 Acesse o Projeto

👉 [Clique aqui para acessar](https://dvd-2405.github.io/Conversor-de-moedas/)
