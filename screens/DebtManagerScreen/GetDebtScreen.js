import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import DebtItems from "../../components/DebtManagerScreen/DebtItems/DebtItems";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../constants/colors";

const GetDebtScreen = () => {
  const mapStateToProps = (state) => {
    return {
      data: state.debtStore.borrowData,
    };
  };
  const state = useSelector(mapStateToProps);
  console.log("adad");
  console.log(state.data);
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
export default GetDebtScreen;

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
