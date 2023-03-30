import React, { useState } from "react";
import styles from "./ExamTicket.module.scss";
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TableExamTicketSK from "./TableExamTicketSK";
import TableExamTicketGD from "./TableExamTicketGD";
const { Search } = Input;
const cx = classNames.bind(styles);
const ExamTicket = () => {
  const [packed, setPacked] = useState(true);

  const handleChangePacked = () => {
    setPacked(!packed);
  };
  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Đối soát vé</h3>
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={packed}>
              Gói sự kiện
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={!packed}>
              Gói gia đình
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <div className={cx("btnChot")}>
            <h5 className={cx("btnChot_txt")}>Chốt Đối soát</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
        {packed ? <TableExamTicketSK /> : <TableExamTicketGD />}
      </div>
    </Container>
  );
};

export default ExamTicket;