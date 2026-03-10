const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes
const registerRoute = require("./src/routes/registerRoute");
app.use("/api/user",registerRoute);

const auth = require('./src/middleware/registerMiddle');
const incomeRoute = require("./src/routes/incomeRoute");
app.use("/api/income",auth ,incomeRoute);

const expenseRoute = require("./src/routes/expenseRoute");
app.use("/api/expense", auth,expenseRoute);

const port = Number(process.env.PORT);

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
});