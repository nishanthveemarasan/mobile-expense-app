import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
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
import ShowExpenseSummary from "./screens/ExpenseManagerScreen/ShowExpenseSummary";
import ShowOnlyExpenseSummaryScreen from "./screens/ExpenseManagerScreen/Summary/ShowOnlyExpenseSummaryScreen";
import ShowOnlyIncomeSummaryScreen from "./screens/ExpenseManagerScreen/Summary/ShowOnlyIncomeSummaryScreen";
import CategoryExpenseItemsScreen from "./screens/ExpenseManagerScreen/SummaryCategoryWise/CategoryExpenseItemsScreen";
import UpdateExpenseItemScreen from "./screens/ExpenseManagerScreen/UpdateExpenseItem/UpdateExpenseItemScreen";
import SavingManagerScreen from "./screens/SavingManagerScreen";
import AddSavingScreen from "./screens/savingsMangerScreen/AddSavingScreen";
import store from "./store/store";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpenseMangerScreen"
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
              name="DebtManagerScreen"
              component={DebtManagerScreen}
              options={{
                title: "Debt Manager",
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
              name="SavingMangerScreen"
              component={SavingManagerScreen}
              options={{
                title: "Saving Manager",
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
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
