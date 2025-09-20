const freindSchema = `CREATE TABLE IF NOT EXISTS
  user_friends (
    user_id INT,
    friend_id INT,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (friend_id) REFERENCES users (user_id)
    )
  `;

module.exports = Freind = freindSchema;
