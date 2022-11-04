import { useEffect } from "react";
import LinearGredientWrapper from "../../../components/wrapper/LinearGredientWrapper";

const ShowIncomeExpenseWeeklyGraphScreen = ({ navigation, route }) => {
  const params = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  }, []);
  return (
    <LinearGredientWrapper
      colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}
    ></LinearGredientWrapper>
  );
};
export default ShowIncomeExpenseWeeklyGraphScreen;
