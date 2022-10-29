import { configureStore } from "@reduxjs/toolkit";
import debtSlice from "./slice/debt-slice";
import expenseSlice from "./slice/expense-slice";
import savingSlice from "./slice/saving-slice";
const store = configureStore({
  reducer: {
    savingStore: savingSlice.reducer,
    debtStore: debtSlice.reducer,
    expenseStore: expenseSlice.reducer,
  },
});

export const savingStoreAction = savingSlice.actions;
export const debtStoreAction = debtSlice.actions;
export const expenseStoreAction = expenseSlice.actions;

export default store;
