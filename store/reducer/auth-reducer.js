import { postAPI, sendGetAdminApi, sendPostAdminApi } from "../../helper/axios";
import { showError } from "../../helper/error";
import { getToken, removeToken, storeToken } from "../../helper/token";
import { authStoreAction } from "../store";

export const registerUser = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(authStoreAction.sendingHttpRequest());
      const response = await postAPI("/register", data);
      const token = response.data.token;
      if (response.data.error) {
        showError(response.data.error);
      }

      storeToken(response.data.token);
      dispatch(authStoreAction.storeAuthToken({ token }));
    } catch (error) {
      showError(error.response.data, "Registration failed");
    }
    dispatch(authStoreAction.getHttpRequest());
  };
};
export const authenticateUser = (data, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(authStoreAction.sendingHttpRequest());
      const response = await postAPI("/auth", data);
      storeToken(response.data.token);
      const token = response.data.token;

      dispatch(authStoreAction.storeAuthToken({ token }));
      dispatch(authStoreAction.getHttpRequest());
    } catch (error) {
      dispatch(authStoreAction.getHttpRequest());
      showError(error.response.data, "Login Failed!!");
    }
  };
};
export const getSettingData = (token) => {
  return async (dispatch) => {
    try {
      dispatch(authStoreAction.sendingHttpRequest());
      const response = await sendGetAdminApi("mobile/settings/get", token);
      console.log(response.data.data);
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(authStoreAction.setInitialSetting(response.data.data));
      dispatch(authStoreAction.getHttpRequest());
    } catch (error) {
      dispatch(authStoreAction.getHttpRequest());
      showError(error.response.data);
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
      if (response.data.error) {
        showError(error.response.data);
      }
      dispatch(authStoreAction.updateGeneralSetting(response.data.data));
      dispatch(authStoreAction.getHttpActionRequest());
    } catch (error) {
      dispatch(authStoreAction.getHttpActionRequest());
      showError(error.response.data);
    }
  };
};

export const logout = (token, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(authStoreAction.sendingHttpActionRequest());
      // const response = await sendGetAdminApi("mobile/logout", token);
      // if (response.data.error) {
      //   showError(error.response.data);
      // }
      removeToken();
      dispatch(authStoreAction.storeAuthToken({ token: null }));
      dispatch(authStoreAction.resetData());
      dispatch(authStoreAction.getHttpActionRequest());
      // navigation.navigate("AuthNavigation", { screen: "LoginScreen" });
    } catch (error) {
      dispatch(authStoreAction.getHttpActionRequest());
      showError(error.response.data);
    }
  };
};
