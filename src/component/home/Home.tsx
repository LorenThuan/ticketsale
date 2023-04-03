import React from 'react'
import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import { Container } from 'react-bootstrap'
const cx = classnames.bind(styles);

const Home = () => {
  return (
    <Container fluid className={cx("wrap_home")}>
        <h3 style={{ fontWeight: "bold" }}>Thống kê</h3>

        <h6 style={{ fontWeight: 600, marginTop: 30 }}>Doanh thu</h6>
    </Container>
  )
}

export default Home