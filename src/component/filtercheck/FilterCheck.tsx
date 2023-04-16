import React, { useContext, useState, useEffect } from "react";
import styles from "./FilterCheck.module.scss";
import classNames from "classnames/bind";

import { Input, Select, Radio, Button, Space } from "antd";
import { AppContext } from "../context/AppProvider";
import FilterSlice from "../redux-manager/slices/FilterSlice";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux-manager/hook";
import { getPackTicket } from "../redux-manager/slices/TodoSlice";

const cx = classNames.bind(styles);
const FilterCheck = () => {
  const { status, setStatus, packed } = useContext(AppContext);
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setdateTo] = useState("");
  const [nameSKS, setnameSK] = useState("");

  const dispatchA = useAppDispatch();

  const dispatch = useDispatch();
  const ListNameSK = useAppSelector(
    (state: any) => state.TodoTicket.packedTicket
  );
  const NameSk = ListNameSK.filter((item: any) => {
    return item.nameTickSK !== "";
  });

  useEffect(() => {
    dispatchA(getPackTicket());
  }, [dispatchA]);
  const handleStatus = (e: any) => {
    setStatus(e.target.value);
    dispatch(FilterSlice.actions.Status(e.target.value));
  };
  const handleDateFrom = (e: any) => {
    setdateFrom(e.target.value);
    dispatch(FilterSlice.actions.DateFrom(e.target.value));
  };
  const handleDateTo = (e: any) => {
    setdateTo(e.target.value);
    dispatch(FilterSlice.actions.DateTo(e.target.value));
  };
  const handleNameSk = (value: any) => {
    setnameSK(value);
    dispatch(FilterSlice.actions.NameSK(value));
  };

  return (
    <div className={cx("wrap_FilterCheck")}>
      <h5 style={{ fontWeight: "bold" }}>Lọc Vé</h5>
      {packed ? (
        <div>
          <Space.Compact style={{ display: "flex" }}>
            <Select defaultValue="" value={nameSKS} onChange={handleNameSk}>
              <Select.Option value="" label="">
                Tất cả
              </Select.Option>
              {NameSk?.map((item: any) => (
                <Select.Option
                  value={item.nameTickSK}
                  label={item.nameTickSK}
                  key={item.id}
                >
                  {item.nameTickSK}
                </Select.Option>
              ))}
            </Select>
          </Space.Compact>
        </div>
      ) : null}
      <div className={cx("radioFilterCheckCustom")}>
        <div style={{fontSize: 15, fontWeight: 600}}>Tình Trạng đối soát</div>
          <Radio.Group
            className={cx("radioFilterCheck")}
            value={status}
            onChange={handleStatus}
          >
          <Radio value="Tất cả" style={{ fontSize: 16 }}>  
            Tất cả
          </Radio>
          <Radio value="Đã đối soát" style={{ fontSize: 16 }}>
            Đã đối soát
          </Radio>
          <Radio value="Chưa đối soát" style={{ fontSize: 16 }}>
            {" "}
            Chưa đối soát
          </Radio>
        </Radio.Group>
      </div>

      <div className={cx("FilterTicket")}>
            <div style={{fontWeight: 600}}>Loại vé</div>
            <div style={{marginRight: 95}}>Vé cổng</div>
      </div>

      <div className={cx("FilterDate")}>
        <label style={{fontWeight: 600}}>Từ ngày</label>
        <input type="date" value={dateFrom} onChange={handleDateFrom} />
      </div>
      <div className={cx("FilterDate")}>
        <label style={{fontWeight: 600}}>Đến ngày</label>
        <input type="date" value={dateTo} onChange={handleDateTo} />
      </div>
      <div className={cx("wrap_FilterBtn")}>
        <input type="button" value="Lọc" className={cx("filterBtn")} />
      </div>
    </div>
  );
};

export default FilterCheck;