import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../../../constants/colors";
import { FONTS } from "../../../../constants/fonts";
import { numberFormat, restrictDecimalPlace } from "../../../../helper/helper";

const ShowTotalSummaryTypeWise = ({ total, title, type }) => {
  const mapStateToProps = (state) => {
    return {
      currency: state.authStore.currency,
    };
  };
  const state = useSelector(mapStateToProps);
  const backgroundColor = {
    backgroundColor: type == "income" ? Colors.success500 : Colors.danger900,
  };
  return (
    <View style={[styles.rootContainer, backgroundColor]}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={[styles.textBalance]}>
          {numberFormat(total, state.currency)}
        </Text>
      </View>
    </View>
  );
};
export default ShowTotalSummaryTypeWise;
const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.pink50,
    height: 80,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 7,
    elevation: 8,
    marginVertical: 12,
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "ubuntu-bold",
    fontSize: 25,
    color: "white",
  },
  textBalance: {
    fontFamily: "ubuntu-bold",
    color: "white",
    fontSize: 25,
  },
});
