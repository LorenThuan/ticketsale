import React, { useState } from "react";

export const AppContext = React.createContext();
function AppProvider({ children }) {
  const [show, setShow] = useState(false);
  const [changeDate, setchangeDate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);

  const [status, setStatus] = useState("Tất cả");
  const [item, setItem] = useState({});
  const [active, setActive] = useState("QuanLy");
  const [packed, setPacked] = useState(true);

  const clearState = () => {
    setShow(false);
    setAdd(false);
    setUpdate(false);
    setPacked(true);
    setActive("");
    setStatus("");
    setchangeDate(false);
    setItem({});
  };
  return (
    <AppContext.Provider
      value={{
        show,
        setShow,
        active,
        setActive,
        changeDate,
        setchangeDate,
        add,
        setAdd,
        update,
        setUpdate,
        item,
        setItem,
        status,
        setStatus,
        packed,
        setPacked,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;