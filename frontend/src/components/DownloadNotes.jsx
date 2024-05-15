import React, { useState } from "react";
import "./DownloadNotes.css";
const NotesDownloader = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    //   const handleDownload = (subject) => {
    //     // Logic to download the PDF notes for the selected date and subject
    //     alert(`Downloading notes for ${selectedDate} - ${subject}`);
    //   };
    const handleDownload = (subject) => {
        window.location.href = `/pdfs/notes.pdf`;

        // const pdfData = localStorage.getItem("./pdfs/notes.pptx");

        // if (pdfData) {
        //     const blob = new Blob([pdfData], { type: "application/pdf" });

        //     // Create a URL for the Blob
        //     const url = window.URL.createObjectURL(blob);

        //     // Create a temporary anchor element
        //     const a = document.createElement("a");
        //     a.href = url;
        //     a.download = `notes_${selectedDate}_${subject}.pdf`; 
        //     a.click();
        //     window.URL.revokeObjectURL(url);
        // } else {
        //     alert("PDF data not found in local storage!");
        // }
    };

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
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                {/* Add more subjects as needed */}
            </select>

            {selectedSubject && (
                <button
                    onClick={() => handleDownload(selectedSubject)}
                    disabled={!selectedDate}
                >
                    Download Notes for {selectedSubject}
                </button>
            )}
        </div>
    );
};

export default NotesDownloader;
