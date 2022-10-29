import { createSlice } from "@reduxjs/toolkit";
import { findIndex, getTotalWithYear } from "../../helper/helper";
const initialState = {
  data: [],
  savingTotal: 0,
  years: [],
  loaded: false,
};
const savingSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    sendingHttpRequest(state) {
      state.loaded = false;
    },
    getHttpRequest(state) {
      state.loaded = true;
    },
    addSavingData(state, action) {
      const copyArray = state.data.slice();
      copyArray.unshift(action.payload.data);

      const summary = getTotalWithYear(copyArray, "amount");
      state.savingTotal = summary.total;
      state.years = summary.year;
      state.data = [...copyArray];
    },
    initialSavingsData(state, action) {
      const data = action.payload.data;
      const summary = getTotalWithYear(data, "amount");

      state.savingTotal = summary.total;
      state.years = summary.year;
      state.data = data;
    },
    deleteSavingData(state, action) {
      const uuid = action.payload.uuid;
      let index = state.data.findIndex((transction) => transction.uuid == uuid);
      const copyData = [...state.data];
      copyData.splice(index, 1);

      const summary = getTotalWithYear(copyData, "amount");
      state.savingTotal = summary.total;
      state.years = summary.year;
      state.data = [...copyData];
    },
    updateSavingData(state, action) {
      const copyData = [...state.data];
      const data = action.payload.data;
      const index = findIndex(copyData, "uuid", data.uuid);
      copyData[index] = data;

      const summary = getTotalWithYear(copyData, "amount");
      state.savingTotal = summary.total;
      state.years = summary.year;
      state.data = [...copyData];
    },
  },
});

export default savingSlice;
