import React from "react";
import Header from "../../component/header/Header";
import Menubar from "../../component/menubar/MenuBar";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import styles from "./CheckTicket.module.scss";
import classnames from "classnames/bind";
import ExamTicket from "../../component/examticket/ExamTicket";
import FilterCheck from "../../component/filtercheck/FilterCheck";

const cx = classnames.bind(styles);
const CheckTicket = () => {
  return (
    <Container fluid className={cx("wrap_CheckTicket")}>
      <Header />
      <Row>
        <Col lg={2}>
          <Menubar />
        </Col>
        <Col lg={8}>
          <ExamTicket />
        </Col>
        <Col lg={2}>
          <FilterCheck />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckTicket;
