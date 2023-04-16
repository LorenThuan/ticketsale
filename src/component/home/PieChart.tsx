import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./PieChart.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
}
type Props = { dataTicketsGD: TicketsIn[], dataTicketsSK: TicketsIn[]};

const PieChart = (props: Props) => {
  var nameSk = ""
  var nameGD = ""
  var countTicketsUsedGD = 0;
  var countTicketsNotUsedGD = 0;
  var countTicketsUsedSK = 0;
  var countTicketsNotUsedSK = 0;
  var totalTicketGD = 0;
  var totalTicketSK = 0;

  props?.dataTicketsGD?.map((item: any, index: number) => {
    nameGD = item.NamePacke
  })

  props?.dataTicketsGD?.map((item: any, index: number) => {
    item.stateUsed === "true1" ? totalTicketGD += 1 : totalTicketGD += 1
  })

  props?.dataTicketsSK?.map((item: any, index: number) => {
    item.stateUsed === "true1" ? totalTicketSK += 1 : totalTicketSK += 1
  })

  props?.dataTicketsSK?.map((item: any, index: number) => {
    nameSk = item.NamePacke
  })

  props?.dataTicketsGD?.map((item: any, index: number) => {
        item.stateUsed === "true1" ? countTicketsUsedGD += 1 :  countTicketsNotUsedGD += 1
    })

  props?.dataTicketsSK?.map((item: any, index: number) => {
        item.stateUsed === "true1" ? countTicketsUsedSK += 1 :  countTicketsNotUsedSK += 1
  })

  const seriesGD = [countTicketsUsedGD, countTicketsNotUsedGD];
  const seriesSK = [countTicketsUsedSK, countTicketsNotUsedSK];
  

  const optionsGD : ApexOptions = {
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
      enabled: true,
      formatter: function (val: number) {
        return (val * totalTicketGD)/100;
      }
    },
    title: {
      text: nameGD,
      align: 'center'
    },

  }


const optionsSK : ApexOptions = {
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
        enabled: true,
        formatter: function (val: number, opts) {
          return (val * totalTicketSK)/100;
        }
      },
      title: {
        text: nameSk,
        align: 'center',
        offsetX: -70,
        offsetY: -1,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        }
      }
} 
  return (

    <div className={cx("pie-chart")}>
        <ReactApexChart
        options={optionsGD}
        series={seriesGD}
        type="donut"
        width={290}
      />

      <ReactApexChart
        options={optionsSK}
        series={seriesSK}
        type="donut"
        width={400}
      />

    </div>

  );
};

export default PieChart;
