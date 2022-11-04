import { Alert } from "react-native";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../helper/axios";
import { showError } from "../../helper/error";
import { expenseStoreAction } from "../store";

export const getInitialExpenseData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(expenseStoreAction.sendingHttpRequest());
      const response = await getAPI("mobile/expenses/");
      dispatch(expenseStoreAction.initialExpenseData(response.data.data));
      dispatch(expenseStoreAction.calculateSummary());
      dispatch(expenseStoreAction.getHttpRequest());
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addNewExpense = (data, navigation) => {
  return async (dispatch) => {
    try {
      // console.log(data);
      // let response = await postAPI("mobile/expenses/store", data);
      console.log("insert data");
      console.log(data.expense);
      dispatch(
        expenseStoreAction.savePayment({
          data: data.expense,
        })
      );
      navigation.navigate("ExpenseDashboard");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addNewCategory = (data, navigation, action) => {
  return async (dispatch) => {
    try {
      let response = await postAPI("mobile/expenses/category/store", data);
      dispatch(
        expenseStoreAction.addNewCategory({ category: response.data.data })
      );
      navigation.navigate("ShowExpenseCategoryScreen");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const deleteExepenseItem = (data, navigation) => {
  return async (dispatch) => {
    try {
      let response = await deleteAPI(`mobile/expenses/${data.uuid}/delete`);
      dispatch(expenseStoreAction.removeExpenseSummaryAndData({ data }));
      navigation.goBack();
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const updateExepenseItem = (data, navigation) => {
  return async (dispatch) => {
    try {
      const response = await patchAPI(
        `mobile/expenses/${data.uuid}/update`,
        data
      );
      dispatch(expenseStoreAction.updateExpenseSummaryAndData({ data }));
      navigation.goBack();
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addRecurringItem = (data, navigation) => {
  return async (dispatch) => {
    try {
      let response = await postAPI("mobile/recurring/store", data);
      dispatch(expenseStoreAction.updateRecurringData(response.data.data));
      dispatch(expenseStoreAction.clearRecurringData());
      navigation.navigate("ExpenseRecurring");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const updateRecurringFormDataForUpdate = (navigation) => {
  return async (dispatch) => {
    try {
      dispatch(expenseStoreAction.setRecurringFormDataForUpdate());
      navigation.navigate("AddRecurringPaymentScreen", { action: "edit" });
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const updateRecurringPaymentItem = (data, navigation) => {
  return async (dispatch) => {
    try {
      const response = await patchAPI(`mobile/recurring/${data.uuid}`, data);
      dispatch(expenseStoreAction.updateExistingRecurringData(response.data));
      dispatch(expenseStoreAction.clearRecurringData());
      navigation.navigate("ExpenseRecurring");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const deleteRecurringPaymentItem = (data, navigation) => {
  return async (dispatch) => {
    try {
      const response = await patchAPI(
        `mobile/recurring/${data.uuid}/stop`,
        data
      );
      console.log(response);
      dispatch(expenseStoreAction.deleteExistingRecurringData({ data }));
      dispatch(expenseStoreAction.clearRecurringData());
      navigation.navigate("ExpenseRecurring");
    } catch (error) {
      showError(error.response.data);
    }
  };
};
