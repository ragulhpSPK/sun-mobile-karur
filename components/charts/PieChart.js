import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData }) {
  return (
    <div className="!w-[20vw] ml-[6vw]">
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;
