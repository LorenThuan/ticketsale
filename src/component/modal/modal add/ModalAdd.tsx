import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag, Space } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalAdd.module.scss";
import classNames from "classnames/bind";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../fireBase/FireBase";
import { dataref } from "../../lib/Firebase";
// import { v4 as uuidv4 } from "uuid";
import { child, getDatabase, ref, get, push } from "firebase/database";
import { useDispatch } from "react-redux";
import TodoSlice from "../../redux-manager/slices/TodoSlice";

interface TicketsIn {
  // id?: string | null;
  nameTick?: string;
  nameTickSK?: string;
  dataUse?: string;
  dateOutUse?: string;
  price?: number;
  priceCombo?: number;
  amoutCombo?: number;
  state?: boolean;
  gate?: string;
}

const cx = classNames.bind(styles);
const ModalAdd: React.FC = () => {
  const dbRef = ref(getDatabase());
  const { add, setAdd, itemDownload } = useContext(AppContext);

  const [checkOne, setCheckOne] = useState<boolean>(false);
  const [checkMulti, setCheckMulti] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [Tickets, setTickets] = useState<TicketsIn | undefined>({
    // id: idK,
    nameTick: "Gói gia đình",
    nameTickSK: "",
    dataUse: "",
    dateOutUse: "",
    price: 0,
    priceCombo: 0,
    amoutCombo: 1,
    state: true,
    gate: "Cổng 1",
  });

  const tickets: TicketsIn = {};

  const handleAdd = () => {
    // const db = getDatabase();
    // const idK = push(ref(db, "TicketPacked")).key;
    // // setTickets({ ...Tickets, id: idK });
    // const data = dataref.ref(`TicketPacked`).push();
    // data.set({ ...Tickets, id: data.key }).catch(alert);
    // console.log(Tickets);
    dispatch(TodoSlice.actions.addPackTicket(Tickets));
    if (Tickets && typeof Tickets?.amoutCombo === 'number') {
      for (let i = 0; i < Tickets?.amoutCombo; i++) {
        dispatch(TodoSlice.actions.addListTicket(Tickets));
      }
    }

  };

  const showModal = () => {
    setAdd(true);
  };


  const handleCancel = () => {
    setAdd(false);
  };

  return (
    <>
      <Modal
        open={add}
        onCancel={handleCancel}
        centered
        className={cx("WrapFilterTitle")}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className={cx("WrapFilterModal")}
          >
            Hủy
          </Button>,
          <Button
            key="add"
            onClick={handleAdd}
            className={cx("WrapFilterModal_Luu")}
          >
            Lưu
          </Button>,
        ]}
      >
        <div className={cx("wrap_ModalAdd")}>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Thêm gói vé
          </h4>
          <div className={cx("contentFilter")}>
            <div>
              <label className={cx("txtTen")}>Tên gói vé</label>
              <label className={cx("txtSao")}>*</label>
              <div>
              <Space.Compact style={{ display: "flex" }}>
                  <Select
                    defaultValue="Gói gia đình"
                    onChange={(value: string) => {
                      setTickets({ ...Tickets, nameTick: value });
                    }}
                  >
                    <Select.Option value="Gói gia đình" label="Gói gia đình">
                      Gói gia đình
                    </Select.Option>
                    <Select.Option value="Gói sự kiện" label="Gói sự kiện">
                      Gói sự kiện
                    </Select.Option>
                  </Select>
                </Space.Compact>
              </div>
            </div>
            {Tickets?.nameTick === "Gói sự kiện" ? (
              <div>
                <label className={cx("txtTen")}>Tên sự kiện</label>

                <div>
                  <input
                    type="text"
                    className={cx("inp_Ten")}
                    placeholder="Nhập tên sự kiện"
                    onChange={(e) =>
                      setTickets({ ...Tickets, nameTickSK: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : null}
            <div>
              <Row>
                <Col>
                  <h5 className={cx("txtNgay")}>Ngày áp dụng</h5>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        dataUse: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <h5 className={cx("txtNgay")}>Ngày hết hạn</h5>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        dateOutUse: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
            <div>
              <h5 className={cx("txtNgay")}>Giá vé áp dụng </h5>
            </div>
            <div className={cx("Vele")}>
              <Checkbox
                  checked={checkOne}
                  onChange={(e) => {
                    setCheckOne(e.target.checked);
                  }}
                />
              <p className={cx("txtVe")}>Vé lẻ (vnđ/vé) với giá</p>
              <input
                type="number"
                className={cx("inp_ve")}
                placeholder="Giá vé"
                onChange={(e) =>
                  setTickets({ ...Tickets, price: parseInt(e.target.value) })
                }
              />
              /vé
            </div>
            <div className={cx("Vele")}>
              <Checkbox
                  checked={checkMulti}
                  onChange={(e) => {
                    setCheckMulti(e.target.checked);
                  }}
                />
              <p className={cx("txtVe")}>Combo vé với giá</p>
              <input
                disabled={!checkMulti}
                type="text"
                className={cx("inp_ve")}
                placeholder="Giá vé"
                onChange={(e) => {
                  setTickets({
                    ...Tickets,
                    priceCombo: parseInt(e.target.value),
                  });
                }}
              />
              /
              <input
                disabled={!checkMulti}
                type="text"
                className={cx("inp_songuoi")}
                placeholder="vé"
                onChange={(e) =>
                  setTickets({
                    ...Tickets,
                    amoutCombo: parseInt(e.target.value),
                  })
                }
              />
              vé
            </div>
            <div>
              <h5>Tình trạng</h5>
              <div>
              <Space.Compact style={{ display: "flex" }}>
                  <Select
                    defaultValue={true}
                    onChange={(value: boolean) => {
                      console.log(value);
                      setTickets({ ...Tickets, state: value });
                    }}
                  >
                    <Select.Option value={true} label="Đang áp dụng">
                      Đang áp dụng
                    </Select.Option>
                    <Select.Option value={false} label="Tắt">
                      Tắt
                    </Select.Option>
                  </Select>
                </Space.Compact>
              </div>
            </div>
              <div>
                <h5>Cổng vào</h5>
                <div>
                  <Space.Compact style={{ display: "flex" }}>
                    <Select
                      defaultValue="Cổng 1"
                      onChange={(value: string) => {
                        setTickets({ ...Tickets, gate: value });
                      }}
                    >
                      <Select.Option value="Cổng 1" label="Cổng 1">
                        Cổng 1
                      </Select.Option>
                      <Select.Option value="Cổng 2" label="Cổng 2">
                        Cổng 2
                      </Select.Option>
                      <Select.Option value="Cổng 3" label="Cổng 3">
                        Cổng 3
                      </Select.Option>
                      <Select.Option value="Cổng 4" label="Cổng 4">
                        Cổng 4
                      </Select.Option>
                      <Select.Option value="Cổng 5" label="Cổng 5">
                        Cổng 5
                      </Select.Option>
                    </Select>
                  </Space.Compact>
                </div>
              </div>
            <div>
              <label className={cx("txtSao")}>*</label> là thông tin bắt buộc
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAdd;