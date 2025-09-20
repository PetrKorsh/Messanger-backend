const messageSchema = `CREATE TABLE
  IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    content TEXT,
    sent_at TIMESTAMP DEFAULT NOW (),
    FOREIGN KEY (sender_id) REFERENCES users (user_id),
    FOREIGN KEY (receiver_id) REFERENCES users (user_id)
    )
  `;

module.exports = message = messageSchema;
