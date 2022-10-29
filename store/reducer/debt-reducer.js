import { debtStoreAction } from "../store";

export const addNewDebt = (data, navigation) => {
  return async (dispatch) => {
    console.log(data);
    dispatch(debtStoreAction.createDebt(data));
    dispatch(debtStoreAction.updateDebtData(data));
    if (data.action == "lend") {
      navigation.navigate("GiveDebtScreen");
    } else {
      navigation.navigate("GetDebtScreen");
    }
  };
};

export const updateDebt = (data, navigation) => {
  return async (dispatch) => {
    dispatch(debtStoreAction.createDebt(data));
    dispatch(debtStoreAction.updateDebtData(data));
    if (data.action == "lend") {
      navigation.navigate("GiveDebtScreen");
    } else {
      navigation.navigate("GetDebtScreen");
    }
  };
};

export const deleteDebt = (data, navigation) => {
  return async (dispatch) => {
    dispatch(debtStoreAction.deleteDebtItem(data));
    dispatch(debtStoreAction.deleteDebtDataArray(data));
    if (data.action == "lend") {
      navigation.navigate("GiveDebtScreen");
    } else {
      navigation.navigate("GetDebtScreen");
    }
  };
};
