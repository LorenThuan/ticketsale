import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalAdd.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ModalAdd: React.FC = () => {
  const { add, setAdd } = useContext(AppContext);

  const showModal = () => {
    setAdd(true);
  };

  const handleOk = () => {
    setAdd(false);
  };

  const handleCancel = () => {
    setAdd(false);
  };

  return (
    <>
      <Modal
        open={add}
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
                <input
                  type="text"
                  className={cx("inp_Ten")}
                  placeholder="Nhập tên gói vé"
                />
              </div>
            </div>
            <div>
              <Row>
                <Col>
                  <p className={cx("txtNgay")}>Ngày áp dụng</p>
                  <input type="date" className={cx("inp_Ngay")} />
                </Col>
                <Col>
                  <p className={cx("txtNgay")}>Ngày hết hạn</p>
                  <input type="date" className={cx("inp_Ngay")} />
                </Col>
              </Row>
            </div>
            <div>
              <h5 className={cx("txtNgay")}>Giá vé áp dụng </h5>
            </div>
            <div className={cx("Vele")}>
              <Checkbox />
              <p className={cx("txtVe")}>Vé lẻ (vnđ/vé) với giá</p>
              <input
                type="text"
                className={cx("inp_ve")}
                placeholder="Giá vé"
              />
              /vé
            </div>
            <div className={cx("Vele")}>
              <Checkbox />
              <p className={cx("txtVe")}>Combo vé với giá</p>
              <input
                type="text"
                className={cx("inp_ve")}
                placeholder="Giá vé"
              />
              /
              <input
                type="text"
                className={cx("inp_songuoi")}
                placeholder="Giá vé"
              />
              vé
            </div>
            <div>
              <h5>Tình trạng</h5>
              <div>
                <Input.Group style={{ display: "flex" }}>
                  <Select defaultValue="Medium">
                    <Select.Option value="High" label="High">
                      Đang áp dụng
                    </Select.Option>
                    <Select.Option value="Medium" label="Medium">
                      Tắt
                    </Select.Option>
                  </Select>
                </Input.Group>
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