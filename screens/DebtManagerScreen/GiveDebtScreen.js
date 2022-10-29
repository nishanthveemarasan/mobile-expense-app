import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DebtItem from "../../components/DebtManagerScreen/DebtItems/DebtItem";
import DebtItems from "../../components/DebtManagerScreen/DebtItems/DebtItems";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../constants/colors";

const GiveDebtScreen = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.debtStore.lendData,
    };
  };
  const state = useSelector(mapStateToProps);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      {state.data.length == 0 ? (
        <View style={styles.wargingTextContainer}>
          <Text style={styles.wargingText}>No Data to Show</Text>
        </View>
      ) : (
        <DebtItems data={state.data} />
      )}
    </LinearGredientWrapper>
  );
};
export default GiveDebtScreen;

const styles = StyleSheet.create({
  wargingTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink50,
    paddingVertical: 30,
    borderRadius: 6,
    elevation: 8,
    marginTop: 40,
  },
  wargingText: {
    fontFamily: "ubuntu-regular",
    fontSize: 18,
    color: Colors.primary900,
  },
});
