import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import styles from "./ExamTicket.module.scss";
import classnames from "classnames/bind";
import { AppContext } from "../context/AppProvider";

const cx = classnames.bind(styles);
interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
}
type Props = { data: TicketsIn[] };
const TableExamTicketSK = (props: Props) => {
  const [active, setActive] = useState<number>();
  const { setItem } = useContext(AppContext);

  const setActiveRow = (index: number, item: any) => {
    setItem(item);
    setActive(index);
  };

  const handleShow = () => {
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Số vé</th>
            <th>Tên Sự kiện</th>
            <th>Ngày sử dụng</th>
            <th>Loại vé</th>
            <th>Cổng check-in</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
        {props.data?.map((item: any, index) => (
            <tr
              key={item.idVe}
              className={`${styles.rowHover} ${
                active === index ? styles.selected : ""
              }`}
              onClick={() => {
                setActiveRow(index, item);
              }}
            >
              <td>{index}</td>
              <td>{item.idVe}</td>
              <td>{item.nameSK}</td>
              <td>{item.dateUsed}</td>
              <td>Vé cổng</td>
              <td>{item.gateCheck}</td>
              {item.stateUsed === "true1" ? (
                <td className={cx("wrap_Table_txtD")}>Đã đối soát</td>
              ) : (
                <td className={cx("wrap_Table_txt")}>Chưa đối soát</td>
              )}
            </tr>
          ))}   
        </tbody>
      </Table>
    </div>
  );
};

export default TableExamTicketSK;