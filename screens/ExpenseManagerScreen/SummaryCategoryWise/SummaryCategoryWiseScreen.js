import { StyleSheet, Text, View } from "react-native";
import CategoryPieChart from "../../../components/ExpenseManagerScreen/ExpenseSummary/CategoryWiseItems/CategoryPieChart";
import CategoryWiseItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/CategoryWiseItems/CategoryWiseItems";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { Colors } from "../../../constants/colors";

const SummaryCategoryWiseScreen = ({ data }) => {
  return (
    <LinearGredientWrapper
      colors={["rgba(20, 1, 26,1)", "rgba(20, 1, 26,0.7)"]}
    >
      <ScrollViewWrapper>
        {data.data.length > 0 ? (
          <View style={styles.itemContainer}>
            <CategoryWiseItems
              data={data}
              balance={data.expense}
              income={data.income}
            />
            <View style={styles.chartContainer}>
              <CategoryPieChart chartData={data.category} />
            </View>
          </View>
        ) : (
          <View style={styles.rootContainer}>
            <Text style={styles.text}>No Data to show</Text>
          </View>
        )}
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default SummaryCategoryWiseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.pink50,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderRadius: 6,
    marginTop: "20%",
    elevation: 8,
  },
  itemContainer: {
    marginTop: "5%",
  },
  text: {
    fontFamily: "ubuntu-bold",
  },
  chartContainer: {
    marginTop: "5%",
  },
});
