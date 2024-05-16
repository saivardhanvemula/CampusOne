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

//login api
app.post("/login", async (req, res) => {
    try {
        client.connect();
        const { email, password } = req.body;
        const database = client.db("students");
        const collection = database.collection("details");
        const user = await collection.findOne({
            email: email,
            password: password,
        });
        if (user) {
            res.json({ user: user });
        } else {
            res.json({ user: user });
        }
        await client.close();
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//notes api
app.post("/notes", async (req, res) => {
    try {
        client.connect()
        const { date,subject } = req.body;
        const database = client.db("students");
        const collection = database.collection("notes");
        const notes = await collection.findOne({
            date:date,
            subject:{$exists :true}
        })
        console.log(date,subject);
        console.log(notes)
        res.json({notes:notes})
        await client.close()
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
