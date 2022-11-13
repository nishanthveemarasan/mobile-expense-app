import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Colors } from "./constants/colors";
import { FONTS } from "./constants/fonts";
import DebtManagerScreen from "./screens/DebtManagerScreen";
import AddDebtScreen from "./screens/DebtManagerScreen/AddDebtScreen";
import DebtCategoryScreen from "./screens/DebtManagerScreen/DebtCategoryScreen";
import OverAllDebtItemsScreen from "./screens/DebtManagerScreen/OverAllDebtItemsScreen";
import ExpenseManagerScreen from "./screens/ExpenseManagerScreen";
import AddNewCategoryScreen from "./screens/ExpenseManagerScreen/Category/AddNewCategoryScreen";
import AddExpenseItemScreen from "./screens/ExpenseManagerScreen/Dashboard/AddExpenseItemScreen";
import ShowExpenseCategoryScreen from "./screens/ExpenseManagerScreen/Dashboard/ShowExpenseCategoryScreen";
import AddRecurringPaymentScreen from "./screens/ExpenseManagerScreen/Recurring/AddRecurringPaymentScreen";
import ShowRecurringPaymentItemScreen from "./screens/ExpenseManagerScreen/Recurring/ShowRecurringPaymentItemScreen";
import ShowExpenseSummary from "./screens/ExpenseManagerScreen/ShowExpenseSummary";
import ShowOnlyExpenseSummaryScreen from "./screens/ExpenseManagerScreen/Summary/ShowOnlyExpenseSummaryScreen";
import ShowOnlyIncomeSummaryScreen from "./screens/ExpenseManagerScreen/Summary/ShowOnlyIncomeSummaryScreen";
import CategoryExpenseItemsScreen from "./screens/ExpenseManagerScreen/SummaryCategoryWise/CategoryExpenseItemsScreen";
import HomeScreen from "./screens/HomeScreen";
import UpdateExpenseItemScreen from "./screens/ExpenseManagerScreen/SummaryCategoryWise/UpdateExpenseItem/UpdateExpenseItemScreen";
import SavingManagerScreen from "./screens/SavingManagerScreen";
import AddSavingScreen from "./screens/savingsMangerScreen/AddSavingScreen";
import store, { authStoreAction } from "./store/store";
import ShowIncomeExpenseMonthlyGraphScreen from "./screens/ExpenseManagerScreen/Summary/ShowIncomeExpenseMonthlyGraphScreen";
import ShowIncomeExpenseWeeklyGraphScreen from "./screens/ExpenseManagerScreen/Summary/ShowIncomeExpenseWeeklyGraphScreen";
import SignUpScreen from "./screens/Authentication/SignUpScreen";
import LoginScreen from "./screens/Authentication/LoginScreen";
import { useEffect, useState } from "react";
import GeneralSettingScreen from "./screens/GeneralSettingScreen";
import EActivityIndicator from "./UI/EActivityIndicator";
import { getSettingData } from "./store/reducer/auth-reducer";

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryNormal,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "font-arial",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="DebtManagerScreen"
        component={DebtManagerScreen}
        options={{
          title: "Debt Manager",
        }}
      />
      <Stack.Screen
        name="AddRecurringPaymentScreen"
        component={AddRecurringPaymentScreen}
        options={{
          title: "Add Recurring Payment",
        }}
      />
      <Stack.Screen
        name="AddExpenseItemScreen"
        component={AddExpenseItemScreen}
        options={{
          title: "Add Income/Expense",
        }}
      />
      <Stack.Screen
        name="AddNewCategoryScreen"
        component={AddNewCategoryScreen}
        options={{
          title: "Add Main/Add Categories",
        }}
      />
      <Stack.Screen
        name="UpdateExpenseItemScreen"
        component={UpdateExpenseItemScreen}
      />
      <Stack.Screen
        name="ShowExpenseCategoryScreen"
        component={ShowExpenseCategoryScreen}
        options={{
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="CategoryExpenseItemsScreen"
        component={CategoryExpenseItemsScreen}
      />
      <Stack.Screen
        name="ShowExpenseSummaryScreen"
        component={ShowExpenseSummary}
      />
      <Stack.Screen
        name="ShowOnlyExpenseSummaryScreen"
        component={ShowOnlyExpenseSummaryScreen}
      />
      <Stack.Screen
        name="ShowOnlyIncomeSummaryScreen"
        component={ShowOnlyIncomeSummaryScreen}
      />
      <Stack.Screen
        name="ShowIncomeExpenseMonthlyGraphScreen"
        component={ShowIncomeExpenseMonthlyGraphScreen}
      />
      <Stack.Screen
        name="ShowIncomeExpenseWeeklyGraphScreen"
        component={ShowIncomeExpenseWeeklyGraphScreen}
      />
      <Stack.Screen
        name="ShowRecurringPaymentItemScreen"
        component={ShowRecurringPaymentItemScreen}
      />
      <Stack.Screen
        name="SavingMangerScreen"
        component={SavingManagerScreen}
        options={{
          title: "Saving Manager",
        }}
      />
      <Stack.Screen
        name="GeneralSettingScreen"
        component={GeneralSettingScreen}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: Colors.primary1000,
          },
        }}
      />
      <Stack.Screen
        name="ExpenseMangerScreen"
        component={ExpenseManagerScreen}
        options={{
          title: "Expense Manager",
        }}
      />
      <Stack.Screen
        name="DebtCategoryScreen"
        component={DebtCategoryScreen}
        options={{
          title: "Debt Manager",
        }}
      />
      <Stack.Screen
        name="OverrollDebtItemsScreen"
        component={OverAllDebtItemsScreen}
      />
      <Stack.Screen
        name="AddSavingScreen"
        component={AddSavingScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.primaryNormal,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-arial",
          },
        }}
      />
      <Stack.Screen
        name="AddDebtScreen"
        component={AddDebtScreen}
        options={{
          title: "Lend/Borrow Money",
          headerStyle: {
            backgroundColor: Colors.primaryNormal,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-arial",
          },
        }}
      />
    </Stack.Navigator>
  );
};
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryNormal,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "font-arial",
        },
      }}
    >
      <Stack.Screen
        component={LoginScreen}
        name="LoginScreen"
        options={{
          title: "Login to your account",
        }}
      />
      <Stack.Screen
        component={SignUpScreen}
        name="SignUpScreen"
        options={{
          title: "Setup your Account",
        }}
      />
    </Stack.Navigator>
  );
};

const AppContainer = () => {
  const mapStateToProps = (state) => {
    return {
      token: state.authStore.token,
    };
  };
  const state = useSelector(mapStateToProps);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("mobile-expense-nishanth-app");
        if (token) {
          dispatch(authStoreAction.storeAuthToken({ token }));
          dispatch(getSettingData(token));
        }
        setAppIsReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [dispatch, state.token, appIsReady]);

  if (!appIsReady) {
    // return <EActivityIndicator />;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        {state.token && <AdminNavigation />}
        {!state.token && <AuthNavigation />}
      </NavigationContainer>
    </>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
