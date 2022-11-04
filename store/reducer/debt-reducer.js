import { Alert } from "react-native";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../helper/axios";
import { debtStoreAction } from "../store";

export const getDebtData = () => {
  return async (dispatch) => {
    try {
      dispatch(debtStoreAction.sendingHttpRequest());
      let response = await getAPI("mobile/debts");
      dispatch(debtStoreAction.setInitialData(response.data.data));
      dispatch(debtStoreAction.getHttpRequest());
    } catch (error) {
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};

export const addNewDebt = (data, navigation) => {
  return async (dispatch) => {
    try {
      let response = await postAPI("mobile/debts/store", data);
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
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};

export const updateDebt = (data, navigation) => {
  return async (dispatch) => {
    try {
      const uuid = data.formData.uuid;
      let response = await patchAPI(`mobile/debts/${uuid}/update`, data);
      dispatch(debtStoreAction.createDebt(data));
      dispatch(debtStoreAction.updateDebtData(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
    } catch (error) {
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};

export const deleteDebt = (data, navigation) => {
  return async (dispatch) => {
    try {
      const uuid = data.formData.uuid;
      let response = await deleteAPI(`mobile/debts/${uuid}/delete`);
      dispatch(debtStoreAction.deleteDebtItem(data));
      dispatch(debtStoreAction.deleteDebtDataArray(data));
      if (data.action == "lend") {
        navigation.navigate("GiveDebtScreen");
      } else {
        navigation.navigate("GetDebtScreen");
      }
    } catch (error) {
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};
