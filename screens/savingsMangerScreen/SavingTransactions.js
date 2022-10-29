import { View, Text } from "react-native";
import Transactions from "../../components/savingMangerScreen/Transactions/Transactions";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
const SavingTransactions = () => {
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <Transactions />
    </LinearGredientWrapper>
  );
};
export default SavingTransactions;
