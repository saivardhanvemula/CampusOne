import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ data }) => {
  // Sample data for the donut chart
  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Attendance</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DonutChart;
