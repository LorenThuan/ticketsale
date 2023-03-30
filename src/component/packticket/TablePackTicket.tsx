import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import Table from "react-bootstrap/Table";
import styles from "./PackTicket.module.scss";
import classnames from "classnames/bind";

import { EditOutlined } from "@ant-design/icons";
import ModalAdd from "../modal/modal add/ModalAdd";
import ModalUpdate from "../modal/modalupdate/ModalUpdate";
const cx = classnames.bind(styles);

const TablePackTicket = () => {
  const { setUpdate } = useContext(AppContext);
  const handleShow = () => {
    setUpdate(true);
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Booking Code</th>
            <th>Tên gói vé</th>
            <th>Ngày áp dụng</th>
            <th>Ngày hết hạn</th>
            <th>Giá vé (VNĐ/Vé)</th>
            <th>Giá Combo (VNĐ/Combo)</th>
            <th>Tình trạng</th>
            <th> </th>
          </tr>
        </thead>
        <tbody className={cx("wrap_Table_body")}>
          <tr>
            <td>1</td>
            <td>ALT20210501</td>
            <td>Gói gia đình</td>
            <td>14/04/2021 08:00:00</td>
            <td>14/04/2021 23:00:00</td>
            <td>90.000 VNĐ</td>
            <td>360.000 VNĐ/4 Vé</td>
            <td>
              <div className={cx("wrap_state")}>
                <img
                  src={require("../../assentce/xanh.png")}
                  style={{
                    color: "rgba(3, 172, 0, 1)",
                  }}
                />
                <h6 className={cx("state_txt")}>Đã sử dụng</h6>
              </div>
            </td>
            <td className={cx("wrap_up")} onClick={handleShow}>
              <EditOutlined />
              Cập nhật
            </td>
          </tr>
        </tbody>
      </Table>
      <ModalUpdate />
    </div>
  );
};

export default TablePackTicket;
 