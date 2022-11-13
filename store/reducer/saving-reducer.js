import { Alert } from "react-native";
import {
  API,
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
import { getSummaryMonthlyWise } from "../../helper/helper";
import { savingStoreAction } from "../store";

export const getSavingData = (token) => {
  return async (dispatch) => {
    try {
      let response = await sendGetAdminApi("mobile/savings", token);
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(savingStoreAction.sendingHttpRequest());
      dispatch(savingStoreAction.initialSavingsData(response.data));
      dispatch(savingStoreAction.getHttpRequest());
      getSummaryMonthlyWise(response.data.data);
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const addNewSaving = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPostAdminApi(
        "mobile/savings/store",
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(savingStoreAction.addSavingData(response.data));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const deleteSaving = (uuid, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendDeleteAdminApi(
        `mobile/savings/${uuid}/delete`,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(savingStoreAction.deleteSavingData({ uuid }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      showError(error.response.data);
    }
  };
};

export const updateSaving = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPatchAdminApi(
        `mobile/savings/${data.uuid}/update`,
        data,
        token
      );
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(savingStoreAction.updateSavingData({ data }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      showError(error.response.data);
    }
  };
};
