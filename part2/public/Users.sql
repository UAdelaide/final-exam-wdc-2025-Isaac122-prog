DROP DATABASE IF EXISTS Users;
CREATE DATABASE Users;
USE Users;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'walker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO Users (user_id, username, email, password_hash, role, created_at) VALUES
-- (1,'ownerJane', 'jane@example.com', 'hashedpassword123', 'owner', '2025-06-06 01:32:58'),
-- (2, 'walkerMike', 'mike@example.com', 'hashedpassword456', 'walker', '2025-06-06 01:32:58'),
-- (3,'ownerBob', 'bob@example.com', 'hashedpassword789', 'owner', '2025-06-06 01:34:32'),
-- (4,'a','a@example.com','a', 'owner','2025-06-06 01:34:32'),
-- (5,'b','a@example.com','b', 'walker','2025-06-06 01:34:32');
INSERT INTO Users (user_id, username, email, password_hash, role, created_at) VALUES
(1, 'ownerJane', 'jane@example.com', '$2b$10$uMHcK7PaRhU8GjV5rHqJmOaH3N/8yW53R7wrW40ZG08o8Zn2VJXjq', 'owner', '2025-06-06 01:32:58'),
(2, 'walkerMike', 'mike@example.com', '$2b$10$RzO5hbP7/KvAqjbf1UvQSe6U7M43D2L74nnTw9eL6Rw9jL4Va7xXa', 'walker', '2025-06-06 01:32:58'),
(3, 'ownerBob', 'bob@example.com', '$2b$10$TXzHZ0sp3yUuZqOwGjDfPu/XOTkQzAzDNXXzvTQp7lzZce1tRlWJO', 'owner', '2025-06-06 01:34:32'),
(4, 'a', 'a@example.com', '$2b$10$5xnP3EdehUSypzXz7HxGsOmSZ8AK0cgZexA.5YkAXMh1qPQvXkK3a', 'owner', '2025-06-06 01:34:32'),
(5, 'b', 'a@example.com', '$2b$10$8b6pe0XCAc6WmYJpfV.hHu5E5TxULiG8A1qpHdXO9rkkcg.JcSL42', 'walker', '2025-06-06 01:34:32');
