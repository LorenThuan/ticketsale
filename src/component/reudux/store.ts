import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import FilterSlice from "./slices/FilterSlice";
import TodoSlice from "./slices/TodoSlice";
const store = configureStore({
  reducer: {
    FilterTicket: FilterSlice.reducer,
    TodoTicket: TodoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch();
export default store;