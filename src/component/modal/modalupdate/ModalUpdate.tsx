import React, { useState, useContext, useEffect } from "react";
import { Button, Checkbox, Modal, Space } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalUpdate.module.scss";
import classNames from "classnames/bind";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { dataref } from "../../lib/Firebase";
import { useDispatch } from "react-redux";
import TodoSlice from "../../redux-manager/slices/TodoSlice";  
interface TicketsIn {
  id?: string;
  nameTick?: string;
  dataUse?: string;
  dateOutUse?: string;
  price?: number;
  priceCombo?: number;
  amoutCombo?: number;
  state?: boolean;
  nameTickSK?: string;
}
type Props = { data: TicketsIn };

const cx = classNames.bind(styles);
const ModalUpdate = (props: Props) => {
  const { update, setUpdate } = useContext(AppContext);

  const [Tickets, setTickets] = useState<TicketsIn>({
    id: props.data.id,
    nameTick: props.data.nameTick,
    dataUse: props.data.dataUse,
    dateOutUse: props.data.dateOutUse,
    price: props.data.price,
    priceCombo: props.data.priceCombo,
    amoutCombo: props.data.amoutCombo,
    state: props.data.state,
    nameTickSK: props.data.nameTickSK,
  });

  const [checkOne, setCheckOne] = useState<boolean>(false);
  const [checkMulti, setCheckMulti] = useState<boolean>(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setUpdate(true);
  };

  console.log(Tickets);
  const handleUpdate = () => {
    // setUpdate(false);
    // const db = getDatabase();
    // Write the new post's data simultaneously in the posts list and the user's post list.
    // const updates: any = {};
    // updates["ListTicket/" + props.data.id] = Tickets;

    // dataref
    //   .ref("ListTicket/" + props.data.id)
    //   .update(Tickets)
    //   .catch(alert);
    // update(ref(db), updates);
    dispatch(TodoSlice.actions.updatePackTicket(Tickets));
  };

  const handleCancel = () => {
    setUpdate(false);
  };

  return (
    <>
      <Modal
        open={update}
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
            key="Add"
            onClick={handleUpdate}
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
            Cập nhật thông tin gói vé
          </h4>
          <div className={cx("contentFilter")}>
            <div className={cx("header_Name")}>
              <div>
                <label className={cx("txtTen")}>Mã sự kiện</label>
                <label className={cx("txtSao")}>*</label>
                <div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        id: e.target.value,
                      })
                    }
                    defaultValue={props.data.id}
                    disabled={true}
                    className={cx("inp_Ten")}
                    placeholder="PKG20210502"
                  />
                </div>
              </div>
              {props.data.nameTick === "Gói sự kiện" ? (

                <div>
                    <label className={cx("txtTen")}>Tên sự kiện</label>

                    <div>
                      <input
                        type="text"
                        className={cx("inp_Ten")}
                        defaultValue={props.data.nameTickSK}
                        placeholder="Hội chợ triển lãm hàng tiêu dùng 2023"
                      />
                    </div>
                </div>
                ) : null}
            </div>
            <div>
              <Row>
                <Col>
                  <p className={cx("txtNgay")}>Ngày áp dụng</p>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    defaultValue={props.data.dataUse}
                    onChange={(e) =>
                      setTickets({
                        ...Tickets,
                        dataUse: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <p className={cx("txtNgay")}>Ngày hết hạn</p>
                  <input
                    type="date"
                    className={cx("inp_Ngay")}
                    defaultValue={props.data.dateOutUse}
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
                type="text"
                className={cx("inp_ve")}
                placeholder="Giá vé"
                defaultValue={props.data.price}
                onChange={(e) =>
                  setTickets({
                    ...Tickets,
                    price: parseInt(e.target.value),
                  })
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
                type="text"
                disabled={!checkMulti}
                className={cx("inp_ve")}
                placeholder="Giá vé"
                defaultValue={props.data.priceCombo}
                onChange={(e) =>
                  setTickets({
                    ...Tickets,
                    priceCombo: parseInt(e.target.value),
                  })
                }
              />
              /
              <input
                type="text"
                className={cx("inp_songuoi")}
                disabled={!checkMulti}
                placeholder="vé"
                defaultValue={props.data.amoutCombo}
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
                    defaultValue={props.data.state}
                    onChange={(value: boolean) => {
                      // console.log(value);
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
              <label className={cx("txtSao")}>*</label> là thông tin bắt buộc
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;