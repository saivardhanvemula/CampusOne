import React from "react";
import "./AbsentLog.css";

const AbsentLog = ({ data }) => {
    function changeDateFormat(inputDate) {
        const parts = inputDate.split("-");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        return formattedDate;
    }
    return (
        <div className="absent-log">
            <h2>Absence Log</h2>
            <div className="absent-log-container">
                {data.map((entry, index) => (
                    <div key={index} className="absent-log-entry">
                        <p>
                            Date: {changeDateFormat(entry.date)} subjects:{" "}
                            {entry.subjects.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AbsentLog;
