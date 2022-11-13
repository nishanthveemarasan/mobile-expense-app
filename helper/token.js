import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("mobile-expense-nishanth-app", token);
  } catch (e) {
    // saving error
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("mobile-expense-nishanth-app");
  } catch (e) {
    // saving error
  }
};
