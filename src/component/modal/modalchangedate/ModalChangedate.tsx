import React, { useState, useContext, useEffect } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalChangedate.module.scss";
import { useDispatch } from "react-redux";
import TodoSlice, { getListTickets } from "../../redux-manager/slices/TodoSlice";
import classNames from "classnames/bind";
import { useAppDispatch } from "../../redux-manager/hook";

interface TicketsIn {
  NamePacke?: string;
  dateUsed?: string;
  gateCheck?: string;
  idVe?: string;
  nameSK: string;
  priceVe: number;
  stateUsed: string;
  datePublish: string;
}

type Props = { data: TicketsIn[] | null};

const cx = classNames.bind(styles);

const ModalChangedate = () => {
  const { changeDate, setchangeDate, reRender, setRerender, itemChangDateUse } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  type itemChangDateUse = any

  const [itemTemp, setItemTemp] = useState<itemChangDateUse | any>(itemChangDateUse)

  

  const [Tickets, setTickets] = useState<itemChangDateUse | undefined>({
    NamePacke: "",
    dateUsed: "",
    gateCheck: "",
    idVe: "",
    nameSK: "",
    priceVe: 0,
    stateUsed: "",
    datePublish: "Cổng 1",
  });

  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(TodoSlice.actions.updateDateUseTicket(itemTemp));
    setRerender(!reRender);
  };

  useEffect(() => {
    dispatch(getListTickets());
  }, [dispatch, itemTemp, reRender]);
  

  const showModal = () => {
    setchangeDate(true);
  };

  const handleOk = () => {
    setchangeDate(false);
  };

  const handleCancel = () => {
    setchangeDate(false);
  };

  return (
    <>
      <Modal
        open={changeDate}
        onOk={handleOk}
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
            key="back"
            onClick={handleUpdate}
            className={cx("WrapFilterModal_Luu")}
          >
            Lưu
          </Button>,
        ]}
      >
        <h4
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Đổi ngày sử dụng vé
        </h4>
        <div className={cx("contentFilter")}> 
          <div>
            <label>Số vé</label>
            <label className={cx("contentFilter_ve")}>{itemTemp.idVe}</label>
          </div>
          <div>
            <label>Tên vé</label>
            {itemTemp.nameSK ?  (
                          <label className={cx("contentFilter_loai")}>
                          Vé cổng - Gói sự kiện
                        </label>
            ) : (
              <label className={cx("contentFilter_loai")}>
              Vé cổng - {itemTemp.NamePacke}
            </label>
            )
            }
          </div>
          {itemTemp.nameSK ?  ( 
          <div>
            <label>Tên sự kiện</label>
            <label className={cx("contentFilter_sk")}>
                    {itemTemp.nameSK}
            </label>
          </div>
          )   : (
            <div></div>
          )
          }

          <div className={cx("contentFilter_ngay")}>
            <label>Hạn sử dụng</label>
            <input type="date" 
            onChange={(e) =>
              setItemTemp({
                ...itemTemp,
                dateUsed: e.target.value,
              })
            } 
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalChangedate;