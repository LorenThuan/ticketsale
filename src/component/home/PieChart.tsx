import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PieChart.css"

const PieChart = () => {
  const series = [56024, 13568];
  const optionsSK : ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: { 
      enabled: false,
      formatter: function (series) {
        return series + "%"
      },
      }
  }

    const optionsGD : ApexOptions = {
      chart: {
        width: 400,
        type: "donut",
      },
      labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      dataLabels: { 
        enabled: false,
        formatter: function (series) {
          return series + "%"
        },
        enabledOnSeries: undefined,
        }, 

  };
  return (
    <div className="pie-chart">
      <ReactApexChart
        options={optionsSK}
        series={series}
        type="donut"
        width={290}
      />
      <ReactApexChart
        options={optionsGD}
        series={series}
        type="donut"
        width={400}
      />
    </div>
  );
};

export default PieChart;
