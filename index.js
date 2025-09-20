const express = require("express");
const { connectDB } = require("./db");
const cors = require("cors");
const userRouters = require("./routes/user.routes");
const PORT = process.env.PORT || 8080;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", userRouters);

app.listen(PORT, () => console.log(`server start localhost:${PORT}`));
