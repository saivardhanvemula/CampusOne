import React from 'react';
import { Pie } from 'react-chartjs-2';

function AttendanceChart({ data }) {
  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [data.presentCount, data.absentCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Attendance</h2>
      <Pie data={chartData} key={JSON.stringify(chartData)} />
    </div>
  );
}

export default AttendanceChart;
