import React, { useContext, useState, useEffect } from "react";
import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import { Container } from 'react-bootstrap'
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import { useSelector, useDispatch } from "react-redux";
import {
  todoRemainingSelector,
  todoRemainingSelectorSK,
} from "../redux-manager/selector";
import { useAppDispatch } from "../redux-manager/hook";
import TodoSlice, { getListTickets } from "../redux-manager/slices/TodoSlice";
const cx = classnames.bind(styles);

const Home = () => {
  const Tickets = useSelector(todoRemainingSelector);
  const TicketSKs = useSelector(todoRemainingSelectorSK);
  const dispatch = useAppDispatch();
  var sum: number = 0;
  var tempGD: number = 0;
  var tempSK: number = 0;



  Tickets.map((itemGD: any, index: number) => { 
    tempGD += itemGD.priceVe
      console.log(tempGD); 
    }) 

    TicketSKs.map((itemSK: any, index: number) => { 
      tempSK += itemSK.priceVe
      console.log(tempSK); 
    }) 

    sum = tempGD + tempSK;
    console.log(sum);
    


  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch]);

  return (
    <Container fluid className={cx("wrap_home")}>
        <h3 style={{ fontWeight: "bold" }}>Thống kê</h3>

        <h6 style={{ fontWeight: 600, marginTop: 30 }}>Doanh thu</h6>

        <AreaChart/>

        <div className={cx("wrap_label_sum")}>Tổng doanh thu theo tuần</div>
        <div className={cx("wrap_sum")}>
            <div className={cx("wrap_money")}>{sum}</div>
            <p style={{marginLeft: 5}}>đồng</p>
        </div>

        <PieChart dataTicketsGD={Tickets} dataTicketsSK={TicketSKs}/>
    </Container>
  )
}

export default Home