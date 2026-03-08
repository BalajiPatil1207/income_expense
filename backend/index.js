const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");

require("./src/config/db")
app.use(cors());
app.use(express.json());

const registerRoute = require("./src/routes/registerRoute");
app.use("/api/user",registerRoute);

const port = Number(process.env.PORT);

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
});