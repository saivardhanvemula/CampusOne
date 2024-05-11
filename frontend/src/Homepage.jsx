import { React, useState, useEffect } from "react";
import AttendanceChart from "./AttendanceChart";
import AbsentLog from "./AbsentLog";
import DonutChart from "./DonutChart";
import NotesDownloader from "./DownloadNotes";
import "./Homepage.css";
export const Homepage = () => {
    const [percentage, setPercentage] = useState(0);
    // const [warningMessage, setwarningMessage] = useState("");
    // const [textColor, settextColor] = useState("");

    useEffect(() => {
        setPercentage(
            (student.attendance.presentCount /
                (student.attendance.presentCount +
                    student.attendance.absentCount)) *
                100
        );
        console.log(percentage);
    }, []);
    let warningMessage = "";
    let textColor = "";

    if (percentage >= 75) {
        warningMessage = "Your attendance is good. Keep it up!";
        textColor = "green";
    } else if (percentage >= 65 && percentage < 75) {
        warningMessage = "You are likely to detain. Be regular.";
        textColor = "orange";
    } else {
        warningMessage = "You are going to detain.";
        textColor = "red";
    }

    const student = {
        name: "Krishna Anirudh",
        rollNumber: "123456878",
        attendance: {
            presentCount: 80,
            absentCount: 20,
        },
        absenceLog: [
            { date: "2024-05-01", subjects: ["Maths", "Science"] },
            { date: "2024-05-03", subjects: ["History"] },
            { date: "2024-05-05", subjects: ["Maths", "Science", "History"] },
        ],
    };

    return (
        <div className="DashBoard">
            <div className="details">
                <h2>Name:{student.name}</h2>
                <p>{student.rollNumber}</p>
            </div>
            <div className="attendance">Your attendance is {percentage} %</div>
            <p style={{ color: textColor }} className="warning">
                {warningMessage}
            </p>
            <AbsentLog data={student.absenceLog} />
            {/* <AttendanceChart data={student.attendance}/> */}
            {/* <DonutChart data={[student.attendance.presentCount, student.attendance.absentCount]} /> */}
            <NotesDownloader />
        </div>
    );
};
