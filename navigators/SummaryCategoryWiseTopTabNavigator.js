import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../constants/colors";
import SummaryCategoryWiseScreen from "../screens/ExpenseManagerScreen/SummaryCategoryWise/SummaryCategoryWiseScreen";
import SummaryDateWiseScreen from "../screens/ExpenseManagerScreen/SummaryCategoryWise/SummaryDateWiseScreen";

const TopTab = createMaterialTopTabNavigator();
const SummaryCategoryWiseTopTabNavigator = ({ data }) => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.pinkDark,
        tabBarInactiveTintColor: "black",
        headerTitleStyle: {
          fontFamily: "font-arial",
        },
        tabBarStyle: {
          backgroundColor: "#663399",
        },
        tabBarLabelStyle: {
          color: "white",
        },
        tabBarPressColor: "blue",
      }}
    >
      <TopTab.Screen
        name="SummaryDateWiseScreen"
        options={{ title: "Date Wise" }}
      >
        {(props) => <SummaryDateWiseScreen {...props} data={data.data} />}
      </TopTab.Screen>
      <TopTab.Screen
        name="SummaryCategoryWiseScreen"
        options={{ title: "Category Wise" }}
      >
        {(props) => <SummaryCategoryWiseScreen {...props} data={data} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};
export default SummaryCategoryWiseTopTabNavigator;
