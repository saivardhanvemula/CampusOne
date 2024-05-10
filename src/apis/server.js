const express = require("express");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
app.get("/data", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("students");
        const collection = database.collection("details");
        const StudentDetails = await collection.find({}).toArray();
        console.log(StudentDetailsj
        res.json(StudentDetails)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});