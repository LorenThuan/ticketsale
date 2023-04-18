import React, { useContext, useState, useEffect } from "react";
import styles from "./HomeCustom.module.scss";
import classnames from "classnames/bind";
import { Container } from 'react-bootstrap'
import AreaChart from "../chart/AreaChart";
import PieChart from "../chart/PieChart";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import FilterSlice from "../../component/redux-manager/slices/FilterSlice";
import { StatiscalGD, StatiscalSK, StatiscalGDPrice, StatiscalSKPrice } from "../../component/redux-manager/selector";
import { getListTickets } from "../../component/redux-manager/slices/TodoSlice";
import { useAppDispatch } from "../../component/redux-manager/hook";
import {
    todoRemainingSelector,
    todoRemainingSelectorSK,
  } from "../redux-manager/selector";
const cx = classnames.bind(styles);

const HomeCustom = () => {
    const [total, setTotal] = useState(0);
    const dispatch = useAppDispatch();
    const Tickets = useSelector(todoRemainingSelector);
    const TicketSKs = useSelector(todoRemainingSelectorSK);
    
    const weekFormat = "DD/MM/YYYY";
  
    const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
      `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
        .endOf("week")
        .format(weekFormat)}`;
  
    const Gd = useSelector(StatiscalGDPrice);
    const SK = useSelector(StatiscalSKPrice);
  
    const totalGD = Gd[0] + Gd[1];
    const totalSK = SK[0] + SK[1];
    const totalTong = totalGD + totalSK;
  
    useEffect(() => {
      dispatch(getListTickets());
    }, [dispatch]);
  
    useEffect(() => {
      const totalGD = Gd[0] + Gd[1];
      const totalSK = SK[0] + SK[1];
      const totalTong = totalGD + totalSK;
      setTotal(totalTong);
    }, [Gd, SK]);
  
    const handleDateWeek = (date: any, dateString: string) => {
      const dateFrom = dateString.slice(0, 10);
  
      const dateFromStatistical = handleFormatDate(dateFrom);
      const dateTo = dateString.slice(13, 23);
      const dateToStatistical = handleFormatDate(dateTo);
  
      dispatch(FilterSlice.actions.DateFromStatistical(dateFromStatistical));
      dispatch(FilterSlice.actions.DateToStatistical(dateToStatistical));
    };
  
    const handleFormatDate = (date: string) => {
      if (date !== "") {
        // Tách chuỗi thành các phần: ngày, tháng, năm
        let dateArr = date.split("/");
        let day = dateArr[0];
        let month = dateArr[1];
        let year = dateArr[2];
  
        // Nối các phần lại với dấu '-'
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
      return "";
    }
  return (
    <Container fluid className={cx("HomeRight")}>
            <h3 style={{ fontWeight: "bold" }}>Thống kê</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h6 style={{ fontWeight: 600, marginTop: 30 }}>Doanh thu</h6>
              <DatePicker
                defaultValue={dayjs()}
                format={customWeekStartEndFormat}
                style={{ height: 30 }}
                picker="week"
                onChange={handleDateWeek}
              />
            </div>

            <AreaChart />

            <div className={cx("wrap_label_sum")}>Tổng doanh thu theo tuần</div>
            <div className={cx("wrap_sum")}>
              {totalTong ? (
                <div className={cx("wrap_money")}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </div>
              ) : (
                <div className={cx("wrap_money")}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalTong)}
                </div>
              )}
            </div>

            <PieChart dataTicketsGD={Tickets} dataTicketsSK={TicketSKs}/>
          </Container>
  )
}

export default HomeCustom