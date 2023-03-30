import React, { useState } from "react";

export const AppContext = React.createContext();
function AppProvider({ children }) {
  const [show, setShow] = useState(false);
  const [changeDate, setchangeDate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);

  const [active, setActive] = useState("");

  const clearState = () => {
    setShow(false);
    setAdd(false);
    setUpdate(false);
    setActive("");
    setchangeDate(false);
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
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;