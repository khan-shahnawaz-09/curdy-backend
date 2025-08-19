const express = require("express");
const { mongoConnect } = require("./config/db");
const { taskRoute } = require("./routes/task");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("server run");
});

// config
mongoConnect();
//routes
app.use(taskRoute);
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`your server is running on http://localhost:${PORT} `);
});
