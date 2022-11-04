import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseSummaryCategory from "../../components/ExpenseManagerScreen/ExpenseSummary/ExpenseSummaryCategory";
import LinearGredientWrapper from "../../components/wrapper/LinearGredientWrapper";
import ScrollViewWrapper from "../../components/wrapper/ScrollViewWrapper";
import { expenseStoreAction } from "../../store/store";

const ExpenseSummary = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChangeSUmmaryHandler = (type, title, page) => {
    navigation.navigate(page, {
      title,
      type,
    });
  };

  return (
    <LinearGredientWrapper colors={["rgba(0,212,255,1)", "rgba(255,0,0,0)"]}>
      <ScrollViewWrapper>
        <ExpenseSummaryCategory
          title="All Exepense & Income"
          type="all_summary"
          page="ShowExpenseSummaryScreen"
          onPress={onChangeSUmmaryHandler}
        />
        <ExpenseSummaryCategory
          title="Expense Summary"
          type="expense_summary"
          page="ShowOnlyExpenseSummaryScreen"
          onPress={onChangeSUmmaryHandler}
        />
        <ExpenseSummaryCategory
          title="Income Summary"
          type="income_summary"
          page="ShowOnlyIncomeSummaryScreen"
          onPress={onChangeSUmmaryHandler}
        />
        <ExpenseSummaryCategory
          title="Monthly Graph"
          type="income_expense_monthly_graph"
          page="ShowIncomeExpenseMonthlyGraphScreen"
          onPress={onChangeSUmmaryHandler}
        />
        <ExpenseSummaryCategory
          title="Weekly Graph"
          type="income_expense_weekly_graph"
          page="ShowIncomeExpenseWeeklyGraphScreen"
          onPress={onChangeSUmmaryHandler}
        />
      </ScrollViewWrapper>
    </LinearGredientWrapper>
  );
};
export default ExpenseSummary;
