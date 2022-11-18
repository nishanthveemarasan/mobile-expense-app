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
import { removeToken } from "../../helper/token";
import { authStoreAction, debtStoreAction } from "../store";

export const getDebtData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(debtStoreAction.sendingHttpRequest());
      let response = await sendGetAdminApi("mobile/debts", token);
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(debtStoreAction.getHttpRequest());
        return false;
      }
      dispatch(debtStoreAction.setInitialData(response.data.data));
      dispatch(debtStoreAction.getHttpRequest());
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      showError(error.response.data);
      dispatch(debtStoreAction.getHttpRequest());
      return false;
    }
  };
};

export const addNewDebt = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPostAdminApi("mobile/debts/store", data, token);
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      const uuid = response.data.data;
      const newData = {
        ...data,
        formData: {
          ...data.formData,
          uuid,
        },
      };
      dispatch(debtStoreAction.createDebt(newData));
      dispatch(debtStoreAction.updateDebtData(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
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

export const updateDebt = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      const uuid = data.formData.uuid;
      let response = await sendPatchAdminApi(
        `mobile/debts/${uuid}/update`,
        data,
        token
      );
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      dispatch(debtStoreAction.createDebt(data));
      dispatch(debtStoreAction.updateDebtData(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
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

export const deleteDebt = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      const uuid = data.formData.uuid;
      let response = await sendDeleteAdminApi(
        `mobile/debts/${uuid}/delete`,
        token
      );
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        return false;
      }
      dispatch(debtStoreAction.deleteDebtItem(data));
      dispatch(debtStoreAction.deleteDebtDataArray(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
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
