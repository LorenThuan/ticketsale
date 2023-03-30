import React from "react";
import styles from "./FilterCheck.module.scss";
import classNames from "classnames/bind";
import { Input, Select, Radio, Button } from "antd";
const cx = classNames.bind(styles);
const FilterCheck = () => {
  return (
    <div className={cx("wrap_FilterCheck")}>
      <h3 style={{ fontWeight: "bold" }}>Lọc Vé</h3>
      <div>
        <Input.Group style={{ display: "flex" }} compact>
          <Select defaultValue="Medium">
            <Select.Option value="High" label="High">
              Hội chợ triển lãm tiêu dùng 2021
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              Hội chợ triển lãm tiêu dùng 2022
            </Select.Option>
            <Select.Option value="Low" label="Low">
              Hội chợ triển lãm tiêu dùng 2023
            </Select.Option>
          </Select>
        </Input.Group>
      </div>
      <div className={cx("radioFilterCheck")}>
        <h6>Tình Trạng sử dụng</h6>
        <Radio.Group className={cx("radioFilterCheck")}>
          <Radio value="All" style={{ fontSize: 16 }}>
            Tất cả
          </Radio>
          <Radio value="Completed" style={{ fontSize: 16 }}>
            Đã đối soát
          </Radio>
          <Radio value="Todo" style={{ fontSize: 16 }}>
            {" "}
            Chưa đối soát
          </Radio>
        </Radio.Group>
      </div>
      <div className={cx("FilterDate")}>
        <label>Từ ngày</label>
        <input type="date" />
      </div>
      <div className={cx("FilterDate")}>
        <label>Đến ngày</label>
        <input type="date" />
      </div>
      <div className={cx("wrap_FilterBtn")}>
        <input type="button" value="Lọc" className={cx("filterBtn")} />
      </div>
    </div>
  );
};

export default FilterCheck;