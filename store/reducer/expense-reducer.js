import { getAPI } from "../../helper/axios";
import { expenseStoreAction } from "../store";

export const getInitialExpenseData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(expenseStoreAction.sendingHttpRequest());
      const response = await getAPI("mobile/expenses/");
      dispatch(expenseStoreAction.initialExpenseData(response.data.data));
      dispatch(expenseStoreAction.calculateSummary());
      dispatch(expenseStoreAction.getHttpRequest());
    } catch (error) {}
  };
};

export const addNewExpense = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(
        expenseStoreAction.savePayment({
          data,
        })
      );
      navigation.navigate("ExpenseDashboard");
    } catch (error) {}
  };
};

export const addNewCategory = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(expenseStoreAction.addNewCategory({ category: data }));
      navigation.navigate("ShowExpenseCategoryScreen");
    } catch (error) {}
  };
};

export const deleteExepenseItem = (data, navigation) => {
  return async (dispatch) => {
    dispatch(expenseStoreAction.removeExpenseSummaryAndData({ data }));
    navigation.goBack();
  };
};

export const updateExepenseItem = (data, navigation) => {
  return async (dispatch) => {
    dispatch(expenseStoreAction.updateExpenseSummaryAndData({ data }));
    navigation.goBack();
  };
};
