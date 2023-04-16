import { createSelector } from "@reduxjs/toolkit";

export const ListTicketsSelector = (state: any) => state.TodoTicket;
export const StatusSelector = (state: any) => state.FilterTicket.status;
export const DateFromSelector = (state: any) => state.FilterTicket.dateFrom;
export const DateToSelector = (state: any) => state.FilterTicket.dateTo;
export const SearchSelector = (state: any) => state.FilterTicket.search;
export const NameSKSelector = (state: any) => state.FilterTicket.nameSk;
export const StatusListSelector = (state: any) => state.FilterTicket.statusList;
export const GateSelector = (state: any) => state.FilterTicket.gate;

export const todoRemainingSelector = createSelector(
  ListTicketsSelector,
  StatusSelector,
  DateFromSelector,
  DateToSelector,
  SearchSelector,
  StatusListSelector,
  GateSelector,
  (TodoTicket, status, dateFrom, dateTo, search, statusList, gate) => {
    return TodoTicket.listTicket.filter((item: any) => {
      if (status === "Tất cả") {
        return item.NamePacke === "Gói gia đình" &&
          dateFrom.length !== 0 &&
          dateTo.length !== 0
          ? new Date(item.dateUsed) >= new Date(dateFrom) &&
              new Date(item.dateUsed) <= new Date(dateTo) &&
              item.idVe.includes(search) &&
              item.stateUsed.includes(statusList) &&
              (gate.length === 0 ? true : gate.includes(item.gateCheck))
          : item.NamePacke === "Gói gia đình" &&
              item.idVe.includes(search) &&
              item.stateUsed.includes(statusList) &&
              (gate.length === 0 ? true : gate.includes(item.gateCheck));
      }
      return item.NamePacke === "Gói gia đình" &&
        dateFrom.length !== 0 &&
        dateTo.length !== 0 &&
        gate.length
        ? (status === "Đã đối soát"
            ? item.stateUsed === "true1"
            : item.stateUsed === "false1") &&
            new Date(item.dateUsed) >= new Date(dateFrom) &&
            new Date(item.dateUsed) <= new Date(dateTo) &&
            item.idVe.includes(search) &&
            item.stateUsed.includes(statusList)
        : item.NamePacke === "Gói gia đình" &&
            (status === "Đã đối soát"
            ? item.stateUsed === "true1"
            : item.stateUsed === "false1") &&
          item.idVe.includes(search) &&
          item.stateUsed.includes(statusList);
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
  StatusListSelector,
  GateSelector,

  (TodoTicket, status, dateFrom, dateTo, search, nameSK, statusList, gate) => {
    return TodoTicket.listTicket.filter((item: any) => {
      if (status === "Tất cả") {
        return item.NamePacke === "Gói sự kiện" &&
          dateFrom.length !== 0 &&
          dateTo.length !== 0
          ? new Date(item.dateUsed) >= new Date(dateFrom) &&
              new Date(item.dateUsed) <= new Date(dateTo) &&
              item.idVe.includes(search) &&
              item.nameSK.includes(nameSK) &&
              item.stateUsed.includes(statusList) &&
              (gate.length === 0 ? true : gate.includes(item.gateCheck))
          : item.NamePacke === "Gói sự kiện" &&
              item.idVe.includes(search) &&
              item.nameSK.includes(nameSK) &&
              item.stateUsed.includes(statusList) &&
              (gate.length === 0 ? true : gate.includes(item.gateCheck));
      }
      return item.NamePacke === "Gói sự kiện" &&
        dateFrom.length !== 0 &&
        dateTo.length !== 0
        ? (status === "Đã đối soát"
            ? item.stateUsed === "true1"
            : item.stateUsed === "false1") &&
            new Date(item.dateUsed) >= new Date(dateFrom) &&
            new Date(item.dateUsed) <= new Date(dateTo) &&
            item.idVe.includes(search) &&
            item.nameSK.includes(nameSK) &&
            item.stateUsed.includes(statusList)
        : item.NamePacke === "Gói sự kiện" &&
            (status === "Đã đối soát"
              ? item.stateUsed === "true"
              : item.stateUsed === "false") &&
              item.nameSK.includes(nameSK) &&
              item.stateUsed.includes(statusList);
    });
  }
);