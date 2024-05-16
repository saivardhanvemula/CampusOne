import React, { useState } from "react";
import axios from "axios";

export const UploadPDF = (subject) => {
    const [date, setDate] = useState("");
    const [driveLink, setDriveLink] = useState("");

    const handleLinkChange = (e) => {
        setDriveLink(e.target.value);
    };
    function changeDateFormat(inputDate) {
        const parts = inputDate.split("-");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        return formattedDate;
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        console.log("Date:", date);
        console.log("Drive Link:", driveLink);
        try {
            const response = await axios.post(
                "http://localhost:5000/UpdateNotes",
                {
                    date: changeDateFormat(date),
                    subject,
                    driveLink,
                }
            );
            console.log("Response:", response.data);
            // Handle response data as needed
        } catch (error) {
            console.error("Error updating attendance:", error);
            // Handle error, e.g., show error message to user
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <div>
            <h2>Upload PDF</h2>
            <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
            />
            <form onSubmit={handleUpload}>
                <label>
                    Upload the drive link:
                    <input
                        type="text"
                        value={driveLink}
                        onChange={handleLinkChange}
                    />
                </label>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};
