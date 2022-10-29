import { Alert } from "react-native";
import { API, getAPI, patchAPI, postAPI } from "../../helper/axios";
import { getSummaryMonthlyWise } from "../../helper/helper";
import { savingStoreAction } from "../store";

export const getSavingData = () => {
  return async (dispatch) => {
    try {
      let response = await getAPI("savings");
      dispatch(savingStoreAction.sendingHttpRequest());
      dispatch(savingStoreAction.initialSavingsData(response.data));
      dispatch(savingStoreAction.getHttpRequest());
      getSummaryMonthlyWise(response.data.data);
    } catch (error) {}
  };
};

export const addNewSaving = (data, navigation) => {
  return async (dispatch) => {
    try {
      let response = await postAPI("savings/store", data);
      dispatch(savingStoreAction.addSavingData(response.data));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};

export const deleteSaving = (uuid, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(savingStoreAction.deleteSavingData({ uuid }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};

export const updateSaving = (data, navigation) => {
  return async (dispatch) => {
    try {
      let response = await patchAPI(`savings/${data.uuid}/update`, data);
      console.log(response);
      dispatch(savingStoreAction.updateSavingData({ data }));
      navigation.navigate("TransactionHistory");
    } catch (error) {
      console.log(error);
      let msg = error.response.data.message;
      Alert.alert("Action Failed!", msg);
    }
  };
};
