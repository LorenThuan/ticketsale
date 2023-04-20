import { createSelector } from "@reduxjs/toolkit";

export const ListTicketsSelector = (state: any) => state.TodoTicket;
export const StatusSelector = (state: any) => state.FilterTicket.status;
export const DateFromSelector = (state: any) => state.FilterTicket.dateFrom;
export const DateToSelector = (state: any) => state.FilterTicket.dateTo;
export const SearchSelector = (state: any) => state.FilterTicket.search;
export const NameSKSelector = (state: any) => state.FilterTicket.nameSk;
export const StatusListSelector = (state: any) => state.FilterTicket.statusList;
export const GateSelector = (state: any) => state.FilterTicket.gate;
export const DateToStatisticalSelector = (state: any) =>
  state.FilterTicket.dateToStatiscal;
export const DateFromStatisticalSelector = (state: any) =>
  state.FilterTicket.dateFromStaticscal;

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

export const StatiscalGD = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let TicketUse: number = 0;
    let TicketUseOut: number = 0;
    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {
        if (item.NamePacke === "Gói gia đình") {
          if (item.stateUsed === "true1") {
            // TicketUse += item.priceVe;
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            // TicketUseOut += item.priceVe;

            TicketUseOut += 1;
          }
        }
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo) &&
          item.NamePacke === "Gói gia đình"
        ) {
          if (item.stateUsed === "true1") {
            // TicketUse += item.priceVe;
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            // TicketUseOut += item.priceVe;
            TicketUseOut += 1;
          }
        }
      }
    });
    return [TicketUse, TicketUseOut];
  }
);

export const StatiscalSKPrice = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let TicketUse: number = 0;
    let TicketUseOut: number = 0;
    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {
        if (item.NamePacke === "Gói sự kiện") {
          if (item.stateUsed === "true1") {
            TicketUse += item.priceVe;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += item.priceVe;
          }
        }
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo) &&
          item.NamePacke === "Gói sự kiện"
        ) {

          if (item.stateUsed === "true1") {
            TicketUse += item.priceVe
          } else if (item.stateUsed === "false1") {
            TicketUseOut += item.priceVe
          }
        }
      }
    });
    return [TicketUse, TicketUseOut];
  }
);

export const StatiscalGDPrice = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let TicketUse: number = 0;
    let TicketUseOut: number = 0;
    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {

        if (item.NamePacke === "Gói gia đình") {
          if (item.stateUsed === "true1") {
            TicketUse += item.priceVe;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += item.priceVe;
          }
        }
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo) &&
          item.NamePacke === "Gói gia đình"
        ) {

          if (item.stateUsed === "true1") {
            TicketUse += item.priceVe;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += item.priceVe;
          }
        }
      }
    });
    return [TicketUse, TicketUseOut];
  }
);

export const StatiscalSK = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let TicketUse: number = 0;
    let TicketUseOut: number = 0;
    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {

        if (item.NamePacke === "Gói sự kiện") {
          if (item.stateUsed === "true1") {
            // TicketUse += item.priceVe;
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            // TicketUseOut += item.priceVe;
            TicketUseOut += 1;
          }
        }
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo) &&
          item.NamePacke === "Gói sự kiện"
        ) {

          if (item.stateUsed === "true1") {
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += 1;
          }
        }
      }
    });
    return [TicketUse, TicketUseOut];
  }
);

export const Statiscal = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let TicketUse: number = 0;
    let TicketUseOut: number = 0;
    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {

        if (item.NamePacke === "Gói sự kiện") {
          if (item.stateUsed === "true1") {
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += 1;
          }
        }
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo) &&
          item.NamePacke === "Gói sự kiện"
        ) {

          if (item.stateUsed === "true1") {
            TicketUse += 1;
          } else if (item.stateUsed === "false1") {
            TicketUseOut += 1;
          }
        }
      }
    });
    return [TicketUse, TicketUseOut];
  }
);
export const StatiscalArea = createSelector(
  ListTicketsSelector,
  DateFromStatisticalSelector,
  DateToStatisticalSelector,
  (TodoTicket, dateFrom, dateTo) => {
    let T2: number = 0;
    let T3: number = 0;
    let T4: number = 0;
    let T5: number = 0;
    let T6: number = 0;
    let T7: number = 0;
    let CN: number = 0;

    TodoTicket.listTicket.map((item: any) => {
      if (dateTo.length === 0 && dateFrom.length === 0) {
        T2 = 0;
        T3 = 0;
        T4 = 0;
        T5 = 0;
        T6 = 0;
        T7 = 0;
        CN = 0;
      } else {
        if (
          new Date(item.datePublish) >= new Date(dateFrom) &&
          new Date(item.datePublish) <= new Date(dateTo)
        ) {
          let dayOfWeek = new Date(item.datePublish).getDay();
          T2 += dayOfWeek === 2 ? item.priceVe : 0;
          T3 += dayOfWeek === 3 ? item.priceVe : 0;
          T4 += dayOfWeek === 4 ? item.priceVe : 0;
          T5 += dayOfWeek === 5 ? item.priceVe : 0;
          T6 += dayOfWeek === 6 ? item.priceVe : 0;
          T7 += dayOfWeek === 7 ? item.priceVe : 0;
          CN += dayOfWeek === 1 ? item.priceVe : 0;
        }
      }
    });
    return [T2, T3, T4, T5, T6, T7, CN];
  }
);