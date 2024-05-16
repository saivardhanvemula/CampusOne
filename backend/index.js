const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

app.use(cors());
const uri = "mongodb://localhost:27017";
const port = 5000;
const client = new MongoClient(uri);

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

app.post("/notes", async (req, res) => {
    try {
        await client.connect();
        console.log("connected");
        const { date, subject } = req.body;
        const database = client.db("students");
        const collection = database.collection("notes");
        const notes = await collection.findOne({
            date: date,
            subject: { $exists: true },
        });
        // console.log(date,subject);
        console.log(notes);
        res.json({ notes: notes });
        await client.close();
        console.log("closed");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/UpdateAttendance", async (req, res) => {
    try {
        await client.connect();
        console.log("connected");
        const { Date, absentees, subject } = req.body;
        console.log(Date, absentees, subject);
        for (const rollNumber of absentees) {
            console.log(rollNumber);
            const student = await client
                .db("students")
                .collection("details")
                .findOne({ rollNumber: rollNumber });
            // console.log(student)
            if (student) {
                student.attendance.absentCount =
                    student.attendance.absentCount + 1;
                let abslog = student.absenceLog;
                if (abslog.some((entry) => entry.date === Date)) {
                    let a = abslog.find((e) => e.date === Date);
                    console.log(a);
                } else {
                    abslog.push({ date: Date, subjects: [subject] });
                }
                await client
                    .db("students")
                    .collection("details")
                    .updateOne(
                        { rollNumber: rollNumber },
                        { $set: { absenceLog: abslog } }
                    );

                console.log(
                    `Updated absence log for roll number ${rollNumber}`
                );
            } else {
                console.log(`Student with roll number ${rollNumber} not found`);
            }
        }

        await client.close();
        console.log("closed");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
