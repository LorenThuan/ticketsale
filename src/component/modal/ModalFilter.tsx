import React, { useState, useContext } from "react";
import { Button, Checkbox, Modal } from "antd";
import { Input, Typography, Radio, Select, Tag } from "antd";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AppContext } from "../context/AppProvider";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { getPackTicket } from "../redux-manager/slices/TodoSlice";
import FilterSlice from "../redux-manager/slices/FilterSlice";
import { useDispatch } from "react-redux";
import { Value } from "sass";

const cx = classNames.bind(styles);

interface Filter {
  gate: string[];
}

const ModalFilter: React.FC = () => {
  const { show, setShow } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const showModal = () => {
    setShow(true);
  };

  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleDateFrom = (e: any) => {
    setdateFrom(e.target.value);
    dispatch(FilterSlice.actions.DateFrom(e.target.value));
  };
  const handleDateTo = (e: any) => {
    setdateTo(e.target.value);
    dispatch(FilterSlice.actions.DateTo(e.target.value));
  };

  const handleStatus = (e: any) => {
    setStatus(e.target.value);
    dispatch(FilterSlice.actions.StatusList(e.target.value));
  };
  const initFilter: Filter = {
    gate: [],
    // khởi tạo các thuộc tính khác
  };
  const [filter, setFilter] = useState<Filter>(initFilter);

  const handleCheck = (type: any, checked: any, item: string) => {
    if (checked) {
      switch (type) {
        case "GATE":
          if (item === "") {
            setFilter({ ...filter, gate: [""] });
            dispatch(FilterSlice.actions.Gate([]));
          } else {
            setFilter({ ...filter, gate: [...filter.gate, item] });
            dispatch(FilterSlice.actions.Gate([...filter.gate, item]));
          }
          break;
        default:
      }
    } else {
      switch (type) {
        case "GATE":
          const newGate = filter.gate.filter((e) => e !== item);
          setFilter({ ...filter, gate: newGate });
          dispatch(FilterSlice.actions.Gate(newGate));

          break;
        default:
      }
    }
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
              <input type="date" value={dateFrom} onChange={handleDateFrom} />
            </Col>
            <Col>
              <p>Đến ngày</p>
              <input type="date" value={dateTo} onChange={handleDateTo} />
            </Col>
          </Row>
          <Row className={cx("radioModal")}>
            <h6>Tình Trạng sử dụng</h6>
            <Radio.Group value={status} onChange={handleStatus}>
              <Radio value="" style={{ fontSize: 16 }}>
                Tất cả
              </Radio>
              <Radio value="true" style={{ fontSize: 16 }}>
                Đã sử dụng
              </Radio>
              <Radio value="false" style={{ fontSize: 16 }}>
                Chưa sử dụng
              </Radio>
              <Radio value="het" style={{ fontSize: 16 }}>
                Hết hạn
              </Radio>
            </Radio.Group>
          </Row>
          <div>
            <h6>Cổng check-in</h6>
            <div>
              <Col className={cx("checkModal")}>
              <Checkbox
                  style={{ fontSize: 16, marginRight: 8 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "");
                  }}
                  checked={filter.gate.includes("")}
                >
                  Tất cả
                </Checkbox>
                <Checkbox
                  style={{ fontSize: 16 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "Cổng 1");
                  }}
                  checked={filter.gate.includes("Cổng 1")}
                  disabled={filter.gate.includes("")}
                >
                  Cổng 1
                </Checkbox>
                <Checkbox
                  style={{ fontSize: 16 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "Cổng 2");
                  }}
                  checked={filter.gate.includes("Cổng 2")}
                  disabled={filter.gate.includes("")}
                >
                  Cổng 2
                </Checkbox>
              </Col>
              <Col className={cx("checkModal")}>
              <Checkbox
                  style={{ fontSize: 16 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "Cổng 3");
                  }}
                  checked={filter.gate.includes("Cổng 3")}
                  disabled={filter.gate.includes("")}
                >
                  Cổng 3
                </Checkbox>
                <Checkbox
                  style={{ fontSize: 16 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "Cổng 4");
                  }}
                  checked={filter.gate.includes("Cổng 4")}
                  disabled={filter.gate.includes("")}
                >
                  Cổng 4
                </Checkbox>
                <Checkbox
                  style={{ fontSize: 16 }}
                  onChange={(e) => {
                    handleCheck("GATE", e.target.checked, "Cổng 5");
                  }}
                  checked={filter.gate.includes("Cổng 5")}
                  disabled={filter.gate.includes("")}
                >
                  Cổng 5
                </Checkbox>
              </Col>
            </div>
          </div>
        </div>
      </Modal> 
    </>
  );
};

export default ModalFilter;