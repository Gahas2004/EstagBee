CREATE DATABASE estagbee

-- Criar a tabela Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    credencial_login VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criar a tabela Estudante que herda de Usuario
CREATE TABLE Estudante (
    id_estudante SERIAL PRIMARY KEY,
    RA INT,
    nome VARCHAR(255),
    curso VARCHAR(255),
    FOREIGN KEY (id_estudante) REFERENCES Usuario (id)
);

-- Criar a tabela Empresa que herda de Usuario
CREATE TABLE Empresa (
    id_empresa SERIAL PRIMARY KEY,
    CNPJ VARCHAR(14),
    nome VARCHAR(255),
    infoVaga TEXT,
    FOREIGN KEY (id_empresa) REFERENCES Usuario (id)
);

-- Criar a tabela Vaga
CREATE TABLE Vaga (
    id_vaga SERIAL PRIMARY KEY,
    descricao TEXT,
    nome_empresa VARCHAR(255),
	foto BYTEA,
    FOREIGN KEY (nome_empresa) REFERENCES Usuario (credencial_login)
);

-- Criar a tabela Curriculo
CREATE TABLE Curriculo (
    id_curriculo SERIAL PRIMARY KEY,
    nome_arquivo VARCHAR(255),
    id_estudante INT,
    FOREIGN KEY (id_estudante) REFERENCES Estudante (id_estudante)
);
