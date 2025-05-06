CREATE DATABASE IF NOT EXISTS purrfect_studies;

USE purrfect_studies;

CREATE TABLE
    usuarios (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_cadastro DATE NOT NULL
    );

CREATE TABLE
    albuns (
        id_album INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        mes INT NOT NULL,
        ano INT NOT NULL,
        total_dias INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    );

CREATE TABLE
    editais (
        id_edital INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        nome_concurso VARCHAR(100) NOT NULL,
        banca VARCHAR(50),
        nivel VARCHAR(50),
        ano INT,
        cargo VARCHAR(100),
        data_criacao DATE NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    );

CREATE TABLE
    questoes (
        id_questao INT AUTO_INCREMENT PRIMARY KEY,
        id_edital INT NOT NULL,
        enunciado TEXT NOT NULL,
        gabarito CHAR(1) NOT NULL,
        FOREIGN KEY (id_edital) REFERENCES editais (id_edital)
    );

CREATE TABLE
    alternativas (
        id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
        id_questao INT NOT NULL,
        letra CHAR(1) NOT NULL,
        descricao TEXT NOT NULL,
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao)
    );

CREATE TABLE
    temas (
        id_tema INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE
    questoes_temas (
        id_questao INT NOT NULL,
        id_tema INT NOT NULL,
        PRIMARY KEY (id_questao, id_tema),
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao),
        FOREIGN KEY (id_tema) REFERENCES temas (id_tema)
    );

CREATE TABLE
    respostas (
        id_resposta INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_questao INT NOT NULL,
        alternativa_escolhida CHAR(1) NOT NULL,
        tempo_resposta INT,
        data_resposta DATE NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao)
    );

CREATE TABLE
    revisoes (
        id_revisao INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_questao INT NOT NULL,
        data_marcacao DATE NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao)
    );

CREATE TABLE
    desempenho (
        id_desempenho INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        data_inicio DATE NOT NULL,
        data_fim DATE NOT NULL,
        qtd_questoes INT,
        qtd_acertos INT,
        tempo_medio_resposta INT,
        tema_mais_errado VARCHAR(100),
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    );