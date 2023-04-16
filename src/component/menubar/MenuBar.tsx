import React, { useState, useContext } from "react";
import {
  HomeOutlined,
  ExceptionOutlined,
  SettingOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import { AppContext } from "../context/AppProvider";
import styles from "./MenuBar.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Menubar = () => {
  const { active, setActive } = useContext(AppContext);
  // const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handlePageHome = () => {
    setActive("TrangChu");
    navigate(`/home`);
  };
  const handlePageList = () => {
    navigate("/");

    setActive("QuanLy");
  };
  const handlePageSetting = () => {
    setActive("Caidat");
    navigate("/setting");
  };
  const handlePageCheck = () => {
    setActive("Doi");
    navigate("/check-ticket");
  };

  return (
    <div className={cx("wrap_Menubar")}>
      <div
        className={cx(
          "wrap_Menubar_content",
          active === "TrangChu" ? "TrangChu" : null
        )}
        onClick={handlePageHome}
      >
        <HomeOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Trang chủ</h6>
      </div>
      <div
        className={cx(
          "wrap_Menubar_content",
          active === "QuanLy" ? "QuanLy" : null
        )}
        onClick={handlePageList}
      >
        <BoxPlotOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Quản lý vé</h6>
      </div>
      <div
        className={cx("wrap_Menubar_content", active === "Doi" ? "Doi" : null)}
        onClick={handlePageCheck}
      >
        <ExceptionOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Đối soát vé</h6>
      </div>

      <div
        className={cx(
          "wrap_Menubar_content",
          active === "Caidat" ? "Caidat" : null
        )}
        onClick={handlePageSetting}
      >
        <SettingOutlined />
        <h6 className={cx("wrap_Menubar_txt")}>Cài đặt</h6>
      </div>
      <h6 className={cx("wrap_Menubar_txt_lui")}>Gói dịch vụ</h6>
    </div>
  );
};


export default Menubar;