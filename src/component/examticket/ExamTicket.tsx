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
import { AppContext } from "../context/AppProvider";
import { dataref } from "../lib/Firebase";
import { useAppDispatch, useAppSelector } from "../redux-manager/hook";
import TodoSlice, { getListTickets } from "../redux-manager/slices/TodoSlice";
import {
  todoRemainingSelector,
  todoRemainingSelectorSK,
} from "../redux-manager/selector";

import { useSelector } from "react-redux";
import FilterSlice from "../redux-manager/slices/FilterSlice";
import Pagination from "../pagination/Pagination";


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
    const ListTicket = useSelector((state: any) => state.TodoTicket.listTicket);
    // const [Tickets, setTickets] = useState<TicketsIn[]>([]);
    // const [TicketSKs, setTicketSKs] = useState<TicketsIn[]>([]);
    const [search, setSearch] = useState<string>("");
    const { item, 
            status, 
            packed, 
            setPacked, 
            reRender, 
            setRerender } 
            = useContext(AppContext);
    const dispatch = useAppDispatch();

    console.log(ListTicket);

  const handleChangePacked = () => {
    setPacked(!packed);
  };

  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch, ListTicket, reRender]);

  const handleCheck = () => {
    dispatch(TodoSlice.actions.CheckListTicket(item));
    setRerender(reRender);
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(FilterSlice.actions.Search(e.target.value));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = Tickets.slice(indexOfFirstPost, indexOfLastPost);
  const currentTicketSks = TicketSKs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            <TableExamTicketGD data={currentTickets} />
        ) : (
          
          <TableExamTicketSK data={currentTicketSks} />
        )}
      </div>

      {packed ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 15,
            left: "50%",
          }}
        >
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={TicketSKs.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 15,
            left: "50%",
          }}
        >
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={Tickets.length}
            paginate={paginate}
          />
        </div>
      )}

    </Container>
  );
};

export default ExamTicket;