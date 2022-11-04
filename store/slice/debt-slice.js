import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDebtDataArray,
  toLower,
  updateDebtDataArray,
} from "../../helper/helper";

const initialState = {
  names: [],
  lendData: [],
  borrowData: [],
  debtData: [],
  loaded: false,
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {
    sendingHttpRequest(state) {
      state.loaded = false;
    },
    getHttpRequest(state) {
      state.loaded = true;
    },
    setInitialData(state, action) {
      state.names = action.payload.names;
      state.borrowData = action.payload.borrowData;
      state.lendData = action.payload.lendData;
      state.debtData = action.payload.debtData;
      state.appToken = action.payload.token;
    },
    createDebt(state, action) {
      if (action.payload.action == "lend") {
        const copyArray = state.lendData.slice();
        if (action.payload.update) {
          const arrayElement = action.payload.formData;
          let subIndex = copyArray.findIndex(
            (el) => el.uuid == action.payload.formData.uuid
          );
          copyArray[subIndex] = arrayElement;
        } else {
          copyArray.unshift(action.payload.formData);
          const copyNames = state.names.slice();
          const exists = copyNames.find(
            (element) =>
              element.value.toLowerCase() ==
              action.payload.formData.name.toLowerCase()
          );
          if (!exists) {
            const name = action.payload.formData.name;
            copyNames.unshift({ value: name, label: name });
            state.names = copyNames;
          }
        }
        state.lendData = [...copyArray];
      } else {
        const copyArray = state.borrowData.slice();
        if (action.payload.update) {
          const arrayElement = action.payload.formData;
          let subIndex = copyArray.findIndex(
            (el) => el.uuid == action.payload.formData.uuid
          );
          copyArray[subIndex] = arrayElement;
        } else {
          copyArray.unshift(action.payload.formData);
          const copyNames = state.names.slice();
          const exists = copyNames.find(
            (element) =>
              element.value.toLowerCase() ==
              action.payload.formData.name.toLowerCase()
          );
          if (!exists) {
            const name = action.payload.formData.name;
            copyNames.unshift({ value: name, label: name });
            state.names = copyNames;
          }
        }
        state.borrowData = [...copyArray];
      }
    },
    updateDebtData(state, action) {
      const formData = action.payload.formData;
      const copyArray = [...state.debtData];
      let index = copyArray.findIndex(
        (el) => toLower(el.name) == toLower(formData.name)
      );
      if (copyArray[index]) {
        const array = updateDebtDataArray(state.debtData, index, formData);
        state.debtData = [...array];
      } else {
        const data = {
          uuid: formData.uuid,
          name: formData.name,
          debts: [formData],
          lendTotal: formData.type == "lend" ? formData.amount : 0,
          borrowTotal: formData.type != "lend" ? formData.amount : 0,
        };
        copyArray.unshift(data);
        state.debtData = [...copyArray];
      }
    },
    deleteDebtItem(state, action) {
      if (action.payload.action == "lend") {
        const copyArray = state.lendData.slice();
        let subIndex = copyArray.findIndex(
          (el) => el.uuid == action.payload.formData.uuid
        );
        copyArray.splice(subIndex, 1);
        state.lendData = [...copyArray];
      } else {
        const copyArray = state.borrowData.slice();
        let subIndex = copyArray.findIndex(
          (el) => el.uuid == action.payload.formData.uuid
        );
        copyArray.splice(subIndex, 1);
        state.borrowData = [...copyArray];
      }
    },
    deleteDebtDataArray(state, action) {
      const formData = action.payload.formData;
      const copyArray = [...state.debtData];
      let index = copyArray.findIndex(
        (el) => toLower(el.name) == toLower(formData.name)
      );
      const array = deleteDebtDataArray(state.debtData, index, formData);
      state.debtData = [...array];
    },
  },
});
export default debtSlice;
