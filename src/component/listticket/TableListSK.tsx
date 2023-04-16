import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import Table from "react-bootstrap/Table";
import styles from "./ListTicket.module.scss";
import classnames from "classnames/bind";
import ModalChangedate from "../modal/modalchangedate/ModalChangedate";

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
const TableListSK = (props: Props) => {
  const { setchangeDate } = useContext(AppContext);
  const handleShow = () => {
    setchangeDate(true);
    console.log(123);
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Booking Code</th>
            <th>Số vé</th>
            <th>Tên sự kiện</th>
            <th>Tình trạng sủ dụng</th>
            <th>Ngày sử dụng</th>
            <th>Ngày xuất vé</th>
            <th>Cổng check-in</th>
          </tr>
        </thead>
        <tbody className={cx("wrap_Table_body")}>
        {props.data?.map((item: TicketsIn, index) => (
            <tr key={item.idVe}>
              <td>{index}</td>
              <td>ALT20210501</td>
              <td>{item.idVe}</td>
              <td>{item.nameSK}</td>
              {item.stateUsed === "true1" ? (
                <td className={cx("wrap_Table_txtD")}>
                  <div className={cx("wrap_state")}>
                    <img src={require("../../assentce/Ellipse 1.png")} />
                    <h6 className={cx("state_txt")}>Đã sử dụng</h6>
                  </div>
                </td>
              ) : (
                <td>
                  {item.stateUsed === "false1" ? (
                    <div className={cx("wrap_stateNot")}>
                      <img src={require("../../assentce/xanh.png")} />
                      <h6 className={cx("state_txtNot")}>Chưa sử dụng</h6>
                    </div>
                  ) : (
                    <div className={cx("wrap_stateError")}>
                      <img src={require("../../assentce/Do.png")} />
                      <h6 className={cx("state_txtError")}>Hết hạn</h6>
                    </div>
                  )}
                </td>
                // <td className={cx("wrap_Table_txt")}>
                //   <div className={cx("wrap_state")}>
                //     <img src={require("../../assentce/Ellipse 1.png")} />
                //     <h6 className={cx("state_txt")}>Chưa sử dụng</h6>
                //   </div>
                //  </td>
              )}

              <td>{item.dateUsed}</td>
              <td>20-215-20</td>
              <td>{item.gateCheck}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalChangedate />
    </div>
  );
};

export default TableListSK;