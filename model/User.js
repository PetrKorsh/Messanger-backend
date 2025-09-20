const UserSchema = `CREATE TABLE IF NOT EXISTS
  users (
    user_id SERIAL PRIMARY KEY,
    login VARCHAR(55) NOT NULL UNIQUE,
    firstname VARCHAR(55) NOT NULL,
    lastname VARCHAR(55) NOT NULL,
    patronymic VARCHAR(55),
    bio TEXT,
    email VARCHAR(55) NOT NULL UNIQUE,
    password_hash VARCHAR(55) NOT NULL,
    profile_picture_url VARCHAR(255),
    registration_date TIMESTAMP DEFAULT NOW ()
  )`;

module.exports = User = UserSchema;
