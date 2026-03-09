const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes
const registerRoute = require("./src/routes/registerRoute");
app.use("/api/user",registerRoute);

const incomeRoute = require("./src/routes/incomeRoute");
app.use("/api/income",incomeRoute);

const port = Number(process.env.PORT);

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
});