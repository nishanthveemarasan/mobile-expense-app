import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Colors } from "../../constants/colors";
import { CUR } from "../../constants/months";
import { restrictDecimalPlace } from "../../helper/helper";
import LineGraph from "../Graph/LineGraph";
import LinearGredientWrapper from "../wrapper/LinearGredientWrapper";

const DebtSummary = ({ total }) => {
  let amountColor = {
    color:
      total.total > 0 || total.total == 0
        ? Colors.success900
        : Colors.danger400,
  };

  const formattedAmount =
    total.total > 0 || total.total == 0
      ? `${CUR}${restrictDecimalPlace(total.total)}`
      : `-${CUR}${restrictDecimalPlace(total.total)}`;

  const xAxis = [
    `Total Owed to Me ${CUR}${total.lend}`,
    `Total owed by Me ${CUR}${total.borrow}`,
  ];
  const yAxis = [
    restrictDecimalPlace(total.lend),
    restrictDecimalPlace(total.borrow),
  ];
  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>OVER ALL</Text>
      </View>
      <View>
        <Text style={styles.balanceText}>
          Balance :{" "}
          <Text style={[styles.balanceAmount, amountColor]}>
            {formattedAmount}
          </Text>
        </Text>
      </View>
      <View style={styles.graphContainer}>
        <LineGraph xAxis={xAxis} yAxis={yAxis} height={400} />
      </View>
    </>
  );
};
export default DebtSummary;
const styles = StyleSheet.create({
  headingContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "ubuntu-regular",
  },
  balanceContainer: {},
  balanceText: {
    textAlign: "center",
    fontFamily: "ubuntu-light",
    fontSize: 20,
  },
  balanceAmount: {
    fontFamily: "ubuntu-bold",
  },
  graphContainer: {
    marginVertical: 15,
  },
});
