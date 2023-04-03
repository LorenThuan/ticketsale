import React, { useState, useEffect, useContext } from "react";
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
import {
  getDatabase,
  get,
  child,
  ref,
  push,
  query,
  orderByChild,
} from "firebase/database";
import { AppContext } from "../context/AppProvider";
import { dataref } from "../lib/Firebase";
import { useAppDispatch, useAppSelector } from "../reudux/hook";
import TodoSlice, { getListTickets } from "../reudux/slices/TodoSlice";
import {
  todoRemainingSelector,
  todoRemainingSelectorSK,
} from "../reudux/selector";

import { useSelector } from "react-redux";
import FilterSlice from "../reudux/slices/FilterSlice";

interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
}
const { Search } = Input;
const cx = classNames.bind(styles);
const ExamTicket = () => {
    // const [packed, setPacked] = useState(true);
    const Tickets = useSelector(todoRemainingSelector);
    const TicketSKs = useSelector(todoRemainingSelectorSK);
    // console.log(Tickets);
    // const [Tickets, setTickets] = useState<TicketsIn[]>([]);
    // const [TicketSKs, setTicketSKs] = useState<TicketsIn[]>([]);
    const [search, setSearch] = useState<string>("");
    const { item, status, packed, setPacked } = useContext(AppContext);
    const dispatch = useAppDispatch();

  const handleChangePacked = () => {
    setPacked(!packed);
  };

  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch]);

  const handleCheck = () => {
    dispatch(TodoSlice.actions.CheckListTicket(item));
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(FilterSlice.actions.Search(e.target.value));
  };

  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Đối soát vé</h3>
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={packed}>
              Gói gia đình
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleChangePacked} active={!packed}>
              Gói sự kiện
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className={cx("ListSK-filter")}>
        <Search
            placeholder="Tìm bằng số vé"
            className={cx("ListSK-search")}
            value={search}
            onChange={handleSearch}
          />
          {status === "Đã đối soát" ? (
            <div className={cx("btn")}>
              <div className={cx("btnXuat")}>
                <h5 className={cx("btnXuat_txt")}>Xuất File(.csv)</h5>
              </div>
            </div>
          ) : (
            <div className={cx("btn")}>
              <div className={cx("btnChot")}>
                <h5 className={cx("btnChot_txt")} onClick={handleCheck}>
                  Chốt Đối soát
                </h5>
              </div>
          </div>
        )}
      </div>
      <div className={cx("tblSk")}>
        {packed ? (
          <TableExamTicketSK data={TicketSKs} />
        ) : (
          <TableExamTicketGD data={Tickets} />
        )}
      </div>
    </Container>
  );
};

export default ExamTicket;