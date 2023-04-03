import React from "react";
import logo from "../../assentce/insight-05 1.png";
import { MailOutlined, BellOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Avatar from "antd/es/avatar";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const cx = classNames.bind(styles);

const { Search } = Input;
const Header = () => {
  return (
    <Container fluid className={cx("wrap-header")}>
      <Row>
        <Col lg={2}>
          <img src={logo} className={cx("header-left")} />
        </Col>
        <Col lg={10} className={cx("header-right")}>
          <Search
            placeholder="Search"
            className={cx("header-right-search")}
          />
          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <MailOutlined style={{ fontSize: 24 }}/>
            <BellOutlined style={{ fontSize: 24, marginLeft: 40 }} />
            <Avatar
              src={require("../../assentce/Frame 54.png")}
              style={{ fontSize: 24, marginLeft: 40 }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
