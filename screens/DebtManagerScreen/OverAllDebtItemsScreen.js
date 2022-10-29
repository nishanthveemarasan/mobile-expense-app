import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import OverrollDebtItems from "../../components/DebtManagerScreen/OverrollDebtItems/OverrollDebtItems";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import { Colors } from "../../constants/colors";
const OverAllDebtItemsScreen = ({ route, navigation }) => {
  const params = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: params.data.name,
    });
  }, [params]);
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <OverrollDebtItems data={params.data.debts} name={params.data.name} />
    </LinearGredientWrapper>
  );
};
export default OverAllDebtItemsScreen;

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
