import { createSelector } from "@reduxjs/toolkit";

export const ListTicketsSelector = (state: any) => state.TodoTicket;
export const StatusSelector = (state: any) => state.FilterTicket.status;
export const DateFromSelector = (state: any) => state.FilterTicket.dateFrom;
export const DateToSelector = (state: any) => state.FilterTicket.dateTo;
export const SearchSelector = (state: any) => state.FilterTicket.search;
export const NameSKSelector = (state: any) => state.FilterTicket.nameSk;

export const todoRemainingSelector = createSelector(
  ListTicketsSelector,
  StatusSelector,
  DateFromSelector,
  DateToSelector,
  SearchSelector,
  (TodoTicket, status, dateFrom, dateTo, search) => {
    return TodoTicket.listTicket.filter((item: any) => {
      if (status === "Tất cả") {
        return item.NamePacke === "Gói gia đình" &&
          dateFrom.length !== 0 &&
          dateTo.length !== 0
          ? new Date(item.dateUsed) >= new Date(dateFrom) &&
              new Date(item.dateUsed) <= new Date(dateTo) &&
              item.idVe.includes(search)
          : item.NamePacke === "Gói gia đình" && item.idVe.includes(search);
      }
      return item.NamePacke === "Gói gia đình" &&
        dateFrom.length !== 0 &&
        dateTo.length !== 0
        ? (status === "Đã đối soát"
            ? item.stateUsed === "true"
            : item.stateUsed === "false") &&
            new Date(item.dateUsed) >= new Date(dateFrom) &&
            new Date(item.dateUsed) <= new Date(dateTo) &&
            item.idVe.includes(search)
        : item.NamePacke === "Gói gia đình" &&
            (status === "Đã đối soát"
              ? item.stateUsed === "true"
              : item.stateUsed === "false") &&
            item.idVe.includes(search);
    });
  }
);
export const todoRemainingSelectorSK = createSelector(
  ListTicketsSelector,
  StatusSelector,
  DateFromSelector,
  DateToSelector,
  SearchSelector,
  NameSKSelector,
  (TodoTicket, status, dateFrom, dateTo, search, nameSK) => {
    return TodoTicket.listTicket.filter((item: any) => {
      if (status === "Tất cả") {
        return item.NamePacke === "Gói sự kiện" &&
          dateFrom.length !== 0 &&
          dateTo.length !== 0
          ? new Date(item.dateUsed) >= new Date(dateFrom) &&
              new Date(item.dateUsed) <= new Date(dateTo) &&
              item.idVe.includes(search) &&
              item.nameSK.includes(nameSK)
          : item.NamePacke === "Gói sự kiện" &&
              item.idVe.includes(search) &&
              item.nameSK.includes(nameSK);
      }
      return item.NamePacke === "Gói sự kiện" &&
        dateFrom.length !== 0 &&
        dateTo.length !== 0
        ? (status === "Đã đối soát"
            ? item.stateUsed === "true"
            : item.stateUsed === "false") &&
            new Date(item.dateUsed) >= new Date(dateFrom) &&
            new Date(item.dateUsed) <= new Date(dateTo) &&
            item.idVe.includes(search) &&
            item.nameSK.includes(nameSK)
        : item.NamePacke === "Gói sự kiện" &&
            (status === "Đã đối soát"
              ? item.stateUsed === "true"
              : item.stateUsed === "false") &&
            item.idVe.includes(search) &&
            item.nameSK.includes(nameSK);
    });
  }
);