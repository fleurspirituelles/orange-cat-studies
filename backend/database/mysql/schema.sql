CREATE DATABASE IF NOT EXISTS purrfect_studies;

USE purrfect_studies;

CREATE TABLE
    IF NOT EXISTS usuarios (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS albuns (
        id_album INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
        ano INT NOT NULL CHECK (ano >= 2000),
        total_dias INT NOT NULL CHECK (total_dias BETWEEN 28 AND 31),
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS editais (
        id_edital INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        nome_concurso VARCHAR(100) NOT NULL,
        banca VARCHAR(50),
        nivel VARCHAR(50),
        ano INT,
        cargo VARCHAR(100),
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS questoes (
        id_questao INT AUTO_INCREMENT PRIMARY KEY,
        id_edital INT NOT NULL,
        enunciado TEXT NOT NULL,
        gabarito CHAR(1) NOT NULL CHECK (gabarito IN ('A', 'B', 'C', 'D', 'E')),
        FOREIGN KEY (id_edital) REFERENCES editais (id_edital) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS alternativas (
        id_alternativa INT AUTO_INCREMENT PRIMARY KEY,
        id_questao INT NOT NULL,
        letra CHAR(1) NOT NULL CHECK (letra IN ('A', 'B', 'C', 'D', 'E')),
        descricao TEXT NOT NULL,
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS temas (
        id_tema INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS questoes_temas (
        id_questao INT NOT NULL,
        id_tema INT NOT NULL,
        PRIMARY KEY (id_questao, id_tema),
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_tema) REFERENCES temas (id_tema) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS respostas (
        id_resposta INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_questao INT NOT NULL,
        alternativa_escolhida CHAR(1) NOT NULL CHECK (
            alternativa_escolhida IN ('A', 'B', 'C', 'D', 'E')
        ),
        tempo_resposta INT,
        data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS revisoes (
        id_revisao INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_questao INT NOT NULL,
        data_marcacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_questao) REFERENCES questoes (id_questao) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS desempenho (
        id_desempenho INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        data_inicio DATE NOT NULL,
        data_fim DATE NOT NULL,
        qtd_questoes INT CHECK (qtd_questoes >= 0),
        qtd_acertos INT CHECK (qtd_acertos >= 0),
        tempo_medio_resposta INT,
        tema_mais_errado VARCHAR(100),
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
    );