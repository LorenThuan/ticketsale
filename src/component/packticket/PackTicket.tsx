import React, { useContext, useState, useEffect } from "react";
import styles from "./PackTicket.module.scss";
import classnames from "classnames/bind";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { AppContext } from "../context/AppProvider";
import TablePackTicket from "./TablePackTicket";
import ModalAdd from "../modal/modal add/ModalAdd";
// import { useSelector } from "react-redux";
import { Action } from "@remix-run/router";
import TodoSlice, { getPackTicket } from "../reudux/slices/TodoSlice";
// import { useAppDispatch } from "../reudux/store";
import { useAppDispatch, useAppSelector } from "../reudux/hook";

interface TicketsIn {
  id?: string;
  nameTick?: string;
  dataUse?: string;
  dateOutUse?: string;
  price: number;
  priceCombo: number;
  amoutCombo: number;
  state?: boolean;
  nameTickSK?: string;
}

const { Search } = Input;

const cx = classnames.bind(styles);
const PackTicket = () => {
  const { setAdd } = useContext(AppContext);
  
  const [packed, setPacked] = useState<Boolean>(true);
  // const [Tickets, setTickets] = useState<TicketsIn[] | null>([]);
  const dispatch = useAppDispatch();
  const Tickets = useAppSelector((state: any) => state.TodoTicket.packedTicket);

  const handleAdd = () => {
    setAdd(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };

  useEffect(() => {
    dispatch(getPackTicket());
  }, [dispatch, Tickets]);
    


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
        <TablePackTicket data={Tickets} />
      </div>
      <ModalAdd />
    </Container>
  );
};

export default PackTicket;