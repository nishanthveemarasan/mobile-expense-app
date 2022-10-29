import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDebtDataArray,
  toLower,
  updateDebtDataArray,
} from "../../helper/helper";

const initialState = {
  names: [
    { value: "Nishanth", label: "Nishanth" },
    { value: "Veemarasan", label: "Veemarasan" },
  ],
  lendData: [
    {
      uuid: "97937726-f57e-4dd9-91dd-904b0c09dc13",
      name: "Nishanh",
      amount: 123,
      type: "lend",
      description: "Sdad",
      date: "2022-04-04T00:00:00.000000Z",
    },
  ],
  borrowData: [
    {
      uuid: "97937c9e-f645-4bf8-9cfe-4076964d512b",
      name: "Nishanh",
      amount: 23,
      type: "borrow",
      description: "Sdad",
      date: "2022-04-04T00:00:00.000000Z",
    },
    {
      uuid: "97937cf4-ad5d-4bed-864a-2efa49b92292",
      name: "Nishanh",
      amount: 23,
      type: "borrow",
      description: "Sdad",
      date: "2022-04-04T00:00:00.000000Z",
    },
  ],
  debtData: [
    {
      uuid: "97937726-ed55-42c4-897f-3fefbc13d31f",
      name: "Nishanh",
      lendTotal: 123,
      borrowTotal: 46,
      debts: [
        {
          uuid: "97937726-f57e-4dd9-91dd-904b0c09dc13",
          type: "lend",
          amount: 123,
          description: "Sdad",
          date: "2022-04-04T00:00:00.000000Z",
        },
        {
          uuid: "97937c9e-f645-4bf8-9cfe-4076964d512b",
          type: "borrow",
          amount: 23,
          description: "Sdad",
          date: "2022-04-04T00:00:00.000000Z",
        },
        {
          uuid: "97937cf4-ad5d-4bed-864a-2efa49b92292",
          type: "borrow",
          amount: 23,
          description: "Sdad",
          date: "2022-04-04T00:00:00.000000Z",
        },
      ],
    },
  ],
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {
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
