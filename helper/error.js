import { Alert } from "react-native";

export const showError = (error, action = "Action Failed!") => {
  let errMsg = error.message;
  if (error.errors) {
    for (let key in error.errors) {
      errMsg = error.errors[key][0];
      break;
    }
  }
  Alert.alert(action, errMsg);
};
