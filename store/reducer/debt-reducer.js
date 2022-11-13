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
import { debtStoreAction } from "../store";

export const getDebtData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(debtStoreAction.sendingHttpRequest());
      let response = await sendGetAdminApi("mobile/debts", token);
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(debtStoreAction.setInitialData(response.data.data));
    } catch (error) {
      showError(error.response.data);
    }
    dispatch(debtStoreAction.getHttpRequest());
  };
};

export const addNewDebt = (data, navigation, token) => {
  return async (dispatch) => {
    try {
      let response = await sendPostAdminApi("mobile/debts/store", data, token);
      if (response.data.error) {
        showError(error.response.data);
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
      showError(error.response.data);
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
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(debtStoreAction.createDebt(data));
      dispatch(debtStoreAction.updateDebtData(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
    } catch (error) {
      showError(error.response.data);
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
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(debtStoreAction.deleteDebtItem(data));
      dispatch(debtStoreAction.deleteDebtDataArray(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
    } catch (error) {
      showError(error.response.data);
    }
  };
};
