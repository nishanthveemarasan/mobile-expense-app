import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../../constants/colors";
import { FONTS } from "../../../../constants/fonts";
import { numberFormat, restrictDecimalPlace } from "../../../../helper/helper";

const ShowTotalSummary = ({ income, expense, balance }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const balanceColor = {
    color: balance > 0 ? Colors.success500 : Colors.danger400,
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Total Income</Text>
        <Text style={styles.textIncome}>
          {numberFormat(income, state.currency)}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Total Expense</Text>
        <Text style={styles.textExpense}>
          {numberFormat(expense, state.currency)}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Balance</Text>
        <Text style={[styles.textBalance, balanceColor]}>
          {numberFormat(balance, state.currency)}
        </Text>
      </View>
    </View>
  );
};
export default ShowTotalSummary;
const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.pink50,
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 7,
    elevation: 8,
    marginVertical: 3,
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "ubuntu-bold",
    fontSize: 14,
  },
  textIncome: {
    fontFamily: "ubuntu-bold",
    fontSize: 14,
    color: Colors.success450,
  },
  textExpense: {
    fontFamily: "ubuntu-bold",
    fontSize: 14,
    color: Colors.danger400,
  },
  textBalance: {
    fontFamily: "ubuntu-bold",
  },
});
