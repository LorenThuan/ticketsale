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
import TodoSlice, { getPackTicket } from "../redux-manager/slices/TodoSlice";
// import { useAppDispatch } from "../reudux/store";
import { useAppDispatch, useAppSelector } from "../redux-manager/hook";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import Pagination from "../pagination/Pagination";

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
  const { setAdd, reRender } = useContext(AppContext);

  
  const [packed, setPacked] = useState<Boolean>(true);
  // const [Tickets, setTickets] = useState<TicketsIn[] | null>([]);
  const dispatch: any = useDispatch();
  const Tickets = useAppSelector((state: any) => state.TodoTicket.packedTicket);
  const [csv, setCSV] = useState<[] | any>([]);

  const handleAdd = () => {
    setAdd(true);
  };
  const handleChangePacked = () => {
    setPacked(!packed);
  };

  var csvDataTicketPacked: any = [];

  useEffect(() => {
    dispatch(getPackTicket());
  }, [dispatch, Tickets, reRender]);

    
  const headers = [
    { label: "STT", key: "serial" },
    { label: "Mã gói", key: "idTick" },
    { label: "Tên gói vé", key: "nameTick" },
    { label: "Ngày áp dụng", key: "dataUse" },
    { label: "Ngày hết hạn", key: "dateOutUse" },
    { label: "Giá vé (VNĐ/Vé)", key: "price" },
    { label: "Giá Combo (VNĐ/Combo)", key: "priceCombo" },
    { label: "Tình trạng", key: "state"},
  ];

  const csvDownload = Tickets.map((item: any, index: number) => {
    return {
      ...item,
      serial: index,
      idTick: item.id.slice(1),
      state: item.state === true ? "Đang Sử Dụng" : "Tắt",
    };
  });

  const csvReport = {
    data: csvDownload,
    headers: headers,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = Tickets.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container fluid className={cx("wrap_ListSK")}>
      <h3 style={{ fontWeight: "bold" }}>Danh Sách Vé</h3>

      <div className={cx("ListSK-filter")}>
        <Search placeholder="Tìm bằng số vé" className={cx("ListSK-search")} />
        <div className={cx("btn")}>
          <div className={cx("btnFile")}>
            <CSVLink className={cx("btnLoc_txt")} {...csvReport} separator=";">Xuất File(.csv)</CSVLink>
          </div>
          <div className={cx("btnAdd")} onClick={handleAdd}>
            <h5 className={cx("btnAdd_txt")}>Thêm gói vé</h5>
          </div>
        </div>
      </div>
      <div className={cx("tblSk")}>
          <TablePackTicket data={currentTickets} />
      </div>
      <ModalAdd />
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
    </Container>
  );
};

export default PackTicket;