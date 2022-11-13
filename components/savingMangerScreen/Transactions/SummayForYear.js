import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../constants/colors";
import { numberFormat, restrictDecimalPlace } from "../../../helper/helper";

const SummayForYear = ({ data }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const amount = data[data.length - 1];
  const amountColor =
    amount > 0 ? { color: Colors.success500 } : { color: Colors.danger400 };
  const onEditTransactionHandler = () => {
    navigation.navigate("AddSavingScreen", {
      data,
      type: "edit",
    });
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Total Saving</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountText, amountColor]}>
          {numberFormat(amount, state.currency)}
        </Text>
      </View>
    </View>
  );
};
export default SummayForYear;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    height: 90,
    paddingHorizontal: 10,
    backgroundColor: Colors.pink50,
    borderRadius: 4,
    elevation: 10,
  },
  dateContainer: {},
  dateText: {
    marginBottom: 7,
    fontSize: 22,
    fontFamily: "font-arial",
  },
  descriptionText: {
    fontFamily: "ubuntu-light",
  },
  amountContainer: {},
  amountText: {
    fontFamily: "ubuntu-bold",
    fontSize: 24,
  },
  positiveBorderColor: {
    borderLeftColor: Colors.success450,
  },
  negativeBorderColor: {
    borderLeftColor: Colors.danger400,
  },
  itemPressed: {
    opacity: 0.5,
  },
});
