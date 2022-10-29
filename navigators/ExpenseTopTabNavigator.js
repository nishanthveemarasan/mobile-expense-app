import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../constants/colors";
import ExpenseDashboard from "../screens/ExpenseManagerScreen/ExpenseDashboard";
import ExpenseRecurring from "../screens/ExpenseManagerScreen/ExpenseRecurring";
import ExpenseSummary from "../screens/ExpenseManagerScreen/ExpenseSummary";

const TopTab = createMaterialTopTabNavigator();
const ExpenseTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.pinkDark,
        tabBarInactiveTintColor: "black",
        headerTitleStyle: {
          fontFamily: "font-arial",
        },
      }}
    >
      <TopTab.Screen
        name="ExpenseDashboard"
        component={ExpenseDashboard}
        options={{ title: "Dashboard" }}
      />
      <TopTab.Screen
        name="ExpenseSummary"
        component={ExpenseSummary}
        options={{ title: "Summary" }}
      />
      <TopTab.Screen
        name="ExpenseRecurring"
        component={ExpenseRecurring}
        options={{ title: "Recurring" }}
      />
    </TopTab.Navigator>
  );
};
export default ExpenseTopTabNavigator;
