import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalChangedate.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ModalChangedate: React.FC = () => {
  const { changeDate, setchangeDate } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onClick={handleCancel}
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
            <label className={cx("contentFilter_ve")}>PKG20210502</label>
          </div>
          <div>
            <label>Tên vé</label>
            <label className={cx("contentFilter_loai")}>
              Vé cổng - Gói sự kiện
            </label>
          </div>
          <div>
            <label>Tên sự kiện</label>
            <label className={cx("contentFilter_sk")}>
              Hội trợ triển lãm hàng tiêu dùng 2021
            </label>
          </div>

          <div className={cx("contentFilter_ngay")}>
            <label>Hạn sử dụng</label>
            <input type="date" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalChangedate;