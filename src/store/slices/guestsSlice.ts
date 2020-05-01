import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api";
import { Guest } from "../../utils/customTypes";

let initialState = {
  items: [] as Guest[],
};

const guestsSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    storeGuests(state, action: PayloadAction<Guest[]>) {
      state.items = action.payload;
    },
  },
});

export const { storeGuests } = guestsSlice.actions;

export default guestsSlice.reducer;

export const fetchAll = (path: string) => (dispatch: any) => {
  api.fetchAll(path).then((items: Guest[]) => {
    dispatch(storeGuests(items));
  });
};
