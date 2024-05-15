import { React, useState, useEffect, useContext } from "react";
import AttendanceChart from "./components/AttendanceChart";
import AbsentLog from "./components/AbsentLog";
import DonutChart from "./components/DonutChart";
import NotesDownloader from "./components/DownloadNotes";

import UserContext from "./UserContext";

import "./Homepage.css";
export const Homepage = () => {
    const { UserData, setUserData } = useContext(UserContext);

    const [percentage, setPercentage] = useState(0);
    console.log(UserData);
    if (!UserData) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        setPercentage(
            (UserData.attendance.presentCount /
                (UserData.attendance.presentCount +
                    UserData.attendance.absentCount)) *
                100
        );
        console.log(percentage, UserData);
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
    return (
        <div className="DashBoard">
            <div className="details">
                <h2>Name:{UserData.name}</h2>
                <p>RollNo :{UserData.rollNumber}</p>
            </div>
            <div className="attendance">Your attendance is {percentage} %</div>
            <p style={{ color: textColor }} className="warning">
                {warningMessage}
            </p>
            <AbsentLog data={UserData.absenceLog} />
            {/* <AttendanceChart data={student.attendance}/> */}
            {/* <DonutChart data={[student.attendance.presentCount, student.attendance.absentCount]} /> */}
            <NotesDownloader />
        </div>
    );
};
