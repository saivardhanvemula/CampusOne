import { React, useState, useEffect, useContext } from "react";
import AttendanceChart from "./components/AttendanceChart";
import AbsentLog from "./components/AbsentLog";
import DonutChart from "./components/DonutChart";
import NotesDownloader from "./components/DownloadNotes";
import axios from "axios";

import UserContext from "./UserContext";

import "./Homepage.css";
export const Homepage = () => {
    const { UserData, setUserData } = useContext(UserContext);
    const [totalClasses, setTotalClasses] = useState(0);
    // let total = 0;
    const [percentage, setPercentage] = useState(0);
    // console.log(UserData);+
    if (!UserData) {
        return <div>Loading...</div>;
    }
    async function getTotalCls() {
        try {
            const res = await axios.get("http://localhost:5000/total");
            const total = JSON.parse(res.data.total); 
            // console.log(typeof(total))
            setTotalClasses(total[0].totalCls);
        } catch (error) {
            console.error("Error fetching total classes:", error);
        }
    }

    useEffect(() => {
        getTotalCls();
    }, []);
    useEffect(() => {
        console.log(totalClasses,UserData.absentCount)
        setPercentage(
            ((totalClasses - UserData.absentCount) / totalClasses) * 100
        );
    }, [totalClasses, UserData.absentCount]);
    // async function getTotalCls() {
    //     const res = await axios.get("http://localhost:5000/total");
    //     total = JSON.parse(res.data.total)[0].totalCls;
    //     console.log(total)
    //     return total
    // }
    // useEffect(() => {
    //     total=getTotalCls();
    //     console.log(total,UserData.absenceCount)
    //     setPercentage((total - UserData.absentCount / total) * 100);
    //     // console.log(percentage, UserData);
    // }, []);
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
            <div className="abslog">
                <AbsentLog data={UserData.absenceLog} />
            </div>
            {/* <AttendanceChart data={student.attendance}/> */}
            {/* <DonutChart data={[student.attendance.presentCount, student.attendance.absentCount]} /> */}
            <div className="nts">
                <NotesDownloader />
            </div>
        </div>
    );
};
