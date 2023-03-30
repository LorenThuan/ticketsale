import React from "react";
import Header from "../../component/header/Header";
import Menubar from "../../component/menubar/MenuBar";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import styles from "./ServicePack.module.scss";
import classnames from "classnames/bind";
import PackTicket from "../../component/packticket/PackTicket";

const cx = classnames.bind(styles);

const ServicePack = () => {
    return (
        <Container fluid className={cx("wrap_servicePack")}>
          <Header />
          <Row>
            <Col lg={2}>
              <Menubar />
            </Col>
            <Col lg={10}>
              <PackTicket />
            </Col>
          </Row>
        </Container>
      );
    };
    
    export default ServicePack;