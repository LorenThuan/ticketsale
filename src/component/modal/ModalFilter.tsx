import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../context/AppProvider";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ModalFilter: React.FC = () => {
  const { show, setShow } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        open={show}
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
            Lọc
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
          Lọc vé
        </h4>
        <div className={cx("contentFilter")}>
          <Row>
            <Col>
              <p>Từ ngày</p>
              <input type="date" />
            </Col>
            <Col>
              <p>Đến ngày</p>
              <input type="date" />
            </Col>
          </Row>
          <Row className={cx("radioModal")}>
            <h6>Tình Trạng sử dụng</h6>
            <Radio.Group>
              <Radio value="All" style={{ fontSize: 16 }}>
                Tất cả
              </Radio>
              <Radio value="Completed" style={{ fontSize: 16 }}>
                Đã sử dụng
              </Radio>
              <Radio value="Todo" style={{ fontSize: 16 }}>
                {" "}
                Chưa sử dụng
              </Radio>
              <Radio value="No" style={{ fontSize: 16 }}>
                Hết hạn
              </Radio>
            </Radio.Group>
          </Row>
          <div>
            <h6>Cổng check-in</h6>
            <div>
              <Col className={cx("checkModal")}>
                <Checkbox style={{ fontSize: 16, marginRight: 8 }}>
                  Tất cả{" "}
                </Checkbox>
                <Checkbox style={{ fontSize: 16 }}>Cổng 1</Checkbox>
                <Checkbox style={{ fontSize: 16 }}>Cổng 2</Checkbox>
              </Col>
              <Col className={cx("checkModal")}>
                <Checkbox style={{ fontSize: 16 }}>Cổng 3</Checkbox>
                <Checkbox style={{ fontSize: 16 }}>Cổng 4</Checkbox>
                <Checkbox style={{ fontSize: 16 }}>Cổng 5</Checkbox>
              </Col>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalFilter;