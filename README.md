# Send.Me-Back-end 

Esta API está associada à requisições HTTP e principalmente cadastro de usuários no sistema.

## Principais tecnologias utilizadas

### Foram utilizados:

- Sequelize 
- Express js
- Typescript
- Visual Studio Code

## Utilização

Para utilizar a aplicação é necessário ter instalado o Node.js. Com ele já instalado basta clonar este repositório e abrir a pasta em um editor de código, o Visual Studio Code é o mais recomendável. Então, rodar o comando "npm install" na raiz do projeto para que todas as dependências sejam instaladas.

### Comandos da aplicação:

1. **"npm run dev"** = para rodar a aplicação no modo desenvolvimento
2. **"npm run build"** = para converter os arquivos ts do desenvolvimento para js
3. **"npm run start"** = para rodar a aplicação no modo produção


## Atual organização de pastas

| Nome da pasta | Função |
|--------|---------------|
| config | Arquivos para configuração com o banco de dados |
| controller | Arquivos para guardar a lógica rotas |
| model | Arquivos para guardar as entidades do banco de dados |
| routes | Arquivos para organizar e configurar as rotas | 
| services | Arquivos para guardar a lógica do gerenciamento de erros |

## Tabela de rotas disponíveis 

| Método | Rota | Função |
|--------|------|--------|
| Post | create/associate| Cadastrar Associado |
| Get | get/associates | Trazer todos os associados |
| Get | get/associate/{id} | Trazer um associado específico |
