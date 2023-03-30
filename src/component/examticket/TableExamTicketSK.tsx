import React from "react";
import Table from "react-bootstrap/Table";
import styles from "./ExamTicket.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

const TableExamTicketSK = () => {
  const handleShow = () => {
    console.log(123);
  };
  return (
    <div>
      <Table>
        <thead className={cx("wrap_Table")}>
          <tr>
            <th>STT</th>
            <th>Số vé</th>
            <th>Ngày sử dụng</th>
            <th>Tên Sự kiện</th>
            <th>Loại vé</th>
            <th>Cổng check-in</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr onDoubleClick={handleShow}>
            <td>1</td>
            <td>123456789034</td>
            <td>Hội chợ triển lãm tiêu dùng 2021</td>
            <td>14/04/2021</td>
            <td>Vé cổng</td>
            <td>Cổng 1</td>
            <td className={cx("wrap_Table_txt")}>Chưa đối soát</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableExamTicketSK;