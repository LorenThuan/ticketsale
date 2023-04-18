import React, { useContext, useState, useEffect } from "react";
import styles from "./ListTicket.module.scss";
import classnames from "classnames/bind";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FilterOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TableListSK from "./TableListSK";
import ModalFilter from "../modal/ModalFilter";
import { AppContext } from "../context/AppProvider";
import TableListGD from "./TableListGD";
import ModalChangedate from "../modal/modalchangedate/ModalChangedate";
import { useSelector, useDispatch } from "react-redux";
import TodoSlice, { getListTickets } from "../redux-manager/slices/TodoSlice";
import FilterSlice from "../redux-manager/slices/FilterSlice";
import {
  todoRemainingSelector,
  todoRemainingSelectorSK,
} from "../redux-manager/selector";
import { useAppDispatch } from "../redux-manager/hook";
import { CSVLink } from "react-csv";
import Pagination from "../pagination/Pagination";
const { Search } = Input;

const cx = classnames.bind(styles);
const ListTicket = () => {
  const Tickets = useSelector(todoRemainingSelector);
  const TicketSKs = useSelector(todoRemainingSelectorSK);

  const { setShow } = useContext(AppContext);
  const [packed, setPacked] = useState(true);
  const dispatch = useAppDispatch();


  const handleShow = () => {
    setShow(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };

  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch]);

  const headersSK = [
    { label: "STT", key: "index" },
    { label: "Booking Code", key: "id" },
    { label: "Số vé", key: "idVe" },
    { label: "Tên sự kiện", key: "nameSK" },
    { label: "Tình trạng sử dụng", key: "stateUsed" },
    { label: "Ngày sử dụng", key: "dateUsed" },
    { label: "Ngày xuất vé", key: "datePublish" },
    { label: "Cổng Check-in", key: "gateCheck" },
  ];

  const headersGD = [
    { label: "STT", key: "index" },
    { label: "Booking Code", key: "id" },
    { label: "Số vé", key: "idVe" },
    { label: "Tình trạng sử dụng", key: "stateUsed" },
    { label: "Ngày sử dụng", key: "dateUsed" },
    { label: "Ngày xuất vé", key: "datePublish" },
    { label: "Cổng Check-in", key: "gateCheck" },
  ];

  const dataGD = Tickets.map((item: any, index: string) => {
    return {
      ...item,
      idVe: item.idVe.slice(1),
      index: index,
      id: `ALT20210501${index}`,
      stateUsed:
        item.stateUsed === "true1"
          ? "Đã Sử Dụng"
          : item.stateUsed === "false1"
          ? "Chưa sử Dụng"
          : "Hết hạn",
    };
  });

  const dataSK = TicketSKs.map((item: any, index: string) => {
    return {
      ...item,
      idVe: item.idVe.slice(1),
      index: index,
      id: `ALT20210501${index}`,
      stateUsed:
        item.stateUsed === "true1"
          ? "Đã Sử Dụng"
          : item.stateUsed === "false1"
          ? "Chưa sử Dụng"
          : "Hết hạn",
    };
  });

  const csvGD = {
    data: dataGD,
    headers: headersGD,
  };

  const csvSK = {
    data: dataSK,
    headers: headersSK,
  };
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = Tickets.slice(indexOfFirstPost, indexOfLastPost);
  const currentTicketSks = TicketSKs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    dispatch(FilterSlice.actions.Search(e.target.value));
  };

  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>
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
        <div className={cx("btn")}>
        <div className={cx("btnLoc")} onClick={handleShow}>
            <FilterOutlined
              style={{ fontSize: 18, color: "rgba(255, 153, 60, 1)" }}
            />
            <h5 className={cx("btnLoc_txt")}>Lọc vé</h5>
          </div>
          {packed ? (
            <CSVLink {...csvSK} className={cx("btnFile")}>
              <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
            </CSVLink>
          ) : (
            <CSVLink {...csvGD} className={cx("btnFile")}>
              <h5 className={cx("btnLoc_txt")}>Xuất File(.csv)</h5>
            </CSVLink>
          )}
        </div>
      </div>
      <div className={cx("tblSk")}>
      {packed ? (
            <TableListGD data={currentTickets} />
            
          ) : (
            <TableListSK data={currentTicketSks} />
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

      <ModalFilter/>
    </Container>
  );
};

export default ListTicket;