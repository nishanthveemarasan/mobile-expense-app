import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import { Colors } from "../constants/colors";
import GetDebtScreen from "../screens/DebtManagerScreen/GetDebtScreen";
import GiveDebtScreen from "../screens/DebtManagerScreen/GiveDebtScreen";
import OverAllDebtScreen from "../screens/DebtManagerScreen/OverAllDebtScreen";
import SavingSummary from "../screens/savingsMangerScreen/SavingSummary";
import SavingTotalSummary from "../screens/savingsMangerScreen/SavingTotalSummary";
import SavingTransactions from "../screens/savingsMangerScreen/SavingTransactions";

const TopTab = createMaterialTopTabNavigator();
const DebtTopTabNavigator = () => {
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
        name="GiveDebtScreen"
        component={GiveDebtScreen}
        options={{ title: "LEND TO" }}
      />
      <TopTab.Screen
        name="GetDebtScreen"
        component={GetDebtScreen}
        options={{ title: "GET FROM" }}
      />
      <TopTab.Screen
        name="OverrollDebtScreen"
        component={OverAllDebtScreen}
        options={{ title: "SUMMARY" }}
      />
    </TopTab.Navigator>
  );
};
export default DebtTopTabNavigator;
