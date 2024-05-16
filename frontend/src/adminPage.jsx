// import React from 'react'
import React, { useState } from 'react';
import "./adminPage.css"
import { UploadPDF } from './components/pdfUpload';
import { UpdateAttendance } from './components/attendanceUpdate';

// Component for uploading PDF


// Main admin page component
export const AdminPage = () => {
  const adminName = 'John Doe'; // Replace with dynamic data as needed
  const adminDepartment = 'Computer Science'; // Replace with dynamic data as needed
  const subject="DBMS"

  return (
    <div className='adminPage'>
      <h1>Admin Page</h1>
      <div className='adminDetails'>
        <h2>Admin Details</h2>
        <p><strong>Name:</strong> {adminName}</p>
        
        <p><strong>Department:</strong> {adminDepartment}</p>
        <p><strong>Subject:</strong> {subject}</p>
      </div>
     
<UpdateAttendance subject={subject} />
      <UploadPDF />
    </div>
  );
};

// export default AdminPage;
