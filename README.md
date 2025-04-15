# Projeto de Classificados Desafio Spedy

---
### ✅ Solicitações do Desafio
---
### Tela inicial
![image](https://github.com/user-attachments/assets/f72a69d6-1be0-4bb1-8c32-7af6cd6361e6)

### Tela para criar novo classificado
![image](https://github.com/user-attachments/assets/d9568096-73a6-41e4-9574-98ded2167b19)

### Tela com filtro por Tag
![image](https://github.com/user-attachments/assets/deef8505-3075-4d57-9c0f-549f52b6e729)

### Tela com filtro por palavra-chave
![image](https://github.com/user-attachments/assets/3cc23e8e-0939-474b-8124-1843f098a1a2)

# Frontend

---

## 🚀 Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)

---

## 🌐 Rotas da Aplicação

- `/` → Página principal com os classificados.
- `/mostrarComponentes` → Página de testes para visualizar componentes isoladamente.

---

# 🛠️ Backend
---

### 🚀 Tecnologias Utilizadas

- [.NET 8](https://dotnet.microsoft.com/pt-br/)
- [Entity Framework Core](https://learn.microsoft.com/pt-br/ef/)
- [PostgreSQL](https://www.postgresql.org/)
- [ASP.NET Core Web API](https://learn.microsoft.com/aspnet/core/web-api)

---

### 📡 Endpoints da API

A seguir estão os endpoints disponíveis para integração com o front-end:

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET`  | `/api/classificados` | Lista todos os classificados (mais recentes primeiro). |
| `POST` | `/api/classificados` | Cria um novo classificado com título, descrição e tags. Tags novas são criadas automaticamente. |
| `GET`  | `/api/classificados/buscar?termo=valor` | Retorna classificados cujo título ou descrição contenham o termo informado, ou seja, busca por palavras-chave. |
| `GET`  | `/api/classificados/por-tag?nome=Tag1` | Lista classificados associados a uma tag específica. |
| `GET`  | `/api/tags` | Retorna a lista de todas as tags cadastradas. |








