import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, get, child, ref } from "firebase/database";
import { dataref } from "../../lib/Firebase";
interface State {
  packedTicket: any;
  listTicket: any;
}

interface Data {
  data: any;
}

export interface Action {
  type: string;
  payload?: any;
}
const initialState = {
  packedTicket: [],
  listTicket: [],
};
export const getPackTicket = createAsyncThunk(
  "packed/Ticket",
  async (rejectWithValue) => {
    const dbRef = ref(getDatabase());
    return new Promise((resolve, reject) => {
      get(child(dbRef, `TicketPacked`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let temp: any = [];
            snapshot.forEach((item: any) => {
              // console.log(item.val());
              // console.log(item.key);
              temp.push(item.val());
              // state.packedTicket.push(item.val());
            });

            resolve(temp); // resolve the promise with the populated temp array
          } else {
            console.log("No data available");
            return [];
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
);

export const getListTickets = createAsyncThunk(
  "list/Ticket",
  async (rejectWithValue) => {
    const dbRef = ref(getDatabase());
    return new Promise((resolve, reject) => {
      get(child(dbRef, `ListTickets`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let temp: any = [];
            snapshot.forEach((item: any) => {
              // console.log(item.val());
              // console.log(item.key);
              temp.push(item.val());
            });

            resolve(temp); // resolve the promise with the populated temp array
          } else {
            console.log("No data available");
            return [];
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
);

const TodoSlice = createSlice({
  name: "TodoTicket",
  initialState,
  reducers: {
    addPackTicket(state, action) {
      // const db = getDatabase();
      // const idK = push(ref(db, "TicketPacked")).key;
      // setTickets({ ...Tickets, id: idK });
      const data = dataref.ref(`TicketPacked`).push();
      data
        .set({
          ...action.payload,
          id: data.key,
        })
        .catch(alert);
    },
    addListTicket(state, action) {
      // const data = dataref.ref(`ListTickets`).push();
      const data = dataref.ref(`ListTickets`).push();

      data
        .set({
          idVe: data.key,
          nameSK: action.payload.nameTickSK,
          dateUsed: "",
          gateCheck: action.payload.gate,
          // idPacked: action.payload.id,
          NamePacke: action.payload.nameTick,
          stateUsed: action.payload.state === false ? "het" : "false1",
          priceVe:
            action.payload.price === ""
              ? action.payload.priceCombo
              : action.payload.price,
              // id: action.payload.id,
              datePublish: action.payload.dataUse,
        })
        .catch(alert);
    },
    updatePackTicket(state, action) {
      dataref
        .ref("TicketPacked/" + action.payload.id)
        .update(action.payload)
        .catch(alert);
    },
    updateDateUseTicket(state, action) {
      dataref
        .ref("ListTickets/" + action.payload.idVe)
        .update(action.payload)
        .catch(alert);
    },
    CheckListTicket(state, action) {
      var today = new Date();
      const dateString = today.toISOString().slice(0, 10);

      dataref
        .ref("ListTickets/" + action.payload.idVe)
        .update({ ...action.payload, stateUsed: "true1", dateUsed: dateString })
        .catch(alert);

        const data: any = state.listTicket.map((item: any) => {
          if (item.idVe === action.payload.idVe) {
            return {
              ...item,
              stateUsed: "true1",
              dateUsed: dateString,
            };
          }
          return item;
        });
        state.listTicket = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPackTicket.pending, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(getPackTicket.fulfilled, (state, action: Action) => {
      if (
        JSON.stringify(state.packedTicket) !== JSON.stringify(action.payload)
      ) {
        state.packedTicket = action.payload;
      }
      // return {
      //   ...state,
      //     packedTicket:action.payload
      // };
      // return { ...state, userLoaded: true };
    });
    builder.addCase(getPackTicket.rejected, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(getListTickets.pending, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(
      getListTickets.fulfilled,
      (state: State, action: Action) => {
        console.log(
          JSON.stringify(state.listTicket) !== JSON.stringify(action.payload)
        );

        if (
          JSON.stringify(state.listTicket) !== JSON.stringify(action.payload)
        ) {
          state.listTicket = action.payload;
        }
      }
    );
    builder.addCase(getListTickets.rejected, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export default TodoSlice;