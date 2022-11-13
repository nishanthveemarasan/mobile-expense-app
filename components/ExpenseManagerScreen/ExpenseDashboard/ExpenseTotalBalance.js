import { Colors } from "../../../constants/colors";
import { StyleSheet, View, Text } from "react-native";
import { numberFormat, restrictDecimalPlace } from "../../../helper/helper";
import { useSelector } from "react-redux";
const ExpenseTotalBalance = ({ balance }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <View style={styles.rootContainer}>
      <View>
        <Text style={styles.title}>Current Balance</Text>
      </View>
      <View>
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
export default ExpenseTotalBalance;

const styles = StyleSheet.create({
  rootContainer: {
    fontFamily: "font-arial",
    backgroundColor: Colors.pink50,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  title: {
    fontWeight: "bold",
  },
  balance: {
    fontWeight: "bold",
  },
});
