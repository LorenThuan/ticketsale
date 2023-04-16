import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import Table from "react-bootstrap/Table";
import styles from "./PackTicket.module.scss";
import classnames from "classnames/bind";

import { EditOutlined } from "@ant-design/icons";
import ModalAdd from "../modal/modal add/ModalAdd";
import ModalUpdate from "../modal/modalupdate/ModalUpdate";
import { type } from "os";

const cx = classnames.bind(styles);
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
type Props = { data: TicketsIn[] | null };

const TablePackTicket = (props: Props) => {
  const { setUpdate, update } = useContext(AppContext);
  const [item, setItem] = useState<TicketsIn>({
    id: "",
    nameTick: "",
    dataUse: "",
    dateOutUse: "",
    price: 0,
    priceCombo: 0,
    amoutCombo: 0,
    state: false,
  });
  const handleShow = (item: TicketsIn) => {
    setUpdate(true);
    setItem(item);
  };
  

  // console.log(props.data);
  // props.data?.map((item) => {
  // });
  
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Mã gói</th>
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
        {props.data?.map((item: TicketsIn, index) => (
            <tr key={item.id}>
              <td>{index}</td>
              <td>{item.id}</td>
              <td>{item.nameTick}</td>
              <td>{item.dataUse}</td>
              <td>{item.dateOutUse}</td>
              <td>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </td>
              <td>
                {item.priceCombo === 0 ? (
                    <div></div>             
                ) :
                  (
                    <div>
                      {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.priceCombo)}{" "}
                    /{item.amoutCombo} Vé
                    </div>
                )}
              </td>
              <td>
                {item.state ? (
                  <div className={cx("wrap_state")}>
                    <img
                      src={require("../../assentce/xanh.png")}
                      style={{
                        color: "rgba(3, 172, 0, 1)",
                      }}
                    />
                    <h6 className={cx("state_txt")}>Đã sử dụng</h6>
                  </div>
                ) : (
                  <div className={cx("wrap_state_do")}>
                    <img
                      src={require("../../assentce/Do.png")}
                      // style={{
                      //   color: "rgba(253, 89, 89, 1)",
                      // }}
                    />
                    <h6 className={cx("state_txt_do")}>Tắt</h6>
                  </div>
                )}
              </td>
              <td
                className={cx("wrap_up")}
                onClick={() => {
                  handleShow(item);
                }}
              >
                <EditOutlined />
                Cập nhật
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {update ? <ModalUpdate data={item} /> : null}
    </div>
  );
};

export default TablePackTicket;
 