import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { expenseStoreAction } from "../../store/store";

const ExpenseRecurring = () => {
  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper></ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default ExpenseRecurring;
