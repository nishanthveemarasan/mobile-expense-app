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
import { authStoreAction, savingStoreAction } from "../store";

export const getSavingData = (token) => {
  return async (dispatch) => {
    try {
      let response = await sendGetAdminApi("mobile/savings", token);
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(savingStoreAction.getHttpRequest());
        return false;
      }
      dispatch(savingStoreAction.sendingHttpRequest());
      dispatch(savingStoreAction.initialSavingsData(response.data));
      getSummaryMonthlyWise(response.data.data);
      dispatch(savingStoreAction.getHttpRequest());
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      showError(error.response.data);
      dispatch(savingStoreAction.getHttpRequest());
      return false;
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
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      dispatch(savingStoreAction.addSavingData(response.data));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      showError(error.response.data);
      return false;
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
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      dispatch(savingStoreAction.deleteSavingData({ uuid }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      showError(error.response.data);
      return false;
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
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      dispatch(savingStoreAction.updateSavingData({ data }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      showError(error.response.data);
      return false;
    }
  };
};
