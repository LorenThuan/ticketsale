import React, { useState } from "react";

type ItemType = {
  name: string,
  quantity: number,
  packed: boolean,
  dateAdded: Date
}

type AppProviderProps = {
  children: React.ReactNode
}

type AppContextType = {
  show: boolean,
  setShow: (show: boolean) => void,
  active: string,
  setActive: (active: string) => void,
  changeDate: boolean,
  setchangeDate: (changeDate: boolean) => void,
  add: boolean,
  setAdd: (add: boolean) => void,
  update: boolean,
  setUpdate: (update: boolean) => void,
  item: ItemType,
  setItem: (item: ItemType) => void,
  status: string,
  setStatus: (status: string) => void,
  packed: boolean,
  setPacked: (packed: boolean) => void,
  clearState: () => void,
  itemDownload: ItemType[],
  setItemDownload: (itemDownload: ItemType[]) => void
}

export const AppContext = React.createContext<AppContextType>({
  show: false,
  setShow: () => undefined,
  active: "",
  setActive: () => undefined,
  changeDate: false,
  setchangeDate: () => undefined,
  add: false,
  setAdd: () => undefined,
  update: false,
  setUpdate: () => undefined,
  item: {
    name: "",
    quantity: 0,
    packed: false,
    dateAdded: new Date()
  },
  setItem: () => undefined,
  status: "",
  setStatus: () => undefined,
  packed: true,
  setPacked: () => undefined,
  clearState: () => undefined,
  itemDownload: [],
  setItemDownload: () => undefined
});

function AppProvider({ children }: AppProviderProps) {
  const [show, setShow] = useState<boolean>(false);
  const [changeDate, setchangeDate] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("Tất cả");
  const [item, setItem] = useState<ItemType>({
    name: "",
    quantity: 0,
    packed: false,
    dateAdded: new Date()
  });
  const [active, setActive] = useState<string>("QuanLy");
  const [packed, setPacked] = useState<boolean>(true);

  const [itemDownload, setItemDownload] = useState<ItemType[]>([]);

  const clearState = () => {
    setShow(false);
    setAdd(false);
    setUpdate(false);
    setPacked(true);
    setActive("");
    setStatus("");
    setchangeDate(false);
    setItem({
      name: "",
      quantity: 0,
      packed: false,
      dateAdded: new Date()
    });
    setItemDownload([]);
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
        itemDownload,
        setItemDownload
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
