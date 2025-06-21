DROP DATABASE IF EXISTS DogWalkService;
CREATE DATABASE DogWalkService;
USE DogWalkService;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'walker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (username, email, password_hash, role) VALUES
('ownerJane', 'jane@example.com', 'password123', 'owner'),
('walkerMike', 'mike@example.com', 'password456', 'walker'),
('ownerMax','max@example.com','password789', 'owner'),
('walkerThomas','thomas@example.com','b', 'walker');

-- ---------+--------------+--------------------+---------------+--------+---------------------+
-- | user_id | username     | email              | password_hash | role   | created_at          |
-- +---------+--------------+--------------------+---------------+--------+---------------------+
-- |       1 | ownerJane    | jane@example.com   | password123   | owner  | 2025-06-21 05:28:57 |
-- |       2 | walkerMike   | mike@example.com   | password456   | walker | 2025-06-21 05:28:57 |
-- |       3 | ownerMax     | max@example.com    | password789   | owner  | 2025-06-21 05:49:34 |
-- |       4 | walkerThomas | thomas@example.com | password234   | walker | 2025-06-21 05:49:34 |
-- +---------+--------------+--------------------+---------------+--------+--------------------