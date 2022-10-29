import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import EActivityIndicator from "../UI/EActivityIndicator";
import { getSavingData } from "../store/reducer/saving-reducer";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SavingTopTabNavigator from "../navigators/SavingTopTabNavigator";
import AddSaving from "../components/savingMangerScreen/Transactions/AddSaving";
import EActivityIndicator from "../UI/EActivityIndicator";
import DebtSummary from "../components/DebtManagerScreen/DebtSummary";
import LinearGredientWrapper from "../components/wrapper/LinearGredientWrapper";
import { Colors } from "../constants/colors";

const DebtManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const mapStateToProps = (state) => {
    return {
      debtData: state.debtStore.debtData,
    };
  };
  const state = useSelector(mapStateToProps);

  let sum = {
    borrow: 0,
    lend: 0,
    total: 0,
  };
  state.debtData.forEach((el, i) => {
    let borrowTotal = el.borrowTotal ? el.borrowTotal : 0;
    let lendTotal = el.lendTotal ? el.lendTotal : 0;
    sum.borrow += borrowTotal;
    sum.lend += lendTotal;
    sum.total += lendTotal - borrowTotal;
  });

  const onChangePageHandler = () => {
    navigation.navigate("DebtCategoryScreen");
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <DebtSummary total={sum} />
      <View style={styles.buttonOuterContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed ? styles.pressed : null,
          ]}
          onPress={onChangePageHandler}
        >
          <View>
            <Text style={styles.buttonText}>Debt Manager</Text>
          </View>
        </Pressable>
      </View>
    </LinearGredientWrapper>
  );
};
export default DebtManagerScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    backgroundColor: Colors.primary900,
    width: "50%",
    paddingVertical: 15,
    borderRadius: 6,
    elevation: 8,
  },
  buttonOuterContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "ubuntu-bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
