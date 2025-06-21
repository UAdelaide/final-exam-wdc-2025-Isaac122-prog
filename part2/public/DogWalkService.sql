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
('a','a@example.com','a', 'owner'),
('b','b@example.com','b', 'walker');
