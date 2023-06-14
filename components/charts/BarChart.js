import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div className="xsm:w-[60vw] xl:!w-[35vw] ">
      <Bar data={chartData} style={{ width: "100%" }} />
    </div>
  );
}

export default BarChart;
