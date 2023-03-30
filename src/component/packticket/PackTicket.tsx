import React, { useContext, useState } from "react";
import styles from "./PackTicket.module.scss";
import classnames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { AppContext } from "../context/AppProvider";
import Table_PackTicket from "./TablePackTicket";
import ModalAdd from "../modal/modal add/ModalAdd";

const { Search } = Input;

const cx = classnames.bind(styles);
const PackTicket = () => {
  const { setAdd } = useContext(AppContext);
  const [packed, setPacked] = useState(true);

  const handleAdd = () => {
    setAdd(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>

      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <div className={cx("btnFile")}>
            <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
          </div>
          <div className={cx("btnAdd")} onClick={handleAdd}>
            <h5 className={cx("btnAdd_txt")}>Thêm gói vé</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
        <Table_PackTicket />
      </div>
      <ModalAdd />
    </Container>
  );
};

export default PackTicket;