const Pool = require("pg").Pool;
const User = require("./model/User");
const Freind = require("./model/Freinds");
const Message = require("./model/Message");

const pool = new Pool({
  user: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "zombiedb",
});

const connectDB = async () => {
  try {
    await pool.connect();
    await pool.query(User);
    await pool.query(Freind);
    await pool.query(Message);
    console.log("DB connect");
  } catch (error) {
    console.log("Connection error ): " + error);
    //exit proccess
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB,
};
