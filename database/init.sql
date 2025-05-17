-- tabela uzytkownikow
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255)
);

-- Tabela wiadomości (id wysyłajacy_id, otrzymujacy_id, wiadomosc, )
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    content VARCHAR(500),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

INSERT INTO users (name, email) VALUES
  ('Alice Johnson', 'alice@example.com', 123456789),
  ('Bob Smith', 'bob@example.com', 696969696),
  ('Charlie Brown', 'charlie@example.com', 2137);