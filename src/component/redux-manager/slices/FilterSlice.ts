import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  status: "Tất cả",
  dateFrom: "",
  dateTo: "",
  nameSk: "",
  statusList: "",
  gate: [],
};

const FilterSlice = createSlice({
  name: "FilterTicket",
  initialState,
  reducers: {
    Status: (state, action) => {
      state.status = action.payload;
    },
    DateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    DateTo: (state, action) => {
      state.dateTo = action.payload;
    },
    Search: (state, action) => {
      state.search = action.payload;
    },
    NameSK: (state, action) => {
      state.nameSk = action.payload;
    },
    StatusList: (state, action) => {
      state.statusList = action.payload;
    },
    Gate: (state, action) => {
      state.gate = action.payload;
    },
  },
});

export default FilterSlice;