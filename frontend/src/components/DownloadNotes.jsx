import React, { useState } from "react";
import "./DownloadNotes.css";
import axios from "axios";
const NotesDownloader = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };
    function openInNewTab(url) {
        const newWindow = window.open(url, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            console.error(
                "Failed to open the new tab. Please check your browser settings."
            );
        }
    }
    function changeDateFormat(inputDate) {
        const parts = inputDate.split("-");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        return formattedDate;
    }
    const handleDownload = async (subject, date) => {
        date = changeDateFormat(date);
        // console.log(subject);
        try {
            const response = await axios.post("http://localhost:5000/notes", {
                date,
                subject,
            });
            
            const sub = Object.keys(response.data.notes).splice(2,);
            console.log(sub)
            console.log(subject)
            const data = response.data.notes[subject];
            // console.log(data);
            if (sub.includes(subject)){

                const newWindow = window.open(data, "_blank");
                if (newWindow) {
                    newWindow.focus();
                } else {
                    console.error(
                        "Failed to open the new tab. Please check your browser settings."
                    );
                }
            }
            else{
                alert(`${subject} notes on ${date} is not available`)
            }
        } catch (error) {
            alert(`${subject} notes on ${date} is not available`)
            // console.error("Error fetching data:", error);
            // res.status(500).json({ error: "Server error" });
        }
    };
    // window.location.href = `https://drive.google.com/file/d/1moQQKTErEyraRauvYf-cYd9GJMTD-BUy/view?usp=drivesdk`;
    // console.log(`${subject} notes on ${date} is not available`)x

    return (
        <div>
            <label htmlFor="date">Select Date:</label>
            <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
            />

            <label htmlFor="subject">Select Subject:</label>
            <select
                id="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
            >
                <option value="">Select Subject</option>
                <option value="DBMS">DBMS</option>
                <option value="DAA">DAA</option>
                <option value="DCCST">DCCST</option>
                <option value="PQT">PQT</option>
                <option value="EEA">EEA</option>
                <option value="ES">ES</option>
            </select>

            {selectedSubject && (
                <button
                    onClick={() =>
                        handleDownload(selectedSubject, selectedDate)
                    }
                    disabled={!selectedDate}
                >
                    Download Notes for {selectedSubject}
                </button>
            )}
        </div>
    );
};

export default NotesDownloader;
