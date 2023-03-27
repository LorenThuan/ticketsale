import React from "react";
import Header from "../../component/header/Header";
import Menubar from "../../component/menubar/MenuBar";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListTicketSK from "../../component/listticket/ListTicket";
import styles from "./ListTicket.module.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
const ListTicket = () => {
  return (
    <Container fluid className={cx("wrap_ListTicket")}>
      <Header />
      <Row>
        <Col lg={2}>
          <Menubar />
        </Col>
        <Col lg={10}>
          <ListTicketSK />
        </Col>
      </Row>
    </Container>
  );
};

export default ListTicket;