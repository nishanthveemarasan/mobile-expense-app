import { useEffect } from "react";
import { Text, View } from "react-native";
import CategoryWiseItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/CategoryWiseItems/CategoryWiseItems";
import SpendItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/SpendItems/SpendItems";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";

const CategoryExpenseItemsScreen = ({ navigation, route }) => {
  const params = route.params;
  const data = params.data.data;
  useEffect(() => {
    navigation.setOptions({
      title: `${params.category} Category`,
    });
  }, []);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <SpendItems data={data} showCategory={false} />
    </LinearGredientWrapper>
  );
};
export default CategoryExpenseItemsScreen;
