import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
  CLIENT_CREDENTIAL_ID,
  CLIENT_SECRET,
  postAPI,
  sendGetAdminApi,
  sendPostAdminApi,
} from "../../helper/axios";
import { showError, showOutput } from "../../helper/error";
import { getToken, removeToken, storeToken } from "../../helper/token";
import { authStoreAction } from "../store";

export const getCLientCredential = () => {
  return async (dispatch) => {
    try {
      const data = {
        grant_type: "client_credentials",
        client_id: CLIENT_CREDENTIAL_ID,
        client_secret: CLIENT_SECRET,
      };
      const token = await AsyncStorage.getItem(
        "client-credentials-nishanth-mobile-app"
      );
      if (!token) {
        const response = await postAPI("/oauth/token", data);
        if (response.data && response.data.error) {
          Alert.alert("Action Failed!", response.data.error);
          return false;
        }
        const token = response.data.access_token;
        storeToken(token, "client-credentials-nishanth-mobile-app");
      }
    } catch (error) {
      showError(error.response.data, "Registration failed");
    }
    // dispatch(authStoreAction.getHttpRequest());
  };
};
export const requestVarificationCode = (data) => {
  return async (dispatch) => {
    dispatch(authStoreAction.hideCodeForm());
    dispatch(
      authStoreAction.updateLoading({
        type: "requestCodeLoaded",
        value: true,
      })
    );
    try {
      dispatch(getCLientCredential());
      const token = await AsyncStorage.getItem(
        "client-credentials-nishanth-mobile-app"
      );
      if (token) {
        const response = await sendPostAdminApi(
          "/client/forget-password/store/email",
          data,
          token
        );
        if (response.data && response.data.error) {
          Alert.alert("Action Failed!", response.data.error);
          dispatch(
            authStoreAction.updateLoading({
              type: "requestCodeLoaded",
              value: false,
            })
          );
          return false;
        }
        showOutput(response.data.data.message);
        dispatch(authStoreAction.showCodeForm());
        dispatch(
          authStoreAction.updateLoading({
            type: "requestCodeLoaded",
            value: false,
          })
        );
      }
    } catch (error) {
      dispatch(
        authStoreAction.updateLoading({
          type: "requestCodeLoaded",
          value: false,
        })
      );
      showError(error.response.data, "Verification failed");
      return false;
    }
  };
};

export const verifyVarificationCode = (data, navigation) => {
  return async (dispatch) => {
    dispatch(
      authStoreAction.updateLoading({
        type: "verificationCodeLoaded",
        value: true,
      })
    );
    try {
      dispatch(getCLientCredential());
      const token = await AsyncStorage.getItem(
        "client-credentials-nishanth-mobile-app"
      );
      if (token) {
        const response = await sendPostAdminApi(
          "client/forget-password/reset/password/check",
          data,
          token
        );
        if (response.data && response.data.error) {
          Alert.alert("Varification Failed!", response.data.error);
          dispatch(
            authStoreAction.updateLoading({
              type: "verificationCodeLoaded",
              value: false,
            })
          );
          return false;
        }
        showOutput("Code has been verified successfully!!");
        dispatch(
          authStoreAction.updateResetEmail({
            email: response.data.data.email,
          })
        );
        dispatch(
          authStoreAction.updateLoading({
            type: "verificationCodeLoaded",
            value: false,
          })
        );
        navigation.replace("ResetPasswordScreen");
      }
    } catch (error) {
      dispatch(
        authStoreAction.updateLoading({
          type: "verificationCodeLoaded",
          value: false,
        })
      );
      showError(error.response.data, "Verification failed");
      return false;
    }
  };
};

export const resetPassword = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(
        authStoreAction.updateLoading({
          type: "resetPasswordLoaded",
          value: true,
        })
      );
      dispatch(getCLientCredential());
      const token = await AsyncStorage.getItem(
        "client-credentials-nishanth-mobile-app"
      );
      if (token) {
        const response = await sendPostAdminApi(
          "client/forget-password/reset/password/update",
          data,
          token
        );
        if (response.data && response.data.error) {
          Alert.alert("Action Failed!", response.data.error);
          dispatch(
            authStoreAction.updateLoading({
              type: "resetPasswordLoaded",
              value: false,
            })
          );
          return false;
        }
        showOutput(
          "Your Password has been Reset Successfully!!",
          "Verification successfull"
        );
        dispatch(
          authStoreAction.updateLoading({
            type: "resetPasswordLoaded",
            value: false,
          })
        );
        navigation.replace("LoginScreen");
      }
      // navigation.replace("LoginScreen");
    } catch (error) {
      showError(error.response.data, "Verification failed");
    }
  };
};

export const registerUser = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(
        authStoreAction.updateLoading({
          type: "registerLoaded",
          value: true,
        })
      );
      const response = await postAPI("/api/register", data);
      const token = response.data.token;
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(
          authStoreAction.updateLoading({
            type: "registerLoaded",
            value: false,
          })
        );
        return false;
      }

      storeToken(response.data.token, "mobile-expense-nishanth-app");
      dispatch(
        authStoreAction.updateLoading({
          type: "registerLoaded",
          value: false,
        })
      );
      dispatch(authStoreAction.storeAuthToken({ token }));
    } catch (error) {
      dispatch(
        authStoreAction.updateLoading({
          type: "registerLoaded",
          value: false,
        })
      );
      showError(error.response.data, "Registration failed");
      return false;
    }
  };
};
export const authenticateUser = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(
        authStoreAction.updateLoading({
          type: "loginLoaded",
          value: true,
        })
      );
      const response = await postAPI("/api/auth", data);
      storeToken(response.data.token, "mobile-expense-nishanth-app");
      const token = response.data.token;
      dispatch(
        authStoreAction.updateLoading({
          type: "loginLoaded",
          value: false,
        })
      );
      dispatch(authStoreAction.storeAuthToken({ token }));
    } catch (error) {
      dispatch(
        authStoreAction.updateLoading({
          type: "loginLoaded",
          value: false,
        })
      );
      showError(error.response.data, "Login Failed!!");
      return false;
    }
  };
};
export const getSettingData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(
        authStoreAction.updateLoading({
          type: "initialDataLoaded",
          value: true,
        })
      );
      const response = await sendGetAdminApi("mobile/settings/get", token);
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(
          authStoreAction.updateLoading({
            type: "initialDataLoaded",
            value: false,
          })
        );
        return false;
      }
      dispatch(authStoreAction.setInitialSetting(response.data.data));
      dispatch(
        authStoreAction.updateLoading({
          type: "initialDataLoaded",
          value: false,
        })
      );
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(
          authStoreAction.updateLoading({
            type: "initialDataLoaded",
            value: false,
          })
        );
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      } else {
        dispatch(
          authStoreAction.updateLoading({
            type: "initialDataLoaded",
            value: false,
          })
        );
        showError(error.response.data);
        return false;
      }
    }
  };
};

export const storeSettingData = (data, token) => {
  return async (dispatch) => {
    try {
      dispatch(authStoreAction.sendingHttpActionRequest());
      const response = await sendPostAdminApi(
        "mobile/settings/store",
        data,
        token
      );
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(authStoreAction.getHttpActionRequest());
        return false;
      }
      dispatch(authStoreAction.updateGeneralSetting(response.data.data));
      dispatch(authStoreAction.getHttpActionRequest());
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(authStoreAction.storeAuthToken({ token: null }));
        dispatch(authStoreAction.getHttpActionRequest());
        removeToken();
      }
      dispatch(authStoreAction.getHttpActionRequest());
      showError(error.response.data);
      return false;
    }
  };
};

export const logout = (token, navigation) => {
  return async (dispatch) => {
    removeToken();
    try {
      dispatch(
        authStoreAction.updateLoading({
          type: "logoutLoaded",
          value: true,
        })
      );
      const response = await sendGetAdminApi("mobile/logout", token);
      if (response.data && response.data.error) {
        Alert.alert("Action Failed!", response.data.error);
        dispatch(
          authStoreAction.updateLoading({
            type: "logoutLoaded",
            value: false,
          })
        );
        return false;
      }
      dispatch(authStoreAction.storeAuthToken({ token: null }));
      dispatch(authStoreAction.resetData());
      dispatch(
        authStoreAction.updateLoading({
          type: "logoutLoaded",
          value: false,
        })
      );
      dispatch(authStoreAction.storeAuthToken({ token: null }));
    } catch (error) {
      if (error.response.status == 401) {
        removeToken();
        dispatch(
          authStoreAction.updateLoading({
            type: "logoutLoaded",
            value: false,
          })
        );
        dispatch(authStoreAction.storeAuthToken({ token: null }));
      }
      dispatch(
        authStoreAction.updateLoading({
          type: "logoutLoaded",
          value: false,
        })
      );
      showError(error.response.data);
      return false;
    }
  };
};
