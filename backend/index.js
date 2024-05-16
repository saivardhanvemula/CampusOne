const express = require("express");
const cors = require("cors");
const { MongoClient,ObjectId} = require("mongodb");

const app = express();
app.use(express.json());

app.use(cors());
const uri = "mongodb://localhost:27017";
const port = 5000;
const client = new MongoClient(uri);

app.get("/data", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("students");
        const collection = database.collection("details");
        const data = await collection.find({}).toArray();
        res.json(data);
        await client.close();
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/total", async (req, res) => {
    try {
        await client.connect();
        const database = client.db("students");
        const collection = database.collection("cls");
        const totalClsCursor = collection.find(
            {},
            { projection: { _id: 0, totalCls: 1 } }
        );
        const totalClsArray = await totalClsCursor.toArray();
        const totalClsJSONString = JSON.stringify(totalClsArray);
        console.log(totalClsJSONString);
        res.json({ total: totalClsJSONString });
        await client.close();
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        await client.connect();
        const { email, password, admin } = req.body;
        const database = client.db("students");
        const collection = database.collection(admin ? "admins" : "details");
        const user = await collection.findOne({
            email: email,
            password: password,
        });
        console.log(user);
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
        // console.log(date,su)
        const database = client.db("students");
        const collection = database.collection("notes");
        const notes = await collection.findOne({
            date: date,
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
                // let abslog = student.absenceLog;
                // console.log(abslog);
                // if (abslog.some((entry) => entry.date === Date)) {
                //     if (abslog.includes(subject)) {
                //         console.log("subject already exsist");
                //     }
                //     abslog = addSubjectToDate(abslog, Date, subject);
                // }
                // else {
                //     abslog.push({ date: Date, subjects: [subject] });
                // }
                let abslog = student.absenceLog;
                let dateExists = false;
                let i = 1;

                abslog = abslog.map((log) => {
                    if (log.date === Date) {
                        dateExists = true;
                        if (log.subjects.includes(subject)) {
                            i = 0;
                            console.log(
                                "subject already exists for the given date"
                            );
                        } else {
                            return {
                                ...log,
                                subjects: [...log.subjects, subject],
                            };
                        }
                    }
                    return log;
                });
                if (!dateExists) {
                    abslog.push({
                        date: Date,
                        subjects: [subject],
                    });
                }
                await client
                    .db("students")
                    .collection("details")
                    .updateOne(
                        { rollNumber: rollNumber },
                        {
                            $set: { absenceLog: abslog },
                            $inc: { absentCount: i },
                        }
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
app.post("/UpdateNotes", async (req, res) => {
    try {
        await client.connect();
        console.log("connected");
        const { date, subject, driveLink } = req.body;
        console.log(date, subject, driveLink);
        const database = client.db("students");
        const collection = database.collection("notes");
        const notes = await collection.findOne({
            date: date,
        });
        if (notes === null) {
            // If notes is null, create a new entry
            const newNote = {
                _id: new ObjectId(),
                date: date,
                [subject.subject]: driveLink,
            };
            await collection.insertOne(newNote);
            console.log("New note created:", newNote);
            // res.json({ message: "New note created", note: newNote });
        } else {
            // If notes exists, update the existing entry
            await collection.updateOne(
                { date: date },
                { $set: { [subject.subject]: driveLink } }
            );
            console.log("Note updated:", {
                date: date,
                subject: subject.subject,
                driveLink: driveLink,
            });
            // res.json({ message: "Note updated" });
        }
        // console.log(date,subject);
        // console.log(notes);
        // res.json({ notes: notes });
        await client.close();
        console.log("closed");
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Server error" });
    }
});
const addSubjectToDate = (logs, targetDate, newSubject) => {
    return logs.map((log) => {
        if (log.date === targetDate) {
            // Check if the subject already exists to avoid duplicates
            if (!log.subjects.includes(newSubject)) {
                return {
                    ...log,
                    subjects: [...log.subjects, newSubject],
                };
            }
        }
        return log;
    });
};

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
