import React from 'react';
import './AbsentLog.css';

const AbsentLog = ({ data }) => {
  return (
    <div className="absent-log">
      <h2>Absence Log</h2>
      {data.map((entry, index) => (
        <div key={index}>
          <p>Date: {entry.date}  subjects:  {entry.subjects.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default AbsentLog;
