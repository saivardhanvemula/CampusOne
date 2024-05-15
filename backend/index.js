const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

app.use(cors());
const uri = "mongodb://localhost:27017";
const port = 5000;
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
    res.send("Welcome to ToDos API");
});
app.post("/login", async (req, res) => {
    try {
        await client.connect();
        const { email, password } = req.body;
        const database = client.db("students");
        const collection = database.collection("details");
        // console.log("Received login request:", req.body);
        // console.log(req.body)
        const user = await collection.findOne({
            email: email,
            password: password,
        });  
        console.log(user)
        if (user) {
            res.json({ user:user});
        } else {
            res.json({ user:user});
        }
        await client.close();
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
