import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../constants/colors";
import { getTodayWithMonthName, numberFormat } from "../../helper/helper";
const SavingSummary = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.savingStore.savingTotal,
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const total =
    state.data >= 0
      ? numberFormat(state.data, state.currency)
      : `-${numberFormat(state.data, state.currency)}`;
  const totalColor = {
    color: state.data >= 0 ? Colors.primaryBold : Colors.danger1000,
  };
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <View style={styles.rootContainer}>
        <View>
          <Text style={styles.headingText}>Total Saving</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, totalColor]}>{total}</Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            as at{"    "}
            <Text style={styles.date}>{getTodayWithMonthName()}</Text>
          </Text>
        </View>
      </View>
    </LinearGredientWrapper>
  );
};
export default SavingSummary;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "ubuntu-bold",
    fontSize: 15,
    color: Colors.primary500,
  },
  amountContainer: {
    marginVertical: 15,
  },
  amount: {
    fontFamily: "anton-regular",
    fontSize: 50,
    // color: Colors.primaryBold,
  },
  dateText: {
    fontFamily: "ubuntu-bold-italic",
    fontSize: 12,
    color: Colors.primary500,
  },
  date: {
    fontFamily: "ubuntu-bold",
    fontSize: 16,
    color: Colors.primary500,
  },
});
