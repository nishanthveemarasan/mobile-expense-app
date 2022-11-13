import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import debtSlice from "./slice/debt-slice";
import expenseSlice from "./slice/expense-slice";
import savingSlice from "./slice/saving-slice";
const store = configureStore({
  reducer: {
    savingStore: savingSlice.reducer,
    debtStore: debtSlice.reducer,
    expenseStore: expenseSlice.reducer,
    authStore: authSlice.reducer,
  },
});

export const savingStoreAction = savingSlice.actions;
export const debtStoreAction = debtSlice.actions;
export const expenseStoreAction = expenseSlice.actions;
export const authStoreAction = authSlice.actions;

export default store;
