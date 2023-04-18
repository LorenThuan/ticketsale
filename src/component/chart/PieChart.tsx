import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./PieChart.module.scss";
import classnames from "classnames/bind";
import { StatiscalGD, StatiscalSK, StatiscalGDPrice, StatiscalSKPrice } from "../redux-manager/selector";
import { useSelector } from "react-redux";

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
  const Gd = useSelector(StatiscalGD);
  const SK = useSelector(StatiscalSK);

  const GdPrice = useSelector(StatiscalGDPrice);
  const SKPrice = useSelector(StatiscalSKPrice);

  var nameSk = ""
  var nameGD = ""
  var totalGD = 0;
  var totalSK = 0;

  useEffect(() => {
     totalGD = Gd[0] + Gd[1];
     totalSK = SK[0] + SK[1];
  }, [GdPrice, SKPrice]);



  props?.dataTicketsGD?.map((item: any, index: number) => {
    nameGD = item.NamePacke
  })

  props?.dataTicketsSK?.map((item: any, index: number) => {
    nameSk = item.NamePacke
  })

  console.log(Gd);
  const optionsSK: ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    legend: {
      show: true,
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
        return (val * totalSK)/100;
      }
    },
    title: {
      text: nameSk,
      align: 'center'
    },
  };

  const optionsGD: ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    legend: {
      show: false,
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
        return (val * totalGD)/100;
      }
    },
    title: {
      text: nameGD,
      align: 'center'
    },
  };
  return (
    <div className={cx("pie-chart")}>
        <div>
              <ReactApexChart
                options={optionsGD}
                series={Gd}
                type="donut"
                width={290}
              />
        </div>

        <div>
          <ReactApexChart
            options={optionsSK}
            series={SK}
            type="donut"
            width={400}
          />
        </div>

    </div>
  );
};

export default PieChart;
