import React from "react";
import Header from "../../component/header/Header";
import Menubar from "../../component/menubar/MenuBar";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import HomeCustom from "../../component/home/HomeCustom";

const cx = classnames.bind(styles);
const Homepage = () => {
  return (
    <Container fluid className={cx("wrap_Home")}>
      <Header />
      <Row>
        <Col lg={2}>
          <Menubar />
        </Col>
        <Col lg={10}>
          <HomeCustom />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;