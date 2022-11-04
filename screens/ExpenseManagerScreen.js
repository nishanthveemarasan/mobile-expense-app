import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseTopTabNavigator from "../navigators/ExpenseTopTabNavigator";
import { getInitialExpenseData } from "../store/reducer/expense-reducer";
import EActivityIndicator from "../UI/EActivityIndicator";

const ExpenseManagerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapStateToProps = (state) => {
    return {
      loading: state.expenseStore.loaded,
      expenseData: state.expenseStore.payment.data.expense,
    };
  };
  const state = useSelector(mapStateToProps);
  useEffect(() => {
    if (state.expenseData.length == 0) {
      dispatch(getInitialExpenseData());
    }
  }, []);
  return (
    <>{state.loading ? <ExpenseTopTabNavigator /> : <EActivityIndicator />}</>
  );
};
export default ExpenseManagerScreen;
