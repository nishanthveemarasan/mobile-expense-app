import { Alert } from "react-native";
import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  sendDeleteAdminApi,
  sendGetAdminApi,
  sendPatchAdminApi,
  sendPostAdminApi,
} from "../../helper/axios";
import { showError } from "../../helper/error";
import { expenseStoreAction } from "../store";

export const getInitialExpenseData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(expenseStoreAction.sendingHttpRequest());
      const response = await sendGetAdminApi("mobile/expenses/", token);
      dispatch(expenseStoreAction.initialExpenseData(response.data.data));
      dispatch(expenseStoreAction.calculateSummary());
      dispatch(expenseStoreAction.getHttpRequest());
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addNewExpense = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      // console.log(data);
      let response = await sendPostAdminApi(
        "mobile/expenses/store",
        data,
        token
      );
      // console.log(response.data.data);
      dispatch(
        expenseStoreAction.savePayment({
          data: response.data.data,
        })
      );
      navigation.navigate("ExpenseDashboard");
    } catch (error) {
      console.log(error);
      showError(error.response.data);
    }
  };
};

export const addNewCategory = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPostAdminApi(
        "mobile/expenses/category/store",
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(
        expenseStoreAction.addNewCategory({ category: response.data.data })
      );
      navigation.navigate("ShowExpenseCategoryScreen");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const deleteExepenseItem = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendDeleteAdminApi(
        `mobile/expenses/${data.uuid}/delete`,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(expenseStoreAction.removeExpenseSummaryAndData({ data }));
      navigation.goBack();
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const updateExepenseItem = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      const response = await sendPatchAdminApi(
        `mobile/expenses/${data.uuid}/update`,
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(expenseStoreAction.updateExpenseSummaryAndData({ data }));
      navigation.goBack();
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addRecurringItem = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPostAdminApi(
        "mobile/recurring/store",
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
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

export const updateRecurringPaymentItem = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      const response = await sendPatchAdminApi(
        `mobile/recurring/${data.uuid}`,
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(expenseStoreAction.updateExistingRecurringData(response.data));
      dispatch(expenseStoreAction.clearRecurringData());
      navigation.navigate("ExpenseRecurring");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const deleteRecurringPaymentItem = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      const response = await sendPatchAdminApi(
        `mobile/recurring/${data.uuid}/stop`,
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(expenseStoreAction.deleteExistingRecurringData({ data }));
      dispatch(expenseStoreAction.clearRecurringData());
      navigation.navigate("ExpenseRecurring");
    } catch (error) {
      showError(error.response.data);
    }
  };
};
