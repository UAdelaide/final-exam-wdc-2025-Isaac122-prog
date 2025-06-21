CREATE TABLE Dogs (
  dog_id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  name VARCHAR(100),
  size VARCHAR(50),
  FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);
