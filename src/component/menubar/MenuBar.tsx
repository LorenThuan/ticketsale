import React from "react";
import {
  HomeOutlined,
  ExceptionOutlined,
  SettingOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import styles from "./MenuBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Menubar = () => {
  return (
    <div className={cx("wrap_Menubar")}>
      <div className={cx("wrap_Menubar_content")}>
        <HomeOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Trang chủ</h6>
      </div>
      <div className={cx("wrap_Menubar_content")}>
        <BoxPlotOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Quản lý vé</h6>
      </div>
      <div className={cx("wrap_Menubar_content")}>
        <ExceptionOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Đối soát vé</h6>
      </div>

      <div className={cx("wrap_Menubar_content")}>
        <SettingOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Cài đặt</h6>
      </div>
    </div>
  );
};

export default Menubar;