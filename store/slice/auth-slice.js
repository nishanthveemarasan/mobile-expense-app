import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loaded: false,
  loginLoaded: false,
  registerLoaded: false,
  initialDataLoaded: false,
  logoutLoaded: false,
  dataLoaded: false,
  token: null,
  userName: "",
  currency: {
    code: "USD",
    symbol: "£",
    locale: "en-US",
  },
  currencyList: [],
  localeList: [],
  showCodeForm: false,
  requestCodeLoaded: false,
  verificationCodeLoaded: false,
  resetPasswordLoaded: false,
  resetEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateResetEmail(state, action) {
      state.resetEmail = action.payload.email;
    },
    showCodeForm(state) {
      state.showCodeForm = true;
    },
    hideCodeForm(state) {
      state.showCodeForm = false;
    },
    updateLoading(state, action) {
      let type = action.payload.type;
      let value = action.payload.value;
      state[type] = value;
    },
    sendingHttpRequest(state) {
      state.loaded = true;
    },
    getHttpRequest(state) {
      state.loaded = false;
    },
    sendingHttpActionRequest(state) {
      state.dataLoaded = true;
    },
    getHttpActionRequest(state) {
      state.dataLoaded = false;
    },
    storeAuthToken(state, action) {
      state.token = action.payload.token;
    },
    setInitialSetting(state, action) {
      state.currencyList = action.payload.currencyList;
      state.localeList = action.payload.localeList;
      if (action.payload.savedData) {
        let data = action.payload.savedData;
        state.currency = {
          code: data.currency_code,
          symbol: data.currency_symbol,
          locale: data.locale_code,
        };
        state.userName = data.name;
      }
    },
    updateGeneralSetting(state, action) {
      state.currency = {
        code: action.payload.currency.code,
        symbol: action.payload.currency.symbol,
        locale: action.payload.currency.locale_code,
      };
      state.userName = action.payload.name;
    },
    resetData(state) {
      state.currency = {
        code: "USD",
        symbol: "£",
        locale: "en-US",
      };
      state.userName = "";
    },
  },
});
export default authSlice;
