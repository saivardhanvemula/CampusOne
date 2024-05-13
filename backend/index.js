const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')

require("dotenv").config();
const app = express()

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to ToDos API")
});


const url = "mongodb://localhost:27017";
const port = 5000;

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
}) 