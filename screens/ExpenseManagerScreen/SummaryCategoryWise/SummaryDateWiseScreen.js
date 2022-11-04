import { StyleSheet, Text, View } from "react-native";
import SpendItems from "../../../components/ExpenseManagerScreen/ExpenseSummary/SpendItems/SpendItems";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../../components/wrapper/ScrollViewWrapper";
import { Colors } from "../../../constants/colors";

const SummaryDateWiseScreen = ({ data }) => {
  return (
    <LinearGredientWrapper
      colors={["rgba(25, 2, 43,1)", "rgba(25, 2, 43,0.7)"]}
    >
      {data.length == 0 ? (
        <View style={styles.rootContainer}>
          <Text style={styles.text}>No Data to show</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <SpendItems data={data} showCategory={true} />
        </View>
      )}
    </LinearGredientWrapper>
  );
};
export default SummaryDateWiseScreen;
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
  text: {
    fontFamily: "ubuntu-bold",
  },
  itemContainer: {
    marginTop: "5%",
  },
});
