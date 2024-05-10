import React, { useState } from 'react';
import "./DownloadNotes.css"
const NotesDownloader = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleDownload = (subject) => {
    // Logic to download the PDF notes for the selected date and subject
    alert(`Downloading notes for ${selectedDate} - ${subject}`);
  };

  return (
    <div>
      <label htmlFor="date">Select Date:</label>
      <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
      
      <label htmlFor="subject">Select Subject:</label>
      <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">Select Subject</option>
        <option value="Maths">Maths</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        {/* Add more subjects as needed */}
      </select>
      
      {selectedSubject && (
        <button onClick={() => handleDownload(selectedSubject)} disabled={!selectedDate}>
          Download Notes for {selectedSubject}
        </button>
      )}
    </div>
  );
};

export default NotesDownloader;
