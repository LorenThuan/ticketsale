import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../../context/AppProvider";
import styles from "./ModalUpdate.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ModalUpdate: React.FC = () => {
  const { update, setUpdate } = useContext(AppContext);

  const showModal = () => {
    setUpdate(true);
  };

  const handleOk = () => {
    setUpdate(false);
  };

  const handleCancel = () => {
    setUpdate(false);
  };

  return (
    <>
      <Modal
        open={update}
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
                    className={cx("inp_Ten")}
                    placeholder="PKG20210502"
                  />
                </div>
              </div>
              <div>
                <label className={cx("txtTen")}>Tên sự kiện</label>

                <div>
                  <input
                    type="text"
                    className={cx("inp_Ten")}
                    placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
                  />
                </div>
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

export default ModalUpdate;