import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData }) {
  return (
    <div className="!w-[15vw]">
      <Doughnut data={chartData} />
    </div>
  );
}

export default PieChart;
