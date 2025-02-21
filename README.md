# EstagBee


### Projeto
O Projeto EstagBee visa desenvolver uma plataforma online para facilitar o processo de busca e candidatura a vagas de estágio para os alunos da Universidade Tecnológica Federal do Paraná (UTFPR). A plataforma permitirá que os estudantes da instituição se cadastrem nela, pesquisem e se candidatem a vagas de estágio de acordo com suas áreas de interesse e competências que atendam aos requisitos contidos nelas. Além disso, empresas poderão cadastrar suas vagas de estágio para divulgá-las, gerenciar as candidaturas recebidas, avaliar os candidatos e realizar a comunicação durante o processo de seleção.

### Disciplina
UTFPR-CP - ES44B - Programação Orientada A Objetos 2 - ES41 (2024_01)

## Tecnologias utilizada

<div style="display: inline_block">
  <img align="center" alt="Python" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg">
  <img align="center" alt="Postgresql" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" />
  <img align="center" alt="React" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
          
</div>

### Alunos
- [Gabriel Henrique de Almeida Souza](https://www.linkedin.com/in/gabriel-henrique-de-almeida-souza-3ba475250/)
- [Gustavo Prezoto Boca](https://www.linkedin.com/in/gustavo-prezoto-boca-28485a164/)
- [João Pedro Santos de Araujo](https://www.linkedin.com/in/joaopedrosaraujo/)

## Índice

- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Exemplos](#exemplos)

## Instalação

Para utilizar este projeto, siga os passos abaixo:

1. Clone este repositório em sua máquina:

    ```bash
    git clone https://github.com/Gahas2004/EstagBee.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd EstagBee
    ```

3. Instale as dependências do Node.js utilizando o npm:

    ```bash
    cd my-app
    npm install
    ```

4. Inicie o servidor local do frontend:

    ```bash
    npm start
    ```

5. Instale as dependências do Python utilizando o pip:

    ```bash
    cd ..
    pip install -r requirements.txt
    ```

6. Inicie o serviço do PostgreSQL e crie o banco de dados `estagbee`:

    - Inicie o serviço do PostgreSQL. O método pode variar dependendo do seu sistema operacional.

    - Conecte-se ao PostgreSQL via terminal:

        ```bash
        psql -U seu_usuario
        ```

    - Dentro do PostgreSQL, crie o banco de dados `estagbee`:

        ```sql
        CREATE DATABASE estagbee;
        ```

7. Verifique as configurações do PostgreSQL no arquivo `Constants.py`:

    - Abra o arquivo `Constants.py` localizado no diretório raiz do projeto.

    - Verifique se as configurações de conexão com o PostgreSQL estão corretamente definidas, como nome de usuário, senha, host e nome do banco de dados.

8. Execute o script de criação de tabelas no banco de dados `estagbee`:

    - Acesse o arquivo `script.sql` localizado na pasta `postgres`:

        ```bash
        cd postgres
        ```

    - Conecte-se ao seu banco de dados PostgreSQL e execute o conteúdo do arquivo `script.sql` para criar as tabelas necessárias:

        ```bash
        psql -U seu_usuario -d estagbee -f script.sql
        ```

    Substitua `seu_usuario` pelo seu nome de usuário do PostgreSQL.

9. Inicie o servidor local do backend:

    ```bash
    cd ..
    python main.py
    ```

Após seguir esses passos, o frontend será acessível em `http://localhost:3000` e o backend estará rodando em `http://localhost:8000`. Certifique-se de que as configurações do backend estão corretas para se comunicar com o banco de dados PostgreSQL.



