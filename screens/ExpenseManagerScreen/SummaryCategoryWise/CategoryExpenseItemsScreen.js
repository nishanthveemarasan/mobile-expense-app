import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CategoryWiseItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/CategoryWiseItems/CategoryWiseItems";
import SpendItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/SpendItems/SpendItems";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { Colors } from "../../../constants/colors";
import { toLower } from "../../../helper/helper";

const CategoryExpenseItemsScreen = ({ navigation, route }) => {
  const params = route.params;
  const data = params.data.data;
  useEffect(() => {
    navigation.setOptions({
      title: `${params.category} Category`,
      headerStyle: {
        backgroundColor:
          toLower(params.category) == "income"
            ? Colors.success500
            : Colors.danger400,
      },
    });
  }, []);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.rootContainer}>
        <SpendItems data={data} showCategory={false} />
      </View>
    </LinearGredientWrapper>
  );
};
export default CategoryExpenseItemsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: "3%",
  },
});
