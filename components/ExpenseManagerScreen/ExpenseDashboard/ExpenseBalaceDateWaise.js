import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../constants/colors";
import { numberFormat, restrictDecimalPlace } from "../../../helper/helper";

const ExpenseBalaceDateWaise = ({ dateGroup, income, expense, balance }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.title}>{dateGroup.title}</Text>
        <Text>{dateGroup.date}</Text>
      </View>
      <View>
        <Text style={styles.income}>
          {numberFormat(income, state.currency)}
        </Text>
        <Text style={styles.expense}>
          {numberFormat(expense, state.currency)}
        </Text>
      </View>
      <View style={styles.balanceContainer}>
        <Text
          style={[
            styles.balance,
            { color: balance > 0 ? Colors.success450 : Colors.danger400 },
          ]}
        >
          {numberFormat(balance, state.currency)}
        </Text>
      </View>
    </View>
  );
};
export default ExpenseBalaceDateWaise;

const styles = StyleSheet.create({
  rootContainer: {
    fontFamily: "font-arial",
    borderWidth: 2,
    backgroundColor: Colors.pink50,
    borderRadius: 4,
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  income: {
    color: Colors.success450,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expense: {
    color: Colors.danger400,
    fontWeight: "bold",
  },
  balanceContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  balance: {
    fontWeight: "bold",
  },
});
