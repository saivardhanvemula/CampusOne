import React, { useState, useCallback } from "react";
import "./attendanceUpdate.css";
import axios from "axios";

export const UpdateAttendance = ({subject}) => {
    const rollNumbers = ["123456871", "123456872", "123456873", "123456874", "123456875", "123456876", "123456877", "123456878", "123456879", "123456870"]

    const [absentees, setAbsentees] = useState([]);
    const [Date, setDate] = useState("");
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!Date) {
            alert("Please select a date.");
            return; // Don't proceed further if date is not selected
        }
        console.log("Absentees:", absentees);
        // console.log(changeDateFormat(Date));
        console.log(Date);

        try {
            const response = await axios.post(
                "http://localhost:5000/UpdateAttendance",
                {
                    Date: Date,
                    absentees,
                    subject
                }
            );
            console.log("Response:", response.data);
            // Handle response data as needed
        } catch (error) {
            console.error("Error updating attendance:", error);
            // Handle error, e.g., show error message to user
        }
    };

    function changeDateFormat(inputDate) {
        const parts = inputDate.split("-");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        return formattedDate;
    }
    const toggleAttendance = useCallback((n) => {
        setAbsentees((prevAbsentees) => {
            if (prevAbsentees.includes(n)) {
                return prevAbsentees.filter((item) => item !== n);
            } else {
                return [...prevAbsentees, n];
            }
        });
    }, []);
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    return (
        <div>
            <h2>Update Attendance</h2>
            <label htmlFor="date">Select Date:</label>
            <input
                type="date"
                id="date"
                value={Date}
                onChange={handleDateChange}
            />
            <div className="list">
                {rollNumbers.map((n) => (
                    <span
                        key={n}
                        className={
                            absentees.includes(n) ? "nums absent" : "nums"
                        }
                        onClick={() => toggleAttendance(n)}
                    >
                        {n}
                    </span>
                ))}
            </div>
            <button onClick={handleUpdate}>Upload</button>
        </div>
    );
};
