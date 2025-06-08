DROP DATABASE IF EXISTS purrfect_studies;
CREATE DATABASE purrfect_studies;
USE purrfect_studies;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS albums (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    month INT NOT NULL CHECK (
        month BETWEEN 1
        AND 12
    ),
    year INT NOT NULL CHECK (year >= 2000),
    total_days INT NOT NULL CHECK (
        total_days BETWEEN 28
        AND 31
    ),
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS exams (
    id_exam INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    exam_name VARCHAR(100) NOT NULL,
    board VARCHAR(50),
    level VARCHAR(50),
    year INT,
    position VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS questions (
    id_question INT AUTO_INCREMENT PRIMARY KEY,
    id_exam INT NOT NULL,
    statement TEXT NOT NULL,
    answer_key CHAR(1) NOT NULL CHECK (answer_key IN ('A', 'B', 'C', 'D', 'E')),
    FOREIGN KEY (id_exam) REFERENCES exams (id_exam) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS choices (
    id_choice INT AUTO_INCREMENT PRIMARY KEY,
    id_question INT NOT NULL,
    letter CHAR(1) NOT NULL CHECK (letter IN ('A', 'B', 'C', 'D', 'E')),
    description TEXT NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions (id_question) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS answers (
    id_answer INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_question INT NOT NULL,
    selected_choice CHAR(1) NOT NULL CHECK (selected_choice IN ('A', 'B', 'C', 'D', 'E')),
    answer_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_question) REFERENCES questions (id_question) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS performance (
    id_performance INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    question_count INT CHECK (question_count >= 0),
    correct_count INT CHECK (correct_count >= 0),
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comics (
    id_comic INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    comic_date DATE NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);