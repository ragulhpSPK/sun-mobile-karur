import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function RadarChart({ chartData }) {
  return (
    <div className="!w-[15vw]">
      <Pie data={chartData} />
    </div>
  );
}

export default RadarChart;
