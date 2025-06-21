CREATE TABLE Dogs (
  dog_id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  name VARCHAR(100),
  size VARCHAR(50),
  FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);


INSERT INTO Users (dog_id, owner_id, name, size) VALUES
('ownerJane', 'jane@example.com', 'password123', 'owner'),
('walkerMike', 'mike@example.com', 'password456', 'walker'),
('ownerMax','max@example.com','password789', 'owner'),
('walkerThomas','thomas@example.com','password234', 'walker');


-- +--------+----------+-------+--------+---------------------+
-- | dog_id | owner_id | name  | size   | created_at          |
-- +--------+----------+-------+--------+---------------------+
-- |      1 |        1 | Buddy | Medium | 2025-06-21 05:47:31 |
-- |      2 |        1 | Lucy  | Small  | 2025-06-21 05:47:31 |
-- |      3 |        3 | David | Large  | 2025-06-21 05:47:31 |
-- |      4 |        3 | Emma  | Small  | 2025-06-21 05:47:31 |
-- +--------+----------+-------+--------+---------------------+