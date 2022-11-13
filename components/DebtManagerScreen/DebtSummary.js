import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/colors";
import { numberFormat, restrictDecimalPlace } from "../../helper/helper";
import LineGraph from "../Graph/LineGraph";
import LinearGredientWrapper from "../wrapper/LinearGredientWrapper";

const DebtSummary = ({ total }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  let amountColor = {
    color:
      total.total > 0 || total.total == 0
        ? Colors.success900
        : Colors.danger400,
  };

  const formattedAmount =
    total.total > 0 || total.total == 0
      ? numberFormat(total.total, state.currency)
      : numberFormat(total.total, state.currency);

  const xAxis = [
    `Total Lend ${numberFormat(total.lend, state.currency)}`,
    `Total Borrow ${numberFormat(total.borrow, state.currency)}`,
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
