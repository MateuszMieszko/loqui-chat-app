CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    deleted TINYINT(1) DEFAULT 0
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE blacklisted_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL UNIQUE,
    blacklisted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    reason VARCHAR(255) NULL
);

INSERT INTO users (username, password_hash) VALUES
    ('alice', '$2b$10$a2oQIMNg1mkZqQla1cnEDOVQdKKJxts6dkQ6oAr93ksCF8u/v6Rpe'), -- hasło: abcde
    ('bob',   '$2y$10$qrstuvwxyzabcdefghij'),
    ('carol', '$2y$10$12345678901234567890');

INSERT INTO messages (sender_id, receiver_id, content, created_at) VALUES
    (1, 2, 'Cześć Bob, jak się masz?',                  '2025-05-15 09:12:00'),
    (2, 1, 'Hej Alice! Wszystko w porządku, a u Ciebie?', '2025-05-15 09:13:10'),
    (1, 3, 'Cześć Carol, potrzebuję Twojej pomocy.',     '2025-05-15 10:05:45'),
    (3, 1, 'Jasne, Alice. Co się dzieje?',               '2025-05-15 10:06:30'),
    (2, 3, 'Carol, masz chwilę na rozmowę?',             '2025-05-15 11:20:00'),
    (3, 2, 'Pewnie, co się stało?',                      '2025-05-15 11:21:05'),
    (1, 2, 'Zastanawiam się nad wspólnym projektem.',    '2025-05-16 08:03:00'),
    (2, 1, 'Brzmi ciekawie! Masz coś konkretnego na myśli?', '2025-05-16 08:04:15'),
    (1, 2, 'Myślę o aplikacji do planowania zadań.',     '2025-05-16 08:06:00'),
    (2, 1, 'Świetny pomysł. Kiedy możemy porozmawiać?',  '2025-05-16 08:07:30'),
    (3, 1, 'Alice, wysłałam Ci dokumenty mailem.',       '2025-05-16 09:00:00'),
    (1, 3, 'Dzięki, już sprawdzam.',                     '2025-05-16 09:01:45'),
    (2, 3, 'Carol, czy możesz sprawdzić mój kod?',       '2025-05-16 10:15:00'),
    (3, 2, 'Jasne, prześlę Ci uwagi wieczorem.',         '2025-05-16 10:16:00'),
    (1, 2, 'Bob, dodałam nową funkcję do aplikacji.',    '2025-05-17 07:45:00'),
    (2, 1, 'Zaraz ją przetestuję.',                      '2025-05-17 07:46:30'),
    (3, 1, 'Alice, masz chwilę na spotkanie online?',    '2025-05-17 12:00:00'),
    (1, 3, 'Tak, pasuje mi za 10 minut.',                '2025-05-17 12:01:15'),
    (2, 3, 'Carol, prezentacja jest gotowa?',            '2025-05-17 13:20:00'),
    (3, 2, 'Jeszcze ją kończę, potrzebuję godziny.',     '2025-05-17 13:21:45');
