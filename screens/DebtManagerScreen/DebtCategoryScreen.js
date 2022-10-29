import { useEffect } from "react";
import AddDebtItem from "../../components/DebtManagerScreen/NavigatorItem/AddDebtItem";
import DebtTopTabNavigator from "../../navigators/DebtTopTabNavigator";

const DebtCategoryScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddDebtItem page="AddDebtScreen" />,
    });
  }, []);
  return <DebtTopTabNavigator />;
};
export default DebtCategoryScreen;
