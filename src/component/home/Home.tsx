import React from 'react'
import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import { Container } from 'react-bootstrap'
import AreaChart from './AreaChart';
import PieChart from './PieChart';
const cx = classnames.bind(styles);

const Home = () => {
  return (
    <Container fluid className={cx("wrap_home")}>
        <h3 style={{ fontWeight: "bold" }}>Thống kê</h3>

        <h6 style={{ fontWeight: 600, marginTop: 30 }}>Doanh thu</h6>

        <AreaChart/>

        <div className={cx("wrap_label_sum")}>Tổng doanh thu theo tuần</div>
        <div className={cx("wrap_sum")}>
            <div className={cx("wrap_money")}>525.145.000</div>
            <p style={{marginLeft: 5}}>đồng</p>
        </div>

        <PieChart/>
    </Container>
  )
}

export default Home