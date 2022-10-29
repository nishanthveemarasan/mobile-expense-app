import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { Colors } from "../constants/colors";
import SavingSummary from "../screens/savingsMangerScreen/SavingSummary";
import SavingTotalSummary from "../screens/savingsMangerScreen/SavingTotalSummary";
import SavingTransactions from "../screens/savingsMangerScreen/SavingTransactions";

const TopTab = createMaterialTopTabNavigator();
const SavingTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.pinkDark,
        tabBarInactiveTintColor: "black",
        headerTitleStyle: {
          fontFamily: "font-arial",
        },
        // tabBarContentContainerStyle: {
        //   backgroundColor: "green",
        // },
      }}
    >
      <TopTab.Screen
        name="TransactionTotal"
        component={SavingSummary}
        options={{ title: "Total" }}
      />
      <TopTab.Screen
        name="TransactionHistory"
        component={SavingTransactions}
        options={{ title: "History" }}
      />
      <TopTab.Screen
        name="TransactionSummary"
        component={SavingTotalSummary}
        options={{ title: "Summary" }}
      />
    </TopTab.Navigator>
  );
};
export default SavingTopTabNavigator;
