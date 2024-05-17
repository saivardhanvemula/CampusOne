// import React from 'react'
import React, { useState, useContext } from "react";
import "./adminPage.css";
import { UploadPDF } from "./components/pdfUpload";
import { UpdateAttendance } from "./components/attendanceUpdate";
import UserContext from "./UserContext";

export const AdminPage = () => {
    const { UserData, setUserData } = useContext(UserContext);
    console.log(UserData);

    return (
        <div className="adminPage">
            <h1>Admin Page</h1>
            <div className="adminDetails">
                <h2>Admin Details</h2>
                <p>
                    <strong>Name:</strong> {UserData.name}
                </p>

                <p>
                    <strong>Department:</strong> {UserData.department}
                </p>
                <p>
                    <strong>Subject:</strong> {UserData.subject}
                </p>
                <p>
                    <strong>Section:</strong> {UserData.section}
                </p>
            </div>

            <UpdateAttendance subject={UserData.subject} />
            <UploadPDF subject={UserData.subject}/>
        </div>
    );
};

// export default AdminPage;
