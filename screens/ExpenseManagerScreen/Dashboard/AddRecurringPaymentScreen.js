import { View } from "react-native";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";

const AddRecurringPaymentScreen = () => {
  return (
    <LinearGredientWrapper
      colors={["rgba(14, 1, 36,1)", "rgba(14, 1, 36,0.5)"]}
    >
      <Text>Add Expense</Text>
    </LinearGredientWrapper>
  );
};
export default AddRecurringPaymentScreen;
